class BubblesController < ApplicationController
  before_action :set_bubble, only: %i[ show edit update destroy ]

  # GET /bubbles or /bubbles.json
  def index
    @bubbles = Bubble.all
  end

  # GET /bubbles/1 or /bubbles/1.json
  def show
  end

  # GET /bubbles/new
  def new
    @bubble = Bubble.new
  end

  # GET /bubbles/1/edit
  def edit
  end

  # POST /bubbles or /bubbles.json
  def create
    @bubble = Bubble.new(bubble_params)

    respond_to do |format|
      if @bubble.save
        format.html { redirect_to @bubble, notice: "Bubble was successfully created." }
        format.json { render :show, status: :created, location: @bubble }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @bubble.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /bubbles/1 or /bubbles/1.json
  def update
    respond_to do |format|
      if @bubble.update(bubble_params)
        format.html { redirect_to @bubble, notice: "Bubble was successfully updated." }
        format.json { render :show, status: :ok, location: @bubble }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @bubble.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /bubbles/1 or /bubbles/1.json
  def destroy
    @bubble.destroy!

    respond_to do |format|
      format.html { redirect_to bubbles_path, status: :see_other, notice: "Bubble was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bubble
      @bubble = Bubble.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def bubble_params
      params.require(:bubble).permit(:title, :text)
    end
end
