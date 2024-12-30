import { Test, TestingModule } from '@nestjs/testing';
import { ConversionService } from './conversion.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';

describe('ConversionService', () => {
  let service: ConversionService;
  let mockHttpService: { get: jest.Mock };

  beforeEach(async () => {
    mockHttpService = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversionService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: ConfigService, useValue: { get: jest.fn().mockReturnValue('mock-api-key') } },
      ],
    }).compile();

    service = module.get<ConversionService>(ConversionService);
  });

  it('debería calcular correctamente una conversión', async () => {
    const mockResponse = {
      data: {
        rates: {
          USD: 1,
          CLP: 800,
        },
      },
    };

    mockHttpService.get.mockReturnValueOnce(of(mockResponse));

    const result = await service.getConvertedAmount('USD', 'CLP', 10);
    expect(result).toBe(8000); // 10 * 800
  });

  it('debería lanzar un error si las monedas no existen', async () => {
    const mockResponse = {
      data: {
        rates: {
          USD: 1,
        },
      },
    };

    mockHttpService.get.mockReturnValueOnce(of(mockResponse));

    await expect(service.getConvertedAmount('USD', 'XXX', 10)).rejects.toThrow(
      'Las monedas USD o XXX no están soportadas.',
    );
  });
});
