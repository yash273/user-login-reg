import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameById'
})
export class NameByIdPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
