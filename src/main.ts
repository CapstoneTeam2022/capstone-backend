import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('EMR Api')
    .setDescription('EMR API description')
    .setVersion('1.0')
    .addTag('EMR')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  let PORT = Number(process.env.APP_PORT);

  if (PORT === null || PORT === undefined) {
    console.log(
      `APP_PORT environment variable not found, setting port to 4001`,
    );
    PORT = 4001;
  }
  await app.listen(PORT);

  console.log(`Server running on port ${PORT}`);
}
bootstrap();
