#!/bin/sh

cd "$TROCA_APP_PATH"

start_development () {
    export NODE_ENV='development'
    npm run dev
}

start_production () {
    export NODE_ENV='production'
    npm run start
}

start_staging() {
    export NODE_ENV='staging'
    npm run start
}

run_tests () {
    export NODE_ENV='test'
    npm run test
}

shell () {
    sh
}

start () {
    ENVIRONMENT=$1; shift

    case $ENVIRONMENT in
        development)
            start_development $*
        ;;
        staging)
            start_staging $*
        ;;
        production)
            start_production $*
        ;;
        *)
            echo "[!] Invalid or no environment specified [$ENVIRONMENT]. Available environments: development, staging, production"
            exit 1
        ;;
    esac
}

COMMAND=$1; shift
case $COMMAND in
    start)
        start $*
    ;;
    shell)
        shell $*
    ;;
    test)
        run_tests $*
    ;;
    *)
        echo "[!] Invalid or no command specified [$COMMAND]. Available commands: start, migrate, test, shell"
        exit 1
    ;;
esac

exit $?
