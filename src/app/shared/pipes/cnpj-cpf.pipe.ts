import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpjCpf'
})
export class CnpjCpfPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
