export interface IZodParse<T> {
  data: T | null
  error: boolean
}