import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ClipboardModule } from './clipboard/clipboard.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      useFactory: (env: ConfigService) => ({
        uri: env.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    ClipboardModule,
  ],
})
export class AppModule {}
