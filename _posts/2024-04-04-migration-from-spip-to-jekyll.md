---
layout: post
id: BA00C19C-9001-4DE1-9EE4-D4012F9EA603
title: Final notes on migrating from SPIP to Jekyll
author: Mick F
excerpt: >-
  Memories from 2 things that helped me: a simple Docker Compose MySQL stack and
  a Ruby script to migrate database entries to Markdown files
category: Journaling
tags:
  - SPIP
  - Jekyll
  - MySQL
  - Ruby
  - Docker
---

About 4 years ago, [my long-running server died][1]. Its main job was hosting
[deadrooster.org][3], my website about pop culture — mostly written in French —
via [SPIP][2], a publishing system.

Today, I can finally say that I completed the migration from SPIP to Jekyll.

Yes, it took me about 4 years to migrate. Of course, it was not a full-time job,
and Dead Rooster remains mostly unnoticed. But still, I wanted to recover as
much as I could.

This post is to archive the tools I wrote to achieve this goal, ie:

1. A temporary stack to host a MySQL database;
1. A script to automate as much as possible the storage of the posts from
   database entries to Markdown files with front matters.

## An easy way to run a MySQL stack

Using [Docker Compose][4], it was as simple as having a `compose.yml` with the
following:

```yaml
# Use root/example as user/password credentials
version: "3.1"

services:
  db:
    image: mysql
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    ports:
      - 12345:3306
    environment:
      MYSQL_ROOT_PASSWORD: example

  adminer:
    image: adminer
    restart: always
    ports:
      - 8080:8080
```

and then run:

```sh
docker-compose -f compose.yml up
```

and, finally, connect to `http://localhost:8080/` via a browser.

## A basic script to convert SPIP contents to Markdown

I [forked][6] [`jekyll-import`][5] and created a SPIP impoter. It is pretty
hacky and definitely not a candidate for a pull request on the upstream
repository, but it could maybe help people out there. Here it is:

