class SessionsController < ApplicationController
  skip_before_action :require_login, only: [:new, :create]
  def new
    @user = User.new
  end

  def create
    user = login(params[:email], params[:password])
    if user
      redirect_to root_path, notice: 'ログインしました。'
    else
      flash.now[:alert] = 'ログインに失敗しました。'
      render :new
    end
  end

  def destroy
    logout
    redirect_to root_path, status: :see_other, notice: 'ログアウトしました。'
  end
end
