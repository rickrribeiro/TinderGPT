FROM node:18.17

ENV APP_NAME='tindergpt-api2'

RUN echo ${APP_NAME}

WORKDIR /usr/src/app
COPY . .

EXPOSE 3001

USER root

RUN npm install
RUN npm run build

CMD ["npm", "start"]