```ruby
# frozen_string_literal: false
require 'active_support'

module JekyllImport
  module Importers
    class Spip < Importer
      def self.require_deps
        JekyllImport.require_with_fallback(%w(
          rubygems
          sequel
          fileutils
          safe_yaml
          unidecode
          active_support
          active_support/core_ext/string
        ))
      end

      def self.specify_options(c)
        c.option "dbname",         "--dbname DB",           "Database name (default: '')"
        c.option "socket",         "--socket SOCKET",       "Database socket (default: '')"
        c.option "user",           "--user USER",           "Database user name (default: '')"
        c.option "password",       "--password PW",         "Database user's password (default: '')"
        c.option "host",           "--host HOST",           "Database host name (default: 'localhost')"
        c.option "port",           "--port PORT",           "Database port number (default: '')"
        c.option "table_prefix",   "--table_prefix PREFIX", "Table prefix name (default: 'wp_')"
        c.option "site_prefix",    "--site_prefix PREFIX",  "Site prefix name (default: '')"
        c.option "clean_entities", "--clean_entities",      "Whether to clean entities (default: true)"
        c.option "comments",       "--comments",            "Whether to import comments (default: true)"
        c.option "categories",     "--categories",          "Whether to import categories (default: true)"
        c.option "tags",           "--tags",                "Whether to import tags (default: true)"
        c.option "more_excerpt",   "--more_excerpt",        "Whether to use more excerpt (default: true)"
        c.option "more_anchor",    "--more_anchor",         "Whether to use more anchor (default: true)"

        c.option "status",         "--status STATUS,STATUS2", Array,
                 "Array of allowed statuses (default: ['publish'], other options: 'draft', 'private', 'revision')"
      end

      def self.process(opts)
        options = {
          :user           => opts.fetch("user", ""),
          :pass           => opts.fetch("password", ""),
          :host           => opts.fetch("host", "localhost"),
          :port           => opts.fetch("port", "3306"),
          :socket         => opts.fetch("socket", nil),
          :dbname         => opts.fetch("dbname", ""),
          :table_prefix   => opts.fetch("table_prefix", "spip_"),
          :site_prefix    => opts.fetch("site_prefix", nil),
          :clean_entities => opts.fetch("clean_entities", true),
          :comments       => opts.fetch("comments", true),
          :categories     => opts.fetch("categories", true),
          :tags           => opts.fetch("tags", true),
          :more_excerpt   => opts.fetch("more_excerpt", true),
          :more_anchor    => opts.fetch("more_anchor", true),
          :extension      => opts.fetch("extension", "html"),
          :status         => opts.fetch("status", ["publish"]).map(&:to_sym), # :draft, :private, :revision
        }

        if options[:clean_entities]
          begin
            require "htmlentities"
          rescue LoadError
            STDERR.puts "Could not require 'htmlentities', so the " \
                        ":clean_entities option is now disabled."
            options[:clean_entities] = false
          end
        end

        FileUtils.mkdir_p("_posts")
        FileUtils.mkdir_p("_drafts") if options[:status].include? :draft

        db = Sequel.mysql2(options[:dbname],
                           :user     => options[:user],
                           :password => options[:pass],
                           :socket   => options[:socket],
                           :host     => options[:host],
                           :port     => options[:port],
                           :encoding => "utf8")

        px = options[:table_prefix]
        sx = options[:site_prefix]

        page_name_list = {}

        page_name_query = "
           SELECT
             posts.id_article  AS `id`,
             posts.titre       AS `title`,
             posts.id_rubrique AS `category_id`
           FROM #{px}#{sx}articles AS `posts`"

        db[page_name_query].each do |page|
          page[:slug] = sluggify(page[:title])
          page_name_list[ page[:id] ] = {
            :slug   => page[:slug],
            :parent => page[:parent],
          }
        end

        posts_query = "
           SELECT
             posts.id_article    AS `id`,
             posts.titre         AS `title`,
             posts.soustitre     AS `subtitle`,
             posts.descriptif    AS `post_description`,
             posts.chapo         AS `lead`,
             posts.texte         AS `content`,
             posts.date          AS `date`,
             posts.lang          AS `lang`,
             users.nom           AS `author`,
             users.login         AS `author_login`,
             users.email         AS `author_email`
           FROM #{px}#{sx}articles AS `posts`
             LEFT JOIN #{px}#{sx}auteurs_liens AS `temp`
               ON posts.id_article = temp.id_objet
             LEFT JOIN #{px}#{sx}auteurs AS `users`
               ON temp.id_auteur = users.id_auteur"

        if options[:status] && !options[:status].empty?
          status = options[:status][0]
          posts_query << "
           WHERE posts.statut = '#{status}'"
          options[:status][1..-1].each do |post_status|
            posts_query << " OR
             posts.statut = '#{post_status}'"
          end
        end

        db[posts_query].each do |post|
          process_post(post, db, options, page_name_list)
        end

        assets_query = "
           SELECT
             id_document    AS `id`,
             extension      AS `extension`,
             fichier        AS `path`
           FROM #{px}#{sx}documents"

        File.open("asset_download_script.sh", "w") do |f|
          f.puts "#!/usr/bin/env bash -x"
          f.puts "\n"
          f.puts "SITE_BASE_URL=TO_COMPLETE"
          f.puts "\n"
          f.puts "mkdir _assets"
          db[assets_query].each do |asset|
            f.puts "curl $SITE_BASE_URL/#{asset[:path]} -o _assets/#{asset[:id]}-#{File.basename(asset[:path])}"
          end
        end
      end

      def self.process_post(post, db, options, page_name_list)
        px = options[:table_prefix]
        sx = options[:site_prefix]
        extension = options[:extension]

        title = post[:title]
        title = clean_entities(title) if options[:clean_entities]

        slug = post[:slug]
        slug = sluggify(title) if !slug || slug.empty?

        date = post[:date] || Time.now
        name = format("%02d-%02d-%02d-%s.%s", date.year, date.month, date.day, slug, extension)
        content = post[:content].to_s

        excerpt = post[:excerpt].to_s

        categories = []
        tags = []

        if options[:categories] || options[:tags]
          cquery =
            "SELECT
               terms.titre AS `name`,
               terms.type AS `type`
             FROM
               #{px}#{sx}mots AS `terms`,
               #{px}#{sx}mots_liens AS `trels`
             WHERE
               trels.id_objet = '#{post[:id]}' AND
               trels.id_mot = terms.id_mot"

          db[cquery].each do |term|
            if options[:categories]
              new_category = options[:clean_entities] ? clean_entities(term[:type]) : term[:type]
              unless categories.include? new_category
                categories << new_category
              end
            end
            if options[:tags]
              new_tag = options[:clean_entities] ? clean_entities(term[:name]) : term[:name]
              unless tags.include? new_tag
                tags << new_tag
              end
            end
          end
        end

        comments = []

        if options[:comments]
          cquery =
            "SELECT
               auteur         AS `author`,
               email_auteur   AS `author_email`,
               date_heure     AS `date`,
               titre          AS `title`,
               texte          AS `content`
             FROM #{px}#{sx}forum
             WHERE
               id_objet = '#{post[:id]}' AND
               statut = 'publie'"

          db[cquery].each do |comment|
            comcontenttitle = comment[:title].to_s
            comcontenttitle.force_encoding("UTF-8") if comcontenttitle.respond_to?(:force_encoding)
            comcontenttitle = clean_entities(comcontent) if options[:clean_entities]
            comcontent = comment[:content].to_s
            comcontent.force_encoding("UTF-8") if comcontent.respond_to?(:force_encoding)
            comcontent = clean_entities(comcontent) if options[:clean_entities]
            comauthor = comment[:author].to_s
            comauthor = clean_entities(comauthor) if options[:clean_entities]

            comments << {
              "author"       => comauthor,
              "author_email" => comment[:author_email].to_s,
              "date"         => comment[:date].to_s,
              "title"        => comcontenttitle,
              "content"      => comcontent,
            }
          end

          comments.sort! { |a, b| a["date"] <=> b["date"] }
        end

        # Get the relevant fields as a hash, delete empty fields and
        # convert to YAML for the header.
        data = {
          "layout"        => post[:type].to_s,
          "status"        => post[:status].to_s,
          "published"     => post[:status].to_s == "draft" ? nil : (post[:status].to_s == "publish"),
          "title"         => title.to_s,
          "author"        => {
            "display_name" => post[:author].to_s,
            "login"        => post[:author_login].to_s,
            "email"        => post[:author_email].to_s,
            "url"          => post[:author_url].to_s,
          },
          "author_login"  => post[:author_login].to_s,
          "author_email"  => post[:author_email].to_s,
          "author_url"    => post[:author_url].to_s,
          "excerpt"       => excerpt,
          "wordpress_id"  => post[:id],
          "wordpress_url" => post[:guid].to_s,
          "date"          => date.to_s,
          "date_gmt"      => post[:date_gmt].to_s,
          "categories"    => options[:categories] ? categories : nil,
          "tags"          => options[:tags] ? tags : nil,
          "comments"      => options[:comments] ? comments : nil,
        }.delete_if { |_k, v| v.nil? || v == "" }.to_yaml

        if post[:type] == "page"
          filename = page_path(post[:id], page_name_list) + "index.#{extension}"
          FileUtils.mkdir_p(File.dirname(filename))
        elsif post[:status] == "draft"
          filename = "_drafts/#{slug}.md"
        else
          filename = "_posts/#{name}"
        end

        # Write out the data and content to file
        File.open(filename, "w") do |f|
          f.puts data
          f.puts "---"
          f.puts content
        end
      end

      def self.clean_entities(text)
        text.force_encoding("UTF-8") if text.respond_to?(:force_encoding)
        text = HTMLEntities.new.encode(text, :named)
        # We don't want to convert these, it would break all
        # HTML tags in the post and comments.
        text.gsub!("&amp;", "&")
        text.gsub!("&lt;", "<")
        text.gsub!("&gt;", ">")
        text.gsub!("&quot;", '"')
        text.gsub!("&apos;", "'")
        text.gsub!("&#47;", "/")
        text
      end

      def self.sluggify(title)
        title
      end

      def self.page_path(page_id, page_name_list)
        if page_name_list.key?(page_id)
          [
            page_path(page_name_list[page_id][:parent], page_name_list),
            page_name_list[page_id][:slug],
            "/",
          ].join("")
        else
          ""
        end
      end
    end
  end
end
```

And calling the importer looked like this:

```sh
jekyll import spip \
    --dbname deadrooster \
    --user root \
    --password example \
    --host 127.0.0.1 \
    --port 12345
```

## Final note

The sad truth is that, today, I already feel like Jekyll is dying, and it might
be time to migrate to something else. Again. Isn’t it a waste of time to keep
migrating things over and over again? Maybe.

But is it fun? Definitely.

[1]: https://www.deadrooster.org/renaissance-du-phoenix/
[2]: https://www.spip.net/
[3]: https://www.deadrooster.org/
[4]: https://docs.docker.com/compose/
[5]: https://github.com/jekyll/jekyll-import
[6]: https://github.com/dirtyhenry/jekyll-import/tree/spip-import
