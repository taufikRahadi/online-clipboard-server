import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import {
  Clipboard,
  ClipboardSchema,
} from '../../business/clipboard/clipboard.schema'
import { ClipboardController } from './clipboard.controller'
import { ClipboardService } from './clipboard.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Clipboard.name,
        schema: ClipboardSchema,
      },
    ]),
  ],
  controllers: [ClipboardController],
  providers: [ClipboardService],
})
export class ClipboardModule {}
