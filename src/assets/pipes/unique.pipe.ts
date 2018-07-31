import {Injectable, Pipe} from '@angular/core';
import {PipeTransform} from "@angular/core";

@Pipe({
  name: 'unique',
})
@Injectable()
export class UniquePipe implements PipeTransform {
  transform(items: any[], keyName: any): any {
    var pos:any=[];
    var keys:any=[];
    for(let a of items) {
      var key = a[keyName];
      if (keys.indexOf(key) === -1) {
        keys.push(key);
        pos.push(a);
      }
    }
    return pos;
  }
}
