# bunyan-rollbar-stream

> Bunyan stream for sending Rollbar

[![NPM][https://nodei.co/npm/bunyan-rollbar-stream.svg?downloads=true]][https://npmjs.org/package/bunyan-rollbar-stream]

## Install

  1. NPM
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
