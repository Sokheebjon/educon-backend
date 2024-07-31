import {  Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

@Catch(HttpException)
 class RpcValidationFilter implements ExceptionFilter {
    catch(exception: HttpException) {
        throw new RpcException(exception?.getResponse())
    }
}
export default RpcValidationFilter