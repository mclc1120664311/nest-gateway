import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  //success 响应格式处理
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3000);
}
bootstrap();
