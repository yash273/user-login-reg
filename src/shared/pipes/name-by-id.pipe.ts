import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../services/data.service';

@Pipe({
  name: 'nameById'
})
export class NameByIdPipe implements PipeTransform {

  transform(value: any, data: any[], key: string): string {
    const item = data.find((item: any) => item.id === value);
    return item ? item[key] : '';
  }

}
