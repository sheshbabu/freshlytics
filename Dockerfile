ARG NODE_VERSION="12.2.0"
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

FROM node:${NODE_VERSION}-slim AS production

ENV NODE_ENV "production"
WORKDIR /usr/src/freshlytics

ENV BUILD_DEPS="python2.7 make g++"

RUN apt-get update && \
  apt-get install -y --no-install-recommends \
    ${BUILD_DEPS} && \
  rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/src/freshlytics/package*.json ./
RUN PYTHON=/usr/bin/python2.7 \
  npm install --production --no-optional && \
  apt-get purge -y ${BUILD_DEPS} && \
  apt-get autoremove -y

COPY --from=builder /usr/src/freshlytics/dist ./dist/
RUN chown -R node:node .

USER node

CMD ["npm", "start"]
EXPOSE 3000/tcp 3001/tcp
