FROM node:11.10-slim

# Add dependencies
RUN apt-get update && apt-get -y --no-install-recommends install libpng-dev

# Prepare app directory
RUN mkdir -p /usr/app

ADD . /usr/app

COPY start.sh /usr/app

# Install dependencies
WORKDIR /usr/app

RUN npm install

CMD [ "bash", "/usr/app/start.sh" ]
