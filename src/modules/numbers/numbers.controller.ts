import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { NumbersService } from './numbers.service';

@Controller('numbers')
export class NumbersController {
  constructor(private readonly numbersService: NumbersService) {}

  @Get('getTheNumber')
  getTheNumber(
    @Query('first') first: string,
    @Query('second') second: string,
  ): { result: string } {
    if (!first) {
      throw new BadRequestException('El parámetro "first" es requerido.');
    }
    if (!second) {
      throw new BadRequestException('El parámetro "second" es requerido.');
    }

    const num1 = parseInt(first, 10);
    const num2 = parseInt(second, 10);

    if (isNaN(num1) || num1 <= 0) {
      throw new BadRequestException('El parámetro "first" debe ser un número positivo mayor que cero.');
    }
    if (isNaN(num2) || num2 <= 0) {
      throw new BadRequestException('El parámetro "second" debe ser un número positivo mayor que cero.');
    }

    const result = this.numbersService.calculateConcatenatedProduct(num1, num2);
    return { result };
  }
}
