import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttext'
})
export class CuttextPipe implements PipeTransform {

  transform(text: string, limit: number = 3): string {
    return text.split(' ').slice(0, limit).join(' ') + (text.split(' ').length > limit ? ' ' : '');
  }

}
