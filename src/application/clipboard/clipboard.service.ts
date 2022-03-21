import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import {
  Clipboard,
  ClipboardDocument,
} from '../../business/clipboard/clipboard.schema'
import { Model } from 'mongoose'
import { CreateClipboardDto } from '../../business/clipboard/clipboard.dto'
import { customCodeGenerator } from '../../utils/custom-code'

@Injectable()
export class ClipboardService {
  constructor(
    @InjectModel(Clipboard.name)
    private readonly clipboardModel: Model<ClipboardDocument>,
  ) {}

  async createClipboard(payload: CreateClipboardDto): Promise<Clipboard> {
    try {
      const code = customCodeGenerator()
      const clipboard = new this.clipboardModel({ code, ...payload })

      return await clipboard.save()
    } catch (error) {
      throw error
    }
  }

  async getClipboardByCode(code: string): Promise<Clipboard> {
    try {
      const clipboard = await this.clipboardModel
        .findOne({
          code,
        })
        .exec()

      if (!clipboard)
        throw new NotFoundException(`Board with code '${code}' is not exists!`)

      return clipboard
    } catch (error) {
      throw error
    }
  }
}
