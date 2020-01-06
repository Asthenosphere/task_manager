require 'test_helper'

class Api::V3::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = Category.create!(name: "Sports", description: "Stay healthy")
  end

end
