import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateClipboardDto } from '../../business/clipboard/clipboard.dto'
import { ClipboardService } from './clipboard.service'

@Controller('clipboard')
export class ClipboardController {
  constructor(private readonly clipboardService: ClipboardService) {}

  @Post()
  createClipboard(@Body() payload: CreateClipboardDto) {
    return this.clipboardService.createClipboard(payload)
  }

  @Get('/:code')
  getClipboardByCode(@Param('code') code: string) {
    return this.clipboardService.getClipboardByCode(code)
  }
}
