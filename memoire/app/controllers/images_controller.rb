class ImagesController < ApplicationController
  def index
    @bubbles = Bubble.all
  end
end
