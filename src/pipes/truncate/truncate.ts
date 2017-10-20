import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TruncatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  // transform(value: string, ...args) {
  //   return value.toLowerCase();
  // }
  transform(value: string, args: string[]) : string {
    let limit = parseInt(args[0]);
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
