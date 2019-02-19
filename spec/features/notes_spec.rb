require "spec_helper"

RSpec.feature "Display All Todo Notes" do
  before do
    @todos = create_list :todo, 5
    visit '/todos'
  end

  scenario "A user view all todo notes" do
    @todos.each do |todo|
      expect(page).to have_content(todo.title)
      expect(page).to have_content(todo.created_by)
      todo.items.each  do |item|
        expect(page).to have_content(item.name)
      end
    end
  end

  scenario "A user view todo notes when notes are empty" do
    Todo.destroy_all

    visit '/todos'
    @todos.each do |todo|
      expect(page).not_to have_content(todo.title)
      expect(page).not_to have_content(todo.created_by)
      todo.items.each  do |item|
        expect(page).not_to have_content(item.name)
      end
    end

    expect(page).to have_content('There is no todo list')

  end
end
