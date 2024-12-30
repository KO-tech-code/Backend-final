import { Test, TestingModule } from '@nestjs/testing';
import { ConversionController } from './conversion.controller';
import { ConversionService } from './conversion.service';

const mockConversionService = {
  getConvertedAmount: jest.fn(),
};

describe('ConversionController', () => {
  let controller: ConversionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConversionController],
      providers: [
        {
          provide: ConversionService,
          useValue: mockConversionService,
        },
      ],
    }).compile();

    controller = module.get<ConversionController>(ConversionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getConvertedAmount and return the result', async () => {
    mockConversionService.getConvertedAmount.mockResolvedValue(8000);

    const result = await controller.getConvertedAmount('USD', 'CLP', '10');
    expect(result).toEqual({
      from: 'USD',
      to: 'CLP',
      date: 'latest',
      originalAmount: 10,
      convertedAmount: 8000,
    });

    expect(mockConversionService.getConvertedAmount).toHaveBeenCalledWith(
      'USD',
      'CLP',
      10,
      undefined,
    );
  });
});
