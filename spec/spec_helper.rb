# This file is copied to spec/ when you run 'rails generate rspec:install' ENV['RAILS_ENV'] = 'test' # CRUCIAL if ENV['CODE_COVERAGE']
ENV['RAILS_ENV'] = 'test'

require 'simplecov'
SimpleCov.use_merging false
SimpleCov.coverage_dir('output/coverage')
SimpleCov.start 'rails'
# end

require File.expand_path('../../config/environment', __FILE__)
# Prevent database truncation if the environment is production
abort('The Rails environment is running in production mode!') if Rails.env.production?
require 'rspec/rails'
require 'capybara/rspec'
require 'shoulda/matchers'
require 'database_cleaner'
require 'factory_bot_rails'
require 'fileutils'
require 'webmock/rspec'
require 'capybara-screenshot/rspec'

ALLOW_NET_CONNECT = true
WebMock.allow_net_connect! if ALLOW_NET_CONNECT

ActiveRecord::Migration.maintain_test_schema!

# if ENV['USE_HOST_SELENIUM'] || ENV['UHS']
  # Capybara.register_driver :selenium do |app|
    # Selenium::WebDriver::Chrome::Profile.new
    # Capybara::Selenium::Driver.new(
      # app, browser: :remote, url: 'http://10.0.3.1:4444/wd/hub',
      # desired_capabilities: :chrome
    # )
  # end
  # Capybara.javascript_driver = :selenium
# else
  # # use capybara-webkit (https://github.com/thoughtbot/capybara-webkit) for simplicity
  # Capybara.javascript_driver = :webkit
  # Capybara::Webkit.configure do |config|
    # config.allow_url('bbmnews.dev')
    # config.allow_url('fonts.googleapis.com')
    # config.block_unknown_urls
  # end
# end

Capybara::Screenshot.prune_strategy = :keep_last_run
Capybara.save_path = "#{Rails.root}/output/screenshot"

RSpec.shared_context 'clear_cache', shared_context: :clear_cache do
end

RSpec.configure do |config|
  config.infer_base_class_for_anonymous_controllers = false
  config.infer_spec_type_from_file_location!
  config.order = 'random'
  config.raise_errors_for_deprecations!
  config.use_transactional_fixtures = false
  config.include_context 'clear_cache', include_shared: true, type: :feature
  config.include FactoryBot::Syntax::Methods


  Capybara.default_host = 'http://localhost'
  Capybara.server_host = '127.0.0.1'
  Capybara.server_port = 3030
  Capybara.app_host = 'http://localhost:3030'
  Capybara.default_driver = :selenium_chrome
  Capybara.ignore_hidden_elements = true

  config.before(:each) do
    DatabaseCleaner.strategy = if Capybara.current_driver == :rack_test
                                 :transaction
                               else
                                 :truncation
                               end

    DatabaseCleaner.start
  end

  config.after(:each) do |_example|
    DatabaseCleaner.clean
    Rails.cache.clear
    FileUtils.rm_rf(Dir["#{Rails.root}/public/uploads/*"])
  end

  config.after(:suite) do
    FileUtils.rm_rf(Dir["#{Rails.root}/spec/support/carrierwave/uploads"])
  end
end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    # Choose a test framework:
    with.test_framework :rspec
    with.library :rails
  end
end

