# bunyan-rollbar-stream

> Bunyan stream for sending Rollbar

[![NPM][npm-icon]][npm-url] 
[![Build Status][travis-icon]][travis-url]


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

[npm-icon]: https://nodei.co/npm/bunyan-rollbar-stream.svg?downloads=true
[npm-url]: https://npmjs.org/package/bunyan-rollbar-stream
[travis-icon]: https://travis-ci.org/anasceym/bunyan-rollbar-stream.svg?branch=master
[travis-url]: https://travis-ci.org/anasceym/bunyan-rollbar-stream
