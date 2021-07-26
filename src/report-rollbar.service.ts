import { Injectable } from '@nestjs/common'
import { RollbarLogger } from 'nestjs-rollbar'
import flatted from 'flatted'

export enum Type {
  log = 'log',
  error = 'error',
  warn = 'warn',
  debug = 'debug',
  verbose = 'verbose',
}

@Injectable()
export class ReportRollbarService {
  constructor(private readonly rollbarLogger: RollbarLogger) {}

  reportToRollbar(
    functionName: string,
    e: any,
    type: Type,
    payload?: any,
    variables?: any,
    req?: any,
    environment?: string,
  ) {
    console.error('[reportToRollbar]: ', e)
    try {
      if (!environment) environment = 'production'
      if (environment === 'production') {
        const title = `[${functionName}]: ${e.message}`
        const rollbarObj = {
          path: `${__filename}/${title}`,
          message: e.message,
          stack: e.stack,
          payload: null,
          variables: null,
          req: null,
          error: e,
        }
        if (payload) rollbarObj.payload = flatted.stringify(payload)
        if (variables) rollbarObj.variables = variables
        if (req) rollbarObj.req = req
        this.rollbarLogger[type](`${title}`, e.stack, rollbarObj)
      }
    } catch (e) {
      console.error('[reportToRollbar]: ', e)
      const title = `toRollbar:${e.message}`
      this.rollbarLogger[type](`${title}`, e)
    }
  }
}
