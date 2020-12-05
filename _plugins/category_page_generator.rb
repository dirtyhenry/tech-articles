# frozen_string_literal: true

require 'i18n'
require 'liquid'

def myslugify(string)
  I18n.available_locales = %i[en fr]
  I18n.transliterate(string)
      .downcase
      .strip
      .gsub(' ', '-')
      .gsub(/[^\w-]/, '')
end

module Jekyll
  # A generator plugin creating one new page per category found in the site.
  class CategoryPageGenerator < Generator
    safe true

    def generate(site)
      return unless site.layouts.key? 'category_index'

      dir = site.config['category_dir'] || 'categories'
      site.categories.each_key do |category|
        # Slug from https://stackoverflow.com/questions/4308377/ruby-post-title-to-slug
        site.pages << CategoryPage.new(site, site.source, File.join(dir, myslugify(category)), category)
      end
    end
  end

  # A Page subclass used in the `CategoryPageGenerator`
  class CategoryPage < Page
    # rubocop:disable Lint/MissingSuper
    def initialize(site, base, dir, category)
      @site = site
      @base = base
      @dir  = dir
      @name = 'index.html'

      process(@name)
      read_yaml(File.join(base, '_layouts'), 'category_index.html')
      data['category'] = category

      category_title_prefix = site.config['category_title_prefix'] || 'Category: '
      data['title'] = "#{category_title_prefix}#{category}"
    end
  end
  # rubocop:enable Lint/MissingSuper

  # A Liquid filter to generate the path of a category resource.
  module CategoryLinkFilter
    def category_link(input)
      "/categories/#{myslugify(input)}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::CategoryLinkFilter)
