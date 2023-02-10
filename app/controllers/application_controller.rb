class ApplicationController < ActionController::Base
  OK = 'OK'
  NG = 'NG'

  def current_user
    return @current_user if @current_user
    header = request.headers['Authorization']

    token = header.gsub('Bearer ', '')

    payload = JWT.decode(token, Rails.application.credentials.secret_key_base)[0]
    @current_user ||= User.find_by(id: payload['user_id'])
  end
end