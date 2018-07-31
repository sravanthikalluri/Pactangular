/**
 * Created by Sravanthi on 25-Oct-17.
 */
import {Injectable, Pipe} from '@angular/core';
import {PipeTransform} from "@angular/core";

@Pipe({
  name: 'sliceString',
})
@Injectable()
export class SliceStringPipe implements PipeTransform {
  transform(link:any): any {
    return link.substring(0, 40) + "...";
  }
}
