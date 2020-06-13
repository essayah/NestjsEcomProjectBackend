import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';



declare const module: any;
const port = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  /*
  Utilisation de Swagger pour generer la documentation de API
  */
  const options = new DocumentBuilder()
  .setTitle('Ecommerce Application')
  .setDescription('API de Mon premiere applicaton Nest')
  .setVersion('1.0')
  .addTag('Ecommmerce App')
  .build(); 
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('EcomApp/api', app, document);
 
  await app.listen(port);

  Logger.log('Server Running on :' + port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
