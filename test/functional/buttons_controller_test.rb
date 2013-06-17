require 'test_helper'

class ButtonsControllerTest < ActionController::TestCase
  setup do
    @button = buttons(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:buttons)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create button" do
    assert_difference('Button.count') do
      post :create, button: { mod: @button.mod, name: @button.name, num: @button.num, sides: @button.sides }
    end

    assert_redirected_to button_path(assigns(:button))
  end

  test "should show button" do
    get :show, id: @button
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @button
    assert_response :success
  end

  test "should update button" do
    put :update, id: @button, button: { mod: @button.mod, name: @button.name, num: @button.num, sides: @button.sides }
    assert_redirected_to button_path(assigns(:button))
  end

  test "should destroy button" do
    assert_difference('Button.count', -1) do
      delete :destroy, id: @button
    end

    assert_redirected_to buttons_path
  end
end
