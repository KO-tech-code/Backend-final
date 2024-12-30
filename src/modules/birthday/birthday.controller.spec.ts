import { Test, TestingModule } from '@nestjs/testing';
import { BirthdayController } from './birthday.controller';
import { BirthdayService } from './birthday.service';

const mockBirthdayService = {
  calculateDaysUntilBirthday: jest.fn(),
  registerRindegastino: jest.fn(),
  getAllRindegastinos: jest.fn(),
};

describe('BirthdayController', () => {
  let controller: BirthdayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BirthdayController],
      providers: [
        {
          provide: BirthdayService,
          useValue: mockBirthdayService,
        },
      ],
    }).compile();

    controller = module.get<BirthdayController>(BirthdayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call registerRindegastino and return the registered Rindegastino', () => {
    const mockRindegastino = {
      name: 'John Doe',
      birthdate: '1990-01-01',
      daysUntilBirthday: 5,
    };

    mockBirthdayService.registerRindegastino.mockReturnValue(mockRindegastino);

    const result = controller.registerRindegastino({
      name: 'John Doe',
      birthdate: '1990-01-01',
    });

    expect(result).toEqual(mockRindegastino);
    expect(mockBirthdayService.registerRindegastino).toHaveBeenCalledWith(
      'John Doe',
      '1990-01-01',
    );
  });

  it('should call getAllRindegastinos and return all Rindegastinos', () => {
    const mockRindegastinos = [
      {
        name: 'Jane Doe',
        birthdate: '1990-02-02',
        daysUntilBirthday: 10,
      },
    ];

    mockBirthdayService.getAllRindegastinos.mockReturnValue(mockRindegastinos);

    const result = controller.getAllRindegastinos();
    expect(result).toEqual(mockRindegastinos);
    expect(mockBirthdayService.getAllRindegastinos).toHaveBeenCalled();
  });
});
