# constants
export APP_NAME=passquiz

DEFAULT_ERR_MSG='something went wrong'

# helper functions

error_msg() {
  # print error message to stderr and exit with status code

  user_msg=$1
  status_code=$2
  
  if [[ -z $status_code ]]
  then
    status_code=0
  fi

  if [[ -z $user_msg ]]
  then
    user_msg=$DEFAULT_ERR_MSG
  fi

  printf "${SCRIPT_NAME}: $user_msg.\nTry '%s --help' for getting more information.\n" "$APP_NAME" >&2

  exit $status_code

  return
}