import { Component, OnInit } from '@angular/core';
import { HolidaysService } from '../services/holidays.service';
import { IHolidays } from '../models/holidays.model';

@Component({
  selector: 'app-myholidays',
  templateUrl: './myholidays.component.html',
  styleUrls: ['./myholidays.component.scss']
})
export class MyholidaysComponent implements OnInit {
  newDataModel: boolean = true;
  peopleId: number = 918;
  year: number = new Date().getFullYear();

  holidaysData: any[] = [
    { PeopleId: 918, StartDate: new Date(2020, 0, 3), EndDate: new Date(2020, 0, 6), Active: true,Description:"a" },
    { PeopleId: 918, StartDate: new Date(2020, 0, 24), EndDate: new Date(2020, 1, 6), Active: true, Description: "b" },
    { PeopleId: 918, StartDate: new Date(2020, 0, 24), EndDate: new Date(2020, 1, 6), Active: false, Description: "c" },
    { PeopleId: 918, StartDate: new Date(2020, 2, 24), EndDate: new Date(2020, 2, 24), Active: true, Description: "d" },
    { PeopleId: 918, StartDate: new Date(2020, 11, 24), EndDate: new Date(2021, 0, 6), Active: true, Description: "e" },
  ];

  processedHolidaysData:any[]=[];

  myHolidays:IHolidays;

  januaryDate: Date = new Date(this.year, 0, 1);
  februaryDate: Date = new Date(this.year, 1, 1);
  marchDate: Date = new Date(this.year, 2, 1);
  aprilDate: Date = new Date(this.year, 3, 1);
  mayDate: Date = new Date(this.year, 4, 1);
  juneDate: Date = new Date(this.year, 5, 1);
  julyDate: Date = new Date(this.year, 6, 1);
  augustDate: Date = new Date(this.year, 7, 1);
  septemberDate: Date = new Date(this.year, 8, 1);
  octoberDate: Date = new Date(this.year, 9, 1);
  novemberDate: Date = new Date(this.year, 10, 1);
  decemberDate: Date = new Date(this.year, 11, 1);

  constructor(private holidaysService: HolidaysService) { }

  ngOnInit() {
    this.initializeDates();
    this.processedHolidaysData = this.holidaysService.prepareHolidaysData(this.holidaysData);
    this.getHolidaysInYear();
  }

  
  private getHolidaysInYear() {
    let holidaysList = this.processedHolidaysData.filter(r => r.PeopleId == this.peopleId && 
      r.StartDate.getFullYear()==this.year && r.Active == true);
    this.myHolidays = this.holidaysService.calculateHolidays(holidaysList, this.peopleId);
  }

  private initializeDates() {
    this.februaryDate = new Date(this.februaryDate.setMonth(this.januaryDate.getMonth() + 1));
    this.marchDate = new Date(this.marchDate.setMonth(this.februaryDate.getMonth() + 1));
    this.aprilDate = new Date(this.aprilDate.setMonth(this.marchDate.getMonth() + 1));
    this.mayDate = new Date(this.mayDate.setMonth(this.aprilDate.getMonth() + 1));
    this.juneDate = new Date(this.juneDate.setMonth(this.mayDate.getMonth() + 1));
    this.julyDate = new Date(this.julyDate.setMonth(this.juneDate.getMonth() + 1));
    this.augustDate = new Date(this.augustDate.setMonth(this.julyDate.getMonth() + 1));
    this.septemberDate = new Date(this.septemberDate.setMonth(this.augustDate.getMonth() + 1));
    this.octoberDate = new Date(this.octoberDate.setMonth(this.septemberDate.getMonth() + 1));
    this.novemberDate = new Date(this.novemberDate.setMonth(this.octoberDate.getMonth() + 1));
    this.decemberDate = new Date(this.decemberDate.setMonth(this.novemberDate.getMonth() + 1));
  }

  yearUp() {
    this.year = this.year + 1;
    this.setYear();
    this.getHolidaysInYear();
  }
  yearDown() {
    this.year = this.year - 1;
    this.setYear();
    this.getHolidaysInYear();
  }

  private setYear() {
    this.januaryDate = new Date(this.januaryDate.setFullYear(this.year));
    this.februaryDate = new Date(this.februaryDate.setFullYear(this.year));
    this.marchDate = new Date(this.marchDate.setFullYear(this.year));
    this.aprilDate = new Date(this.aprilDate.setFullYear(this.year));
    this.mayDate = new Date(this.mayDate.setFullYear(this.year));
    this.juneDate = new Date(this.juneDate.setFullYear(this.year));
    this.julyDate = new Date(this.julyDate.setFullYear(this.year));
    this.augustDate = new Date(this.augustDate.setFullYear(this.year));
    this.septemberDate = new Date(this.septemberDate.setFullYear(this.year));
    this.octoberDate = new Date(this.octoberDate.setFullYear(this.year));
    this.novemberDate = new Date(this.novemberDate.setFullYear(this.year));
    this.decemberDate = new Date(this.decemberDate.setFullYear(this.year));
  }

  checkDay(day:number,sMonth:string):boolean{
    let daysList = this.myHolidays[sMonth];//.indexOf(date.day) > -1
    return daysList.find(d=>d.Day==day)!=undefined;//daysList.indexOf(day) > -1;
  }

  getDescription(day: number, sMonth: string): string {
    let daysList = this.myHolidays[sMonth];//.indexOf(date.day) > -1
    let obj= daysList.find(d => d.Day == day);//daysList.indexOf(day) > -1;
    if(obj!=undefined)
      return obj.Description;
    else
      return "";
  }
}
