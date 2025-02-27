FROM node:fermium-alpine

RUN apk add -U --no-cache \
      bash \
      git \
      curl
RUN mkdir -p /app/api-graphql

WORKDIR /app/api-graphql

# Copy the package.json as well and install all packages.
# This is a separate step so the dependencies
# will be cached unless changes the file are made.
COPY yarn.lock package.json ./
RUN yarn install

COPY . ./

CMD ["yarn", "dev"]

