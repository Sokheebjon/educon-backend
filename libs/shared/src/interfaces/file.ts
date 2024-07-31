export interface IParsedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: {
      type: 'Buffer';
      data: number[];
    };
    size:number
  }
  