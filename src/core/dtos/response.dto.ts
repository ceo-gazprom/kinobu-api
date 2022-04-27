import { ApiProperty } from '@nestjs/swagger';
import { IResponse } from '../interfaces';

export class ResponseErrorDto implements IResponse {
  @ApiProperty()
  public message: string;

  @ApiProperty()
  public data: any[];

  @ApiProperty()
  public errorMessage: any;

  @ApiProperty()
  public error: any;

  @ApiProperty()
  public success: boolean;

  constructor(infoMessage: string, data?: any) {
    this.success = false;
    this.message = infoMessage;
    this.data = data;
    console.warn(
      new Date().toString() +
        ' - [Response]: ' +
        infoMessage +
        (data ? ' - ' + JSON.stringify(data) : ''),
    );
  }
}

export class ResponseSuccessDto implements IResponse {
  @ApiProperty()
  public message: string;

  @ApiProperty()
  public data: any[];

  @ApiProperty()
  public errorMessage: any;

  @ApiProperty()
  public error: any;

  @ApiProperty()
  public success: boolean;
}
