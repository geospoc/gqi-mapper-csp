FROM node:14

WORKDIR /app/

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci --no-audit

COPY . .
RUN npm run build

CMD ["npm", "run", "start", "--", "-p", "8000"]
