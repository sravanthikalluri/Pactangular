import {Pipe} from '@angular/core';
import {PipeTransform} from '@angular/core';
@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform{
  transform(value:any,type:any,data:any) {
    let filtered: any = [];
    let stringMatch = new RegExp(value, 'i');
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (stringMatch.test(item[type])) {
        filtered.push(item);
      }
    }
    return filtered;
  }
}
