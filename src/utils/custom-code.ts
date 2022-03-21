import { customAlphabet } from 'nanoid'

export const customCodeGenerator = (length = 6) => {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', length)
  return nanoid()
}
