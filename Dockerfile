FROM node:15-alpine

WORKDIR app/

ENV NODE_ENV dev

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "start" ]
