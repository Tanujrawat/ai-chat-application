import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors(); // added this line , to make server request possible

  await app.listen(3001); // changed it from 3000 to 3001 , which resolved the issue of 'Hello world' coming on page refrresh
}
bootstrap();
