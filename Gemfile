# frozen_string_literal: true

source 'https://rubygems.org'

gem 'http_parser.rb', '~> 0.6.0', platforms: [:jruby]
gem 'jekyll', '~> 4.3.2'
gem 'wdm', '~> 0.1.1', platforms: %i[mingw x64_mingw mswin]

group :jekyll_plugins do
  gem 'jekyll-feed', '~> 0.12'
  gem 'jekyll-inline-svg', '~> 1.1'
end

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem 'tzinfo', '>= 1', '< 3'
  gem 'tzinfo-data'
end

group :development, :test do
  gem 'code-scanning-rubocop', '~> 0.6'
  gem 'rubocop', '>= 1.45.0', '< 2'
  gem 'rubocop-jekyll', '~> 0.13'
  gem 'rubocop-performance', '~> 1.19'
end
