import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-holidays',
  templateUrl: './team-holidays.component.html',
  styleUrls: ['./team-holidays.component.scss']
})
export class TeamHolidaysComponent implements OnInit {
  month: number = new Date().getMonth();
  year: number = new Date().getFullYear();
  sMonth: string = new Date().toLocaleString('default', { month: 'long' });
  daysOfMonth:any[]=[];
  datasource: any[] = [
    { PeopleId: 918, Date: new Date(2020, 0, 3), Active: true },
    { PeopleId: 918, Date: new Date(2020, 0, 4), Active: true },
    { PeopleId: 918, Date: new Date(2020, 0, 5), Active: true },
    { PeopleId: 918, Date: new Date(2020, 0, 6), Active: true },
    { PeopleId: 918, Date: new Date(2020, 0, 7), Active: false },
    { PeopleId: 918, Date: new Date(2020, 0, 21), Active: true },
    { PeopleId: 918, Date: new Date(2020, 0, 22), Active: true },
    { PeopleId: 918, Date: new Date(2020, 0, 23), Active: true },
    { PeopleId: 919, Date: new Date(2020, 0, 21), Active: true },
    { PeopleId: 918, Date: new Date(2020, 0, 3), Active: true },
    { PeopleId: 918, Date: new Date(2020, 1, 25), Active: true },
    { PeopleId: 918, Date: new Date(2020, 1, 24), Active: true },
    { PeopleId: 918, Date: new Date(2020, 2, 11), Active: true },
    { PeopleId: 918, Date: new Date(2020, 2, 5), Active: false },
  ];
  constructor() { }

  ngOnInit() {
    let daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate();
    for (let index = 0; index < daysInMonth; index++) {
      this.daysOfMonth.push(index+1);
      
    }
  }

  yearUp() {
    this.month = this.month + 1;
    if(this.month==11){
      this.year = this.year+1;
      this.month=0;
    }
    this.sMonth = new Date(this.year, this.month, 1).toLocaleString('default', { month: 'long' });
  }
  yearDown() {
    this.month = this.month - 1;
    if (this.month ==-1 ) {
      this.year = this.year - 1;
      this.month=11;
    }
    this.sMonth = new Date(this.year, this.month, 1).toLocaleString('default', { month: 'long' });
  }

}
