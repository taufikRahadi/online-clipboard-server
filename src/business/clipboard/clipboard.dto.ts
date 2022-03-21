import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'

export class CreateClipboardDto {
  @IsString()
  @IsOptional()
  title: string

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(3)
  body: string
}
