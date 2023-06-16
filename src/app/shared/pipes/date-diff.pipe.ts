import {Pipe, PipeTransform} from '@angular/core';
import {DateTime, DurationUnit} from "luxon";

@Pipe({
  name: 'dateDiff'
})
export class DateDiffPipe implements PipeTransform {

  transform(fromDate: DateTime, diffUnit: DurationUnit = 'year'): number {
    return Math.floor(DateTime.now().diff(fromDate).as(diffUnit));
  }

}
