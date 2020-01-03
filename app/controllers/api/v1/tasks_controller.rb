class Api::V1::TasksController < ApplicationController
  def index
    task = Task.all.order(created_at: :desc)
    render json: task
  end

  def create
    task = Task.create!(task_params)
    if task
      render json: task
    else
      render json: task.errors
    end
  end

  def show
    if task
      render json: task
    else
      render json: task.errors
    end
  end

  def destroy
    task&.destroy
    render json: { message: 'Task has been successfully deleted!' }
  end

  def edit
    if task
      if task.update(task_params)
        render json: task
      else
        render json: { message: "Task was not updated successfully."}
      end
    else
      render json: task.errors
    end
  end

  private

  def task_params
    params.permit(:title, :description, :status)
  end

  def task
    @task ||= Task.find(params[:id])
  end
end
