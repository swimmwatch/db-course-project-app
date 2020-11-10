#!/bin/bash

source ./config.sh

# application info
SCRIPT_NAME=$(basename "$0")

# constants
DEV_MODE='development'
PROD_MODE='production'

# exit status codes
OK=0
IS_NOT_DIRECTORY=1
IS_NOT_VALID_ENV=2
NO_SUCH_PARAM=3

display_help () {
  cat << _EOF_
Using: $SCRIPT_NAME -o OUTPUT DIRECTORY -e MODE
Create backup.

There are two case:
  1. Create from development database.
  2. Create from production database.

Arguments:
-o, --output Output directory.
-e, --env Get backup from 'development' or 'production' database.
-h --help Get help information.

Exit status codes:
$OK OK,
$IS_NOT_DIRECTORY If directory is not,
$IS_NOT_VALID_ENV If mode is not valid.
$NO_SUCH_PARAM If no such parameter.

_EOF_

  exit $OK

  return
}

# arguments
APP_ENV='production'
OUTPUT_BACKUP_DIR='./'

# parse arguments
while [[ -n "$1" ]]
do
  case "$1" in
    -o | --out)
      output_dir=$2

      if [[ ! -d $output_dir ]]
      then
        error_msg "'$output_dir' is not directory" $IS_NOT_DIRECTORY
      fi

      OUTPUT_BACKUP_DIR=$(realpath "$output_dir")

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


if [[ $APP_ENV == "$PROD_MODE" ]]
then
  # create backup
  heroku pg:backups:capture --app="$APP_NAME" --verbose

  cd "$OUTPUT_BACKUP_DIR" || exit $?

  # download backup
  heroku pg:backups:download --app="$APP_NAME"

  cd - || exit $?
elif [[ $APP_ENV == "$DEV_MODE" ]]
then
  pg_dump -Fc --no-acl --verbose --no-owner -h localhost -U postgres passquiz > "$OUTPUT_BACKUP_DIR/latest.dump"
else
  error_msg "no such mode" $IS_NOT_VALID_ENV
fi

