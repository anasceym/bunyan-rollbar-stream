# bunyan-rollbar-stream [![Build Status][travis-badge]][travis-url] [![codecov][codecov-badge]][codecov-url] [![npm][npm-badge]][npm-url]

> Bunyan stream for sending Rollbar

## Install

With NPM

```bash
npm install --save bunyan-rollbar-stream
```

## Usage

```javascript
import Rollbar from 'rollbar'
import bunyan from 'bunyan'
import BunyanRollbarStream from 'bunyan-rollbar-stream'

var rollbar = new Rollbar({
  accessToken: 'MY-ROLLBAR-ACCESS-TOKEN',
})

var log = bunyan.createLogger({
  name: 'my-app',
  serializers: bunyan.stdSerializers,
  streams: [
    {
      name: 'rollbar',
      stream: new BunyanRollbarStream({
        rollbar: rollbar
      }),
      level: 'error'
    }
  ]
})

// This line will automatically sends error to Rollbar
log.error({ err: new Error('Error') }, 'Some error occurred')
```

[travis-badge]:https://travis-ci.org/anasceym/bunyan-rollbar-stream.svg?branch=master
[travis-url]:https://travis-ci.org/anasceym/bunyan-rollbar-stream
[codecov-badge]:https://codecov.io/gh/anasceym/bunyan-rollbar-stream/branch/master/graph/badge.svg
[codecov-url]:https://codecov.io/gh/anasceym/bunyan-rollbar-stream
[npm-badge]:https://img.shields.io/npm/v/bunyan-rollbar-stream.svg
[npm-url]:https://www.npmjs.com/package/bunyan-rollbar-stream
