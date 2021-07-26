import { Module, Global } from '@nestjs/common'
import { ReportRollbarService } from './report-rollbar.service'

@Global()
@Module({
  providers: [ReportRollbarService]
})
export class ReportRollbarModule {}
