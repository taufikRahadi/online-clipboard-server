import { NotFoundException } from '@nestjs/common'
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { Clipboard } from '../../business/clipboard/clipboard.schema'
import { ClipboardService } from './clipboard.service'

describe('ClipboardService', () => {
  let service: ClipboardService

  beforeEach(async () => {
    class mockClipboardModel {
      constructor(dto: any) {
        this.data = dto
      }

      data: any
      static code = ''

      save() {
        return this.data
      }

      static findOne(obj: { code: string }) {
        this.code = obj.code
        return this
      }

      static exec() {
        if (this.code === 'rn70i8')
          return {
            _id: '6238abff595ddf96d07da40a',
            code: 'rn70i8',
            title: 'judul',
            body: 'ini body',
            __v: 0,
          }
        else return undefined
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Clipboard.name),
          useValue: mockClipboardModel,
        },
        ClipboardService,
      ],
    }).compile()

    service = module.get<ClipboardService>(ClipboardService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return created clipboard data', async () => {
    const payload = {
      title: 'ini judul',
      body: 'ini body',
    }

    const createClipboard = await service.createClipboard(payload)

    expect(createClipboard).toMatchObject({
      code: expect.any(String),
      title: payload.title,
      body: payload.body,
    })
    expect(createClipboard.code).toHaveLength(6)
  })

  it('should return board by code', async () => {
    const code = 'rn70i8'

    const clipboard = await service.getClipboardByCode(code)

    expect(clipboard).toBeDefined()
    expect(clipboard.code).toBe(code)
    expect(clipboard).toMatchObject({
      _id: '6238abff595ddf96d07da40a',
      code: 'rn70i8',
      title: 'judul',
      body: 'ini body',
      __v: 0,
    })
  })

  it('should return not found error', async () => {
    const code = '2230as'

    const clipboard = service.getClipboardByCode(code)

    await expect(clipboard).rejects.toThrow(NotFoundException)
  })
})
