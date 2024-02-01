FROM node:18.17

ENV APP_NAME='tindergpt-front2'

RUN echo ${APP_NAME}

WORKDIR /usr/src/app
COPY . .

EXPOSE 3000

USER root
RUN npm install
RUN npm run build

CMD ["npm", "start"]