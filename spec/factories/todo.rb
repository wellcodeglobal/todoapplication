# frozen_string_literal: true
FactoryBot.define do
  factory :todo do
    title { "#{Faker::Lorem.word}" }
    created_by { "#{Faker::Name.name}" }
    after :create do |todo|
      create_list :item, 3, todo: todo
    end
  end
end
