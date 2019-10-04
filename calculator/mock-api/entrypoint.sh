#!/bin/sh

echo "-> Mock API for $TROCA_APP_NAME"
echo "Entry point args: ${*:-<none>}"

start () {
    yarn run start
}

COMMAND=$1; shift
case $COMMAND in
    start)
        start $*
    ;;
    *)
        echo "[!] Invalid or no command specified [$COMMAND]. Available commands: start"
        exit 1
    ;;
esac