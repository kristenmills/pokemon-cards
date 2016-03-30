FROM node:5

RUN mkdir /app
WORKDIR /app
COPY ./package.json /app
RUN npm install

ENV NODE_ENV PRODUCTION
ENV PORT 8000
COPY . /app
RUN npm run build

WORKDIR /app/build

EXPOSE 8000

CMD npm start

