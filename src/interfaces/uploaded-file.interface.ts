export type AppMimeType = 'image/png' | 'image/jpeg';

export interface IUploadedFile {
  encoding: string;
  buffer: Buffer;
  fieldname: string;
  mimetype: string;
  originalname: string;
  size: number;
}
