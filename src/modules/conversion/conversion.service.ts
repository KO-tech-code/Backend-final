import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ConversionService {
  private readonly openExchangeUrl = 'https://openexchangerates.org/api';
  private readonly apiKey = '81af4b82d34b43e88a161b310b797576';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getConvertedAmount(
    from: string,
    to: string,
    amount: number,
    date?: string,
  ): Promise<number> {
    try {
      const apiKey = this.configService.get<string>('OPENEXCHANGE_API_KEY');

      if (!apiKey) {
        throw new Error('La clave de API no está configurada en las variables de entorno.');
      }

      // Construir URL basada en si se necesita una tasa histórica o actual
      const url = date
        ? `${this.openExchangeUrl}/historical/${date}.json`
        : `${this.openExchangeUrl}/latest.json`;

      console.log('Solicitando a Open Exchange Rates:', {
        url,
        params: { app_id: apiKey },
      });

      // Hacer la solicitud a la API
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: { app_id: apiKey },
        }),
      );

      const rates = response.data.rates;

      // Validar que las monedas existan
      if (!rates[from] || !rates[to]) {
        throw new Error(`Las monedas ${from} o ${to} no están soportadas.`);
      }

      // Calcular la tasa de conversión
      const rateFromUSD = rates[from];
      const rateToUSD = rates[to];
      const rate = rateToUSD / rateFromUSD;

      // Realizar la conversión
      return amount * rate;
    } catch (error) {
      const apiError = error.response?.data;
      console.error('Error en la solicitud a Open Exchange Rates:', {
        message: apiError?.message || error.message,
        status: apiError?.status || error.response?.status,
        description: apiError?.description || 'Sin descripción',
      });
      throw new HttpException(
        `Error al convertir moneda: ${
          apiError?.description || error.message
        }`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
