import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateBr'
})
export class DateBrPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
