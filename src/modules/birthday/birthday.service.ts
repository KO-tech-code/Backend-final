import { Injectable } from '@nestjs/common';
import { Rindegastino } from './interfaces/rindegastino.interface';

@Injectable()
export class BirthdayService {
  private rindegastinos: Rindegastino[] = [];

  calculateDaysUntilBirthday(birthdate: string): number {
    const today = new Date();
    const birth = new Date(birthdate);

    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const diff = nextBirthday.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  registerRindegastino(name: string, birthdate: string): Rindegastino {
    const daysUntilBirthday = this.calculateDaysUntilBirthday(birthdate);
    const newRindegastino: Rindegastino = { name, birthdate, daysUntilBirthday };

    this.rindegastinos.push(newRindegastino);
    return newRindegastino;
  }

  getAllRindegastinos(): Rindegastino[] {
    return this.rindegastinos.map((r) => ({
      ...r,
      daysUntilBirthday: this.calculateDaysUntilBirthday(r.birthdate),
    }));
  }
}
