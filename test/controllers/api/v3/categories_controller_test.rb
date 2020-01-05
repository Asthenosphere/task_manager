require 'test_helper'

class Api::V3::CategoriesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v3_categories_index_url
    assert_response :success
  end

  test "should get create" do
    get api_v3_categories_create_url
    assert_response :success
  end

  test "should get show" do
    get api_v3_categories_show_url
    assert_response :success
  end

  test "should get update" do
    get api_v3_categories_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v3_categories_destroy_url
    assert_response :success
  end

end
