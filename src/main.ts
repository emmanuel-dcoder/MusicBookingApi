import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './core/common/filters/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*', credentials: true });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Music Booking API')
    .setDescription('API for managing artists, Users, events, and bookings')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const adapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(adapterHost));
  await app.listen(process.env.PORT ?? 3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
