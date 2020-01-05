class Api::V3::CategoriesController < ApplicationController
  def index
    categories = Category.all.order(created_at: :desc)
    render json: categories
  end

  def create
    category = Category.new(category_params)
    if category.save
      render json: category
    else
      render json: category.errors.full_messages
    end
  end

  def show
    if category
      render json: category
    else
      render json: category.errors.full_messages
    end
  end

  def update
    if category
      if category.update(category_params)
        render json: category
      else
        render json: { message: "Category was not created successfully." }
      end
    else
      render json: category.errors.full_messages
      redirect_to root_path
    end
  end

  def destroy
    category&.destroy
    render json: { message: "Category deleted!" }
  end

  private

  def category_params
    params.permit(:name, :description)
  end

  def category
    @category ||= Category.find(params[:id])
  end

end
