import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import {response} from 'express';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    const respone = context.switchToHttp().getResponse<Response>();
    const statusCode = response.statusCode ?? 200;

    return next.handle().pipe(
      map((data: T) => ({
        statusCode,
        message: 'success',
        data
      }))
    );
  }
}
