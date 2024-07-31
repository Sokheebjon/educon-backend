import { BadRequestException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

async function handleAsyncOperation<T>(operation: Promise<T>): Promise<T> {
  try {
    return await operation;
  } catch (err) {
    console.log(err);
    throw new RpcException(new BadRequestException(err));
  }
}
export default handleAsyncOperation;
