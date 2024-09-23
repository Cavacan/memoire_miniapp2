class ImagesController < ApplicationController
  def index
    @bubbles = Bubble.all
  end

  def update
    if @bubble.update(bubble_params)
      render json: @bubble, status: :ok  # 更新されたバブルを返す
    else
      render json: @bubble.errors, status: :unprocessable_entity
    end
  end

  def create
    @bubble = Bubble.new(bubble_params)
    if @bubble.save
      render json: @bubble, status: :created  # 作成されたバブルを返す
    else
      render json: @bubble.errors, status: :unprocessable_entity
    end
  end

  private

  def bubble_params
    params.require(:bubble).permit(:title, :text)
  end
end
