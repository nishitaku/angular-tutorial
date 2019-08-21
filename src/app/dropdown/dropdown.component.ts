import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  days = ['日', '月', '火', '水', '木', '金', '土'];
  startDay: string;
  endDay: string;

  constructor() {}

  ngOnInit() {
    this.startDay = this.days[0];
    this.endDay = this.days[this.days.length - 1];
  }
}

@Pipe({ name: 'dayFilter' })
export class DayFilterPipe implements PipeTransform {
  transform(days: string[], startDay?: string, endDay?: string) {
    if (startDay) {
      const index = days.findIndex(day => day === startDay);
      return days.slice(index);
    }
    if (endDay) {
      const index = days.findIndex(day => day === endDay);
      return days.slice(0, index + 1);
    }
    return days;
  }
}
