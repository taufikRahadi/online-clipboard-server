import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ClipboardDocument = Clipboard & Document

@Schema()
export class Clipboard {
  @Prop({
    unique: true,
  })
  code: string

  @Prop()
  title: string

  @Prop()
  body: string
}

export const ClipboardSchema = SchemaFactory.createForClass(Clipboard)
