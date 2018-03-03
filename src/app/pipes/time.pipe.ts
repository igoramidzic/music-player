import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(seconds){
    let hour = Math.floor(seconds / 3600);
    seconds = seconds - 3600 * hour;
    let minute = Math.floor(seconds / 60);
    seconds = seconds - 60 * minute;
    let second = seconds;

    let timeString = '';

    if (hour) {
      timeString += hour + ':';
    }
    if (hour && minute < 10) {
      timeString += '0';
    }
    if (minute == 0) {
      timeString += '0';
    }
    if (minute) {
      timeString += minute;
    }
    timeString += ':';
    if (second < 10) {
      timeString += '0';
    }
    if (second == 0) {
      timeString += '0';
    }
    if (second) {
      timeString += second;
    }

    return timeString;
  }

}
