import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  /**
   *
   */
  constructor(private readonly userService: UsersService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log(
    //   context.getArgs()[0].get('Authorization'),
    //   this.userService,
    //   this.jwtService,
    // );
    // console.log(context.getArgs()[0].url);

    // context.getArgs()[0]: this is request

    if (
      context.getArgs()[0].url !== '/users/login' &&
      context.getArgs()[0].url !== '/users/signup'
    ) {
      try {
        const decoded = jwt.verify(
          context.getArgs()[0].get('Authorization'),
          '123',
        );
        Logger.log(decoded);
        // this.userService
      } catch (error) {
        Logger.warn('failed to login');
        
      }
    }

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
