FROM python:3.13-alpine3.21

WORKDIR /usr/app/src

EXPOSE 8001

ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

RUN apk add --no-cache geos
RUN apk add --no-cache gcc
RUN apk add --no-cache gdal
RUN apk add --no-cache gdal-dev
RUN apk add --no-cache gdal-driver-png
RUN apk add --no-cache gdal-driver-jpeg
RUN apk add --no-cache build-base
RUN apk add --no-cache zlib

RUN export CPLUS_INCLUDE_PATH=/usr/include/gdal
RUN export C_INCLUDE_PATH=/usr/include/gdal
RUN export LDFLAGS="-L/usr/local/opt/zlib/lib"
RUN export CPPFLAGS="-I/usr/local/opt/zlib/include"

RUN mkdir -p /usr/src/app/file

COPY . .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# CMD ["flask", "run", "--app", "api", "-h", "0.0.0.0", "-p", "8001", "--debug"]
