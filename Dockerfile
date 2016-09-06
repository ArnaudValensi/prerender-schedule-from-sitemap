FROM node:argon

MAINTAINER Arnaud Valensi "arnaud.valensi@gmail.com"

RUN echo deb http://ftp.debian.org/debian/ jessie main contrib non-free > /etc/apt/source.list

RUN apt-get update -y && apt-get install -y \
    python2.7 python-pip \
    libfreetype6 libfontconfig

RUN mkdir /data
WORKDIR /data

ADD ./package.json /data/
RUN  npm install

ADD . /data/

CMD [ "npm", "start" ]
