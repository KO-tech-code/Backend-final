import { Controller, Get, Post, Body, Query, BadRequestException } from '@nestjs/common';
import { BirthdayService } from './birthday.service';
import { Rindegastino } from './interfaces/rindegastino.interface';

@Controller('birthday')
export class BirthdayController {
  constructor(private readonly birthdayService: BirthdayService) {}

  @Post('register')
  registerRindegastino(@Body() body: { name: string; birthdate: string }): Rindegastino {
    const { name, birthdate } = body;

    if (!name || !birthdate) {
      throw new BadRequestException('El nombre y la fecha de nacimiento son requeridos.');
    }

    if (isNaN(Date.parse(birthdate))) {
      throw new BadRequestException('La fecha de nacimiento no tiene un formato válido (YYYY-MM-DD).');
    }

    return this.birthdayService.registerRindegastino(name, birthdate);
  }

  @Get('getDaysUntilMyBirthday')
  getDaysUntilMyBirthday(@Query('birthdate') birthdate: string): { daysUntilBirthday: number } {
    if (!birthdate) {
      throw new BadRequestException('El parámetro birthdate es requerido.');
    }

    if (isNaN(Date.parse(birthdate))) {
      throw new BadRequestException('El parámetro birthdate no tiene un formato válido (YYYY-MM-DD).');
    }

    const days = this.birthdayService.calculateDaysUntilBirthday(birthdate);
    return { daysUntilBirthday: days };
  }

  @Get('getRindegastinosBirthdays')
  getAllRindegastinos(): Rindegastino[] {
    return this.birthdayService.getAllRindegastinos();
  }
}
