# Common Ground International
# Spanish Healthcare Language Web Application

[ ![Codeship Status for josh_king_/cgi-she-web-app](https://codeship.com/projects/09628140-e99d-0133-671b-02cde9680eda/status?branch=master)](https://codeship.com/projects/147642)

## Description
CGI Web Application is the User Interface application for Common Gateway International.

## Dependencies

1. Node.js
2. GNU Make - part of either the build-essentials metapackage for Debian Linux distributions or the XCode CLI toolchain which can be installed through the Apple App store

## Installation

    $ make install-deps

## Running Locally

The CGI web application can be run locally with the provided web server. By default, the server will bind itself to port 4000, however you can override this by setting a CLIENT_PORT environment variable in the shell you run the server from.

**Running the server with the default port:**
    $ API_HOST=http://localhost:3000 ./server
    $ API_HOST=http://cgi-she-server-d412b26a.6f78d14c.svc.dockerapp.io:8001 ./server
    $ (for server startup:) SECRET={whatever} ./bin/server

**Running the server with a custom port**
    $ CLIENT_PORT=6767 ./server

## Testing

Currently, unit tests live in the `tests/` directory, however this can be changed at any point. To run the unit test suite, simply run:

    $ make test

## Deployment

**TBD**