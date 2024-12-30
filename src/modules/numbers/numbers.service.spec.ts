import { Test, TestingModule } from '@nestjs/testing';
import { NumbersService } from './numbers.service';

describe('NumbersService', () => {
  let service: NumbersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NumbersService],
    }).compile();

    service = module.get<NumbersService>(NumbersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate concatenated product correctly for valid inputs', () => {
    // Caso 1: first=192, second=3
    expect(service.calculateConcatenatedProduct(192, 3)).toBe('192384576');

    // Caso 2: first=192, second=5
    expect(service.calculateConcatenatedProduct(192, 5)).toBe('192384576');

    // Caso 3: first=9, second=5
    expect(service.calculateConcatenatedProduct(9, 5)).toBe('918273645');

    // Caso 4: first=123, second=2
    expect(service.calculateConcatenatedProduct(123, 2)).toBe('123246');

    // Caso 5: first=123, second=1
    expect(service.calculateConcatenatedProduct(123, 1)).toBe('123');
  });
});
