#!/bin/bash

source ./config.sh

# application info
SCRIPT_NAME=$(basename "$0")

# constants
DEV_MODE='development'
PROD_MODE='production'

# exit status codes
OK=0
IS_NOT_FILE=1
IS_NOT_VALID_ENV=2
NO_SUCH_PARAM=3

display_help () {
  cat << _EOF_
Using: $SCRIPT_NAME -i INPUT FILE -e MODE
Restore backup.

There are two case:
  1. Restore from development database.
  2. Restore from production database.

Arguments:
-i, --input Input file.
-e, --env Get backup from 'development' or 'production' database.
-h --help Get help information.

Exit status codes:
$OK OK,
$IS_NOT_DIRECTORY If file is not,
$IS_NOT_VALID_ENV If mode is not valid.
$NO_SUCH_PARAM If no such parameter.

_EOF_

  exit $OK

  return
}

# arguments
APP_ENV='production'
INPUT_BACKUP_FILE=''

# parse arguments
while [[ -n "$1" ]]
do
  case "$1" in
    -i | --input)
      input_file=$2

      if [[ ! -f $input_file ]]
      then
        error_msg "'$input_file' is not file" $IS_NOT_FILE
      fi

      INPUT_BACKUP_FILE=$(realpath "$input_file")

      shift
    ;;

    -e | --env)
      mode=$2

      if [[ -z $mode ]]
      then
        error_msg "mode must be not empty" $IS_NOT_VALID_ENV
      fi

      APP_ENV=$mode

      shift
    ;;

    -h | --help)
      display_help
    ;;

    *)
      error_msg "'$1' - there is not such option" $NO_SUCH_PARAM
    ;;
  esac

  shift
done


# restore
if [[ $APP_ENV == "$PROD_MODE" ]]
then
  heroku pg:backups:restore "$INPUT_BACKUP_FILE" DATABASE_URL -a "$APP_NAME" --confirm "$APP_NAME"
elif [[ $APP_ENV == "$DEV_MODE" ]]
then
  pg_restore --verbose --clean --no-acl --no-owner -h localhost -U postgres -d passquiz "$INPUT_BACKUP_FILE"
else
  error_msg "no such mode" $IS_NOT_VALID_ENV
fi