class Api::SessionsController < ApplicationController
  protect_from_forgery with: :null_session
  wrap_parameters format: []

end