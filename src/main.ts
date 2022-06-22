import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV_VARIABLES } from './constants/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get<string>(ENV_VARIABLES.PORT)
  await app.listen(port);
}

bootstrap();
