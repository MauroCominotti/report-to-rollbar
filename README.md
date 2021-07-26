<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">Rollbar Module for NestJS</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Installation

NestJS Rollbar package allows you to extend standard Logger to send errors directly to Rollbar. Usage if quite simple. Get Rollbar Token from your project page and install nestjs-rollbar package:

```bash
npm i report-to-rollbar nestjs-rollbar
```

Then register module in your root app.module

```javascript
import { LoggerModule } from 'nestjs-rollbar';
import { ReportRollbarModule } from 'report-to-rollbar'

@Module({
	imports: [
		// ...
		LoggerModule.forRoot({
      accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
      environment: process.env.ROLLBAR_ENVIRONMENT
    }),
    ReportRollbarModule,
	],
})
export class AppModule {}
```

To use RollbarLogger in any service or controller just inject it in constructor:

```javascript
import {
  ReportRollbarService,
  Type
} from 'src/report-rollbar/report-rollbar.service'

constructor(
		private readonly reportRollbarService: ReportRollbarService
	) {}
```

To log an error to Rollbar just call `reportToRollbar()` method:

```javascript
try {
	throw new Error('Test error');
} catch (error) {
	this.rollbarLogger.reportToRollbar(
        `myMethod`,
        e,
        Type.error,
        null,
        e.data,
        e.config,
        null
      )
}
```

First parameter is the name of your method to show in logs, second an error object third the Type of the error, fourth the payload, fifth the variables, sixth the request sent, and seventh the environment chosen.

## Change Log

See [Changelog](CHANGELOG.md) for more information.

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Author

**Keybe - Mauro Cominotti**

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.