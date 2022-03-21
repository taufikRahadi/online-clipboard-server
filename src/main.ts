import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { ValidationError } from 'class-validator'
import { AppModule } from './application/app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  const configService = app.get<ConfigService>(ConfigService)

  const port = configService.get<number>('APP_PORT') ?? 8080

  // use global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        throw new BadRequestException(errors)
      },
    }),
  )

  app.setGlobalPrefix('/api')

  await app.listen(port)
  Logger.verbose(
    `Nest Application is listening on port ${port}`,
    'NestApplication',
  )
}

bootstrap()
