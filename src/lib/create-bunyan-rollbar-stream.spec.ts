import test from 'ava'
import bunyan from 'bunyan'
import Rollbar from 'rollbar'
import sinon from 'sinon'
import * as TypeMoq from 'typemoq'

import BunyanRollbarStream from './create-bunyan-rollbar-stream'

let sandbox: sinon.SinonSandbox

test.beforeEach(() => {
  sandbox = sinon.createSandbox()
})

test.afterEach.always(() => {
  sandbox.restore()
})

test.serial('Normal scene', t => {
  // Prepare
  const msg = 'hello world!'
  const logLevel = 'info'
  const rollbar = new Rollbar({
    accessToken: 'POST_SERVER_ITEM_ACCESS_TOKEN'
  })

  const mockedRollbar: TypeMoq.IMock<Rollbar> = TypeMoq.Mock.ofInstance(
    rollbar
  )
  mockedRollbar.setup(x => x[logLevel]())

  const logger = bunyan.createLogger({
    level: logLevel,
    name: 'myapp',
    stream: new (BunyanRollbarStream as any)({
      rollbar: mockedRollbar.object
    })
  })

  // Action
  logger[logLevel](msg)

  // Assert
  try {
    mockedRollbar.verify(x => x[logLevel](msg), TypeMoq.Times.atLeastOnce())
  } catch (err) {
    t.fail(err)
  }

  t.pass()
  mockedRollbar.reset()
})

test.serial('With err object', t => {
  // Prepare
  const msg = 'hello world!'
  const logLevel = 'error'
  const err = new Error('Some error occurred')
  const rollbar = new Rollbar({
    accessToken: 'POST_SERVER_ITEM_ACCESS_TOKEN'
  })

  const mockedRollbar: TypeMoq.IMock<Rollbar> = TypeMoq.Mock.ofInstance(
    rollbar
  )
  mockedRollbar.setup(x => x[logLevel]())

  const logger = bunyan.createLogger({
    name: 'myapp',
    serializers: bunyan.stdSerializers,
    streams: [
      {
        level: logLevel,
        stream: new (BunyanRollbarStream as any)({
          rollbar: mockedRollbar.object
        }),
        type: 'raw'
      }
    ]
  })

  // Action
  logger[logLevel]({ err }, msg)

  // Assert
  try {
    mockedRollbar.verify(
      x => x[logLevel](TypeMoq.It.isAnyString(), TypeMoq.It.isAny()),
      TypeMoq.Times.atLeastOnce()
    )
  } catch (err) {
    t.fail(err)
  }

  t.pass()
  mockedRollbar.reset()
})

interface RequestObject {
  headers?: string
  protocol?: string
  url?: string
  method?: string
  body?: string
  route?: string
}

test.serial('With req object', t => {
  // Prepare
  const msg = 'hello world!'
  const logLevel = 'error'
  const req: RequestObject = {
    url: 'https://google.com'
  }

  const rollbar = new Rollbar({
    accessToken: 'POST_SERVER_ITEM_ACCESS_TOKEN'
  })

  const mockedRollbar: TypeMoq.IMock<Rollbar> = TypeMoq.Mock.ofInstance(
    rollbar
  )
  mockedRollbar.setup(x => x[logLevel]())

  const logger = bunyan.createLogger({
    name: 'myapp',
    serializers: bunyan.stdSerializers,
    streams: [
      {
        level: logLevel,
        stream: new (BunyanRollbarStream as any)({
          rollbar: mockedRollbar.object
        }),
        type: 'raw'
      }
    ]
  })

  // Action
  logger[logLevel]({ req }, msg)

  // Assert
  try {
    mockedRollbar.verify(
      x => x[logLevel](TypeMoq.It.isAnyString(), req),
      TypeMoq.Times.atLeastOnce()
    )
  } catch (err) {
    t.fail(err)
  }

  t.pass()
  mockedRollbar.reset()
})

test.serial('With custom parameter', t => {
  // Prepare
  const msg = 'hello world!'
  const logLevel = 'error'
  const customParams = {
    custom: 'https://google.com'
  }

  const rollbar = new Rollbar({
    accessToken: 'POST_SERVER_ITEM_ACCESS_TOKEN'
  })

  const mockedRollbar: TypeMoq.IMock<Rollbar> = TypeMoq.Mock.ofInstance(
    rollbar
  )
  mockedRollbar.setup(x => x[logLevel]())

  const logger = bunyan.createLogger({
    name: 'myapp',
    serializers: bunyan.stdSerializers,
    streams: [
      {
        level: logLevel,
        stream: new (BunyanRollbarStream as any)({
          rollbar: mockedRollbar.object
        }),
        type: 'raw'
      }
    ]
  })

  // Action
  logger[logLevel]({ ...customParams }, msg)

  // Assert
  try {
    mockedRollbar.verify(
      x => x[logLevel](TypeMoq.It.isAnyString(), customParams),
      TypeMoq.Times.atLeastOnce()
    )
  } catch (err) {
    t.fail(err)
  }

  t.pass()
  mockedRollbar.reset()
})

test.serial('With err, req, and custom parameter', t => {
  // Prepare
  const msg = 'hello world!'
  const logLevel = 'error'
  const err = new Error('Some error occurred')
  const req: RequestObject = {
    url: 'https://google.com'
  }
  const customParams = {
    custom: 'https://google.com'
  }

  const rollbar = new Rollbar({
    accessToken: 'POST_SERVER_ITEM_ACCESS_TOKEN'
  })

  const mockedRollbar: TypeMoq.IMock<Rollbar> = TypeMoq.Mock.ofInstance(
    rollbar
  )
  mockedRollbar.setup(x => x[logLevel]())

  const logger = bunyan.createLogger({
    name: 'myapp',
    serializers: bunyan.stdSerializers,
    streams: [
      {
        level: logLevel,
        stream: new (BunyanRollbarStream as any)({
          rollbar: mockedRollbar.object
        }),
        type: 'raw'
      }
    ]
  })

  // Action
  logger[logLevel]({ err, req, ...customParams }, msg)

  // Assert
  try {
    mockedRollbar.verify(
      x =>
        x[logLevel](
          TypeMoq.It.isAnyString(),
          TypeMoq.It.isAny(),
          req,
          customParams
        ),
      TypeMoq.Times.atLeastOnce()
    )
  } catch (err) {
    t.fail(err)
  }

  t.pass()
  mockedRollbar.reset()
})

test.serial('Using log.fatal from bunyan, sends rollbar as critical', t => {
  // Prepare
  const msg = 'hello world!'
  const logLevel = 'fatal'
  const rollbar = new Rollbar({
    accessToken: 'POST_SERVER_ITEM_ACCESS_TOKEN'
  })

  const mockedRollbar: TypeMoq.IMock<Rollbar> = TypeMoq.Mock.ofInstance(
    rollbar
  )
  mockedRollbar.setup(x => x.critical())

  const logger = bunyan.createLogger({
    level: logLevel,
    name: 'myapp',
    stream: new (BunyanRollbarStream as any)({
      rollbar: mockedRollbar.object
    })
  })

  // Action
  logger[logLevel](msg)

  // Assert
  try {
    mockedRollbar.verify(x => x.critical(msg), TypeMoq.Times.atLeastOnce())
  } catch (err) {
    t.fail(err)
  }

  t.pass()
  mockedRollbar.reset()
})
