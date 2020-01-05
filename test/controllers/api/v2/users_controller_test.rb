require 'test_helper'

class Api::V2::UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v2_users_index_url
    assert_response :success
  end

  test "should get show" do
    get api_v2_users_show_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v2_users_destroy_url
    assert_response :success
  end

end
