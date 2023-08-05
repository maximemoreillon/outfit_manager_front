# Build the Vue app
FROM node:16 as build-stage
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY ./ .
RUN npm run build

# Put the built app in a serving container
FROM moreillon/api-proxy:e80c1d87 as production-stage
COPY --from=build-stage /app/dist /usr/src/app/dist

# Loading environment variables at runtime
COPY ./env_subst.sh /docker-entrypoint.d/env_subst.sh
RUN chmod +x /docker-entrypoint.d/env_subst.sh
