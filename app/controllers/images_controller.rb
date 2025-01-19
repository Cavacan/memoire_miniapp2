class ImagesController < ApplicationController
  before_action :set_bubble, only: [:update]

  def index
    @bubbles = current_user.bubbles
  end

  def update
    if @bubble.update(bubble_params)
      # 特殊文字や改行をエスケープしてから返す
      render json: @bubble.as_json(only: [:id, :title, :text]).to_json, status: :ok
    else
      render json: @bubble.errors, status: :unprocessable_entity
    end
  end

  def create
    @bubble = current_user.bubbles.new(bubble_params)
    if @bubble.save
      render json: @bubble.as_json(only: [:id, :title, :text]).to_json, status: :created  # 作成されたバブルを返す
    else
      render json: @bubble.errors, status: :unprocessable_entity
    end
  end

  private

  def set_bubble
    @bubble = current_user.bubbles.find(params[:id])
  end

  def bubble_params
    params.require(:bubble).permit(:title, :text)
  end
end
