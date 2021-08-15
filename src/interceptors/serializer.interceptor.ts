import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';


interface classConstructor {
  new (...args: any[]): {}
}

export function Serialize(dto: classConstructor){
  return UseInterceptors(new SerializerInterceptor(dto))
}


@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  constructor(private dto: any){}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(
      map((data: any) => {
        // run something before the response is sent out
        return plainToClass(this.dto, data, { excludeExtraneousValues: true });
      }),
    );
  }
}
