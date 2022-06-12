import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from './app.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      /**
       * whiltelist:true means anything frontend sent to backend is more than expected will be allowed, but also be filtered ---
       *  frontend sent
       * {
       *  username: "avarile",
       *  password: "1q2w3e4r",
       *  auth: "operator",
       *  somethingAdditional: "awdqw2dfqw4sdafc1123"
       * }
       * but the backend only expecting username, password, and auth, so the "somethingAdditional" wont get through
       *
       */
    }),
  );

  // this is one way to use services in the intercepter or guard
  app.useGlobalInterceptors(
    new AuthInterceptor(app.get(UsersService)),
  );
  await app.listen(3000);
}
bootstrap();
