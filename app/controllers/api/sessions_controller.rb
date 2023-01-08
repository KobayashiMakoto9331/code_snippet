class Api::SessionsController <ActionController::Base
  protect_from_forgery with: :null_session
  wrap_parameters format: []

end