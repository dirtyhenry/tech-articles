# frozen_string_literal: true

require 'i18n'

def slugify(string)
  I18n.available_locales = %i[en fr]
  I18n.transliterate(string)
      .downcase
      .strip
      .gsub(' ', '-')
      .gsub(/[^\w-]/, '')
end

module Jekyll
  # A generator plugin creating one new page per tag found in the site.
  class TagPageGenerator < Generator
    safe true

    def generate(site)
      return unless site.layouts.key? 'tag_index'

      I18n.available_locales = %i[en fr]
      dir = site.config['tag_dir'] || 'tags'
      site.tags.each_key do |tag|
        # Slug from https://stackoverflow.com/questions/4308377/ruby-post-title-to-slug
        site.pages << TagPage.new(site, site.source, File.join(dir, slugify(tag)), tag)
      end
    end
  end

  # A Page subclass used in the `TagPageGenerator`
  class TagPage < Page
    # rubocop:disable Lint/MissingSuper
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir  = dir
      @name = 'index.html'

      process(@name)
      read_yaml(File.join(base, '_layouts'), 'tag_index.html')
      data['tag'] = tag

      tag_title_prefix = site.config['tag_title_prefix'] || 'Tag: '
      data['title'] = "#{tag_title_prefix}#{tag}"
    end
    # rubocop:enable Lint/MissingSuper
  end

  # A Liquid filter to generate the path of a tag resource.
  module TagLinkFilter
    def tag_link(input)
      "/tags/#{slugify(input)}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::TagLinkFilter)
