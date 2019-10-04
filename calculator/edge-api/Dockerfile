FROM mhart/alpine-node:10

MAINTAINER Alan Szpigiel "alanszp@trocafone.com"

ENV TROCA_APP_NAME='calculator-edge-api'
ENV TROCA_APP_PATH='/opt/calculator-edge-api'

COPY . /opt/calculator-edge-api

WORKDIR /opt/calculator-edge-api

VOLUME /opt/calculator-edge-api/logs

RUN apk add --update
    yarn install && \
    yarn run build

ENTRYPOINT ["/opt/calculator-edge-api/entrypoint.sh"]
CMD ["start", "development"]