import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';

@Catch()
class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (exception) {
      console.log(exception, 'http');
      response.status(exception?.status||500).json({
        statusCode: exception?.status,
        message: exception?.response?.message
          ? exception?.response?.message
          : exception?.message,
      });
    } else if (exception?.status && typeof exception?.status === 'number') {
      console.log(exception, 'rcp');
      //to handle Rpc and http exception inside it
      response.status(exception?.status).json({
        statusCode: exception?.status,
        message: exception?.message
          ? exception?.message
          : exception?.response?.message,
      });
    } else if (exception?.error) {
      //to handle validation errors
      console.log(exception, 'validation');
      response.status(exception?.error?.statusCode).json({
        statusCode: exception?.error?.statusCode,
        message: exception?.error?.message,
      });
    } else {
      response.status(500).json({
        statusCode: 500,
        message: 'Internal  Server Error!',
      });
    }
  }
}
export default GlobalExceptionFilter;
