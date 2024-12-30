import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BirthdayModule } from './modules/birthday/birthday.module'; // Módulo de cumpleaños
import { NumbersModule } from './modules/numbers/numbers.module'; // Módulo de números concatenados
import { ConversionModule } from './modules/conversion/conversion.module'; // Módulo de conversión

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno sean accesibles globalmente
    }),
    BirthdayModule,
    NumbersModule,
    ConversionModule,
  ],
})
export class AppModule {}
