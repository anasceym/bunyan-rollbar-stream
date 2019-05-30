import Rollbar from 'rollbar'

interface Options {
  rollbar: Rollbar
}

const nameFromLevel: { [index: number]: string } = {
  10: 'debug',
  20: 'debug',
  30: 'info',
  40: 'warning',
  50: 'error',
  60: 'critical'
}

const BunyanRollbarStream = function(this: any, options: Options) {
  options = options

  if (options.rollbar) {
    this.rollbar = options.rollbar
  }
}

BunyanRollbarStream.prototype.write = function(chunk: any) {
  if (typeof chunk === 'string') {
    chunk = JSON.parse(chunk)
  }

  const levelName = nameFromLevel[chunk.level]
  const {
    name,
    hostname,
    pid,
    level,
    time,
    v,
    msg,
    err,
    req,
    ...customPayload
  } = chunk

  const argsArray = [msg, err, req, customPayload].filter(item => {
    if (typeof item === 'object' && Object.keys(item).length === 0) {
      return false
    }

    return !!item
  })

  this.rollbar[levelName](...argsArray)
}

export default BunyanRollbarStream
