import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ConversionService } from './conversion.service';

@Controller('conversion')
export class ConversionController {
  constructor(private readonly conversionService: ConversionService) {}

  @Get('getConvertedAmount')
  async getConvertedAmount(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('amount') amount: string,
    @Query('date') date?: string,
  ): Promise<any> {
    if (!from || !to || !amount) {
      throw new BadRequestException(
        'Los parámetros "from", "to" y "amount" son requeridos.',
      );
    }

    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      throw new BadRequestException(
        'El parámetro "amount" debe ser un número positivo.',
      );
    }

    const convertedAmount = await this.conversionService.getConvertedAmount(
      from.toUpperCase(),
      to.toUpperCase(),
      numericAmount,
      date,
    );

    return {
      from,
      to,
      date: date || 'latest',
      originalAmount: numericAmount,
      convertedAmount,
    };
  }
}
