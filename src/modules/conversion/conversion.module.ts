import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ConversionController } from './conversion.controller';
import { ConversionService } from './conversion.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [ConversionController],
  providers: [ConversionService],
})
export class ConversionModule {}
