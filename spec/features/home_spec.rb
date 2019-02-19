require "spec_helper"

RSpec.feature "Display Home Information" do
  before do
    visit '/'
  end

  scenario "A User visit the homepage" do
    expect(page).to have_content("Welcome to our todo apps")
    expect(page).to have_link("todo")
  end
end
