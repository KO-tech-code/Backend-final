import { Injectable } from '@nestjs/common';

@Injectable()
export class NumbersService {
  calculateConcatenatedProduct(first: number, second: number): string {
    let concatenated = '';
    for (let i = 1; i <= second; i++) {
      concatenated += (first * i).toString(); // Concatenar el producto actual
      if (concatenated.length >= 9) {
        break; // Detenernos al alcanzar 9 dígitos
      }
    }
    return concatenated.substring(0, 9); // Devolver solo los primeros 9 dígitos
  }
}
