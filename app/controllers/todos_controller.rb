class TodosController < ApplicationController
  before_action :set_note, only: [:show, :edit, :destroy, :update]
  def index
    @todos = Todo.all
  end

  def create
    @todo = Todo.create!(todo_params)

    redirect_to action: "index"
  end

  def show
  end

  def update
    @todo.update(todo_params)
  end

  def destroy
    @todo.destroy
  end

  private
    
    def todo_params
      params.permit(:title, :created_by)
    end

    def set_todo
      @todo = Todo.find(params[:id])
    end
end
