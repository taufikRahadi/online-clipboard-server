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

  app.enableCors({
    origin: '*',
  })

  const configService = app.get<ConfigService>(ConfigService)

  const port = configService.get<number>('PORT') ?? 8080

  // use global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        throw new BadRequestException(errors)
      },
    }),
  )

  app.setGlobalPrefix('/api')

  await app.listen(port, '0.0.0.0')
  Logger.verbose(
    `Nest Application is listening on port ${port}`,
    'NestApplication',
  )
}

bootstrap()
