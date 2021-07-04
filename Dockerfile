FROM node:15

WORKDIR app/

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install -g npm@7.19.1
RUN npm install

COPY . .
EXPOSE 8000

CMD [ "npm", "run", "start:container" ]
