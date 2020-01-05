require 'test_helper'

class CategoryTest < ActiveSupport::TestCase

  def setup
    @category = Category.new(name: "tutorials", description: "tutorial for CS2040S")
  end

  test "category validity" do
    assert @category.valid?
  end

  test "name presence" do
    @category.name = " "
    assert_not @category.valid?
  end

  test "name uniqueness" do
    @category.save
    category2 = Category.new(name: "tutorials", description: "tutorial for CS1101S")
    assert_not category2.valid?
  end

end