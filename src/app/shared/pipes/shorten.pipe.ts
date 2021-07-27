import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: string) {
    let decrip = value.split(' ');

    if (decrip.length > 10) {
      let descArray = decrip.slice(0, 5).join(' ');
      return descArray + ' ...';
    }
    return value;

  }

}
