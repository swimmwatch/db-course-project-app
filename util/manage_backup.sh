#!/bin/bash

source ./config.sh

# application info
SCRIPT_NAME=$(basename "$0")

# constants
DEV_ENV='development'
PROD_ENV='production'

ACTION_DUMP='dump'
ACTION_RESTORE='restore'

# exit status codes
OK=0
NO_SUCH_ENV=1
NO_SUCH_PARAM=2
NO_SUCH_ACTION=3

display_help () {
  cat << _EOF_
Using: $SCRIPT_NAME -a ACTION -e ENV -p PATH
Backup manager.

There are two case:
  1. Restore/create from development database.
  2. Restore/create from production database.

Arguments:
-a --action '$ACTION_DUMP' or '$ACTION_RESTORE'
-e, --env Get backup from 'development' or 'production' database.
-p, --path Path input/output file.
-h --help Get help information.

Exit status codes:
$OK Ok,
$NO_SUCH_ENV If environment is not valid.
$NO_SUCH_PARAM If no such parameter.
$NO_SUCH_ACTION If not such action.

_EOF_

  exit $OK

  return
}

# arguments
ACTION_TYPE="$ACTION_DUMP"
APP_ENV=$PROD_ENV
DUMP_PATH=''

# parse arguments
while [[ -n "$1" ]]
do
  case "$1" in
    -p | --path)
      DUMP_PATH="$2"

      shift
    ;;

    -e | --env)
      mode=$2

      if [[ -z $mode ]]
      then
        error_msg "environment must be not empty" $NO_SUCH_ENV
      fi

      APP_ENV=$mode

      shift
    ;;

    -a | --action)
      action=$2

      if [[ -z $action ]]
      then
        error_msg "action must be not empty" $NO_SUCH_ACTION
      fi

      ACTION_TYPE=$action

      shift
    ;;

    -h | --help)
      display_help
    ;;

    *)
      error_msg "'$1' - there is no such option" $NO_SUCH_PARAM
    ;;
  esac

  shift
done

# validation action type
if ! [[ $ACTION_TYPE == "$ACTION_DUMP" || $ACTION_TYPE == "$ACTION_RESTORE" ]]
then
  error_msg "'$ACTION_TYPE' - there is no such action" $NO_SUCH_ACTION
fi

if [[ $APP_ENV == "$PROD_ENV" ]]
then
  if [[ $ACTION_TYPE == "$ACTION_DUMP" ]]
  then
    # create remote backup
    heroku pg:backups:capture --app="$APP_NAME" --verbose

    # download backup
    heroku pg:backups:download --app="$APP_NAME" --output="$DUMP_PATH"
  elif [[ $ACTION_TYPE == "$ACTION_RESTORE" ]]
  then
    pg_restore --verbose --clean --no-acl --no-owner -h "$PROD_HOST" -U "$PROD_USER" -d "$PROD_DATABASE" "$DUMP_PATH"
  fi
elif [[ $APP_ENV == "$DEV_ENV" ]]
then
  if [[ $ACTION_TYPE == "$ACTION_DUMP" ]]
  then
    pg_dump -Fc --no-acl --verbose --no-owner -h localhost -U postgres passquiz > "$DUMP_PATH"
  elif [[ $ACTION_TYPE == "$ACTION_RESTORE" ]]
  then
    pg_restore --verbose --clean --no-acl --no-owner -h localhost -U postgres -d passquiz "$DUMP_PATH"
  fi
else
  error_msg "'$APP_ENV' - no such environment" $NO_SUCH_ENV
fi