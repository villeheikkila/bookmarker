
FROM node:10
EXPOSE 3000

WORKDIR /usr/src/app
RUN mkdir bookmarker-frontend
COPY bookmarker-frontend/package.json ./bookmarker-frontend
RUN cd bookmarker-frontend && npm install

COPY . .

RUN cd /usr/src/app/bookmarker-frontend && npm run-script build

WORKDIR /usr/src/app
RUN mv ./bookmarker-frontend/build ./bookmarker-backend

WORKDIR /usr/src/app/bookmarker-backend
RUN npm install

CMD [ "npm", "start" ]