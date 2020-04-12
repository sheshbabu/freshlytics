ARG NODE_VERSION="12.16.2"

FROM node:${NODE_VERSION} AS development

ENV NODE_ENV "development"
WORKDIR /usr/src/freshlytics

COPY package*.json ./
RUN npm install --no-optional

COPY . .

CMD ["npm", "run", "dev"]
EXPOSE 3000/tcp 3001/tcp

FROM development AS builder

ENV NODE_ENV "production"
RUN npm run build

FROM node:${NODE_VERSION} AS production

ENV NODE_ENV "production"
WORKDIR /usr/src/freshlytics

COPY --from=builder /usr/src/freshlytics/ ./

RUN npm install --production --no-optional

RUN chown -R node:node .

USER node

CMD ["npm", "start"]
EXPOSE 3001/tcp
