import { HttpException, HttpStatus } from '@nestjs/common';
import { BUSINESS_ERROR_CODE } from './business.error.codes';

export interface BusinessError {
  code: number;
  message: string;
}

export class BusinessException extends HttpException {
  static throwForbidden() {
    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.ACCESS_FORBIDDEN,
      message: '抱歉哦，您无此权限！',
    });
  }
  constructor(err: BusinessError | string) {
    if (typeof err === 'string') {
      err = {
        code: BUSINESS_ERROR_CODE.COMMON,
        message: err,
      };
    }
    super(err, HttpStatus.OK);
  }
}
