class UsersController < ApplicationController
  skip_before_action :require_login, only: [:create]
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      auto_login(@user) 
      redirect_to root_path, notice: '宝箱ができました。'
    else
      flash.now[:alert] = '宝箱が作れませんでした。'
      render 'session#new', status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
