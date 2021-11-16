# frozen_string_literal: true

source 'https://rubygems.org'

# Please keep in sync with .ruby-version.
ruby '2.7.4'

gem 'buckygem',
    git: 'https://github.com/dirtyhenry/buckygem.git',
    branch: 'main'
gem 'html-proofer'
gem 'jekyll'
gem 'kids',
    git: 'https://github.com/dirtyhenry/kids.git',
    branch: 'main'
gem 'mdl'
gem 'rouge'
gem 'rubocop', require: false

group :jekyll_plugins do
  gem 'jekyll-archives',
      git: 'https://github.com/jekyll/jekyll-archives.git',
      branch: 'master'
  gem 'jekyll-assets',
      git: 'https://github.com/envygeeks/jekyll-assets',
      branch: 'master'
  # jekyll-commonmark has a dependency bug:
  # https://github.com/jekyll/jekyll-commonmark/pull/44
  # We can fetch the 'normal' version once it's ok
  gem 'jekyll-commonmark',
      git: 'https://github.com/jekyll/jekyll-commonmark',
      branch: 'master'
  gem 'jekyll-feed',
      git: 'https://github.com/dirtyhenry/jekyll-feed',
      branch: 'master'
  gem 'jekyll-liquify'
  gem 'jekyll-sitemap'
end
