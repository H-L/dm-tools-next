FROM python:3.10-alpine

WORKDIR /usr/app/src

RUN apk add --no-cache geos
RUN apk add --no-cache gcc
RUN apk add --no-cache gdal
RUN apk add --no-cache gdal-dev
RUN apk add --no-cache build-base
RUN apk add --no-cache zlib

RUN export CPLUS_INCLUDE_PATH=/usr/include/gdal
RUN export C_INCLUDE_PATH=/usr/include/gdal
RUN export LDFLAGS="-L/usr/local/opt/zlib/lib"
RUN export CPPFLAGS="-I/usr/local/opt/zlib/include"

RUN mkdir -p /usr/src/app/file

COPY . .

RUN pip3 install --upgrade pip
RUN pip3 install GDAL==3.5.3
RUN pip3 install gdal2tiles