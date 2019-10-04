FROM node:10.15-alpine

MAINTAINER Trocafone Suricata TEAM "tech-suricata@trocafone.com"

ARG hash=dev
ARG branch=dev
ARG TROCA_APP_NAME=cart-mock-api
ARG TROCA_APP_PATH=/opt/${TROCA_APP_NAME}

ENV TROCA_APP_NAME=${TROCA_APP_NAME}
ENV TROCA_APP_PATH=${TROCA_APP_NAME}

WORKDIR ${TROCA_APP_PATH}

LABEL com.trocafone.app_name=${TROCA_APP_NAME}
LABEL com.trocafone.repository=trocafone/cart.git
LABEL com.trocafone.commit_hash=${commit_hash}
LABEL com.trocafone.branch=${branch}

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --frozen-lockfile --production

COPY . .

ENTRYPOINT ["./entrypoint.sh"]