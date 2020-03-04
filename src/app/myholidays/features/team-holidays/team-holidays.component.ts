import { Component, OnInit } from '@angular/core';
import { IHolidays } from '@root/myholidays/models/holidays.model';
import { HolidaysService } from '@root/myholidays/services/holidays.service';

@Component({
  selector: 'app-team-holidays',
  templateUrl: './team-holidays.component.html',
  styleUrls: ['./team-holidays.component.scss']
})
export class TeamHolidaysComponent implements OnInit {
  month: number = new Date().getMonth();
  year: number = new Date().getFullYear();
  sMonth: string = new Date(this.year,this.month,1).toLocaleString('default', { month: 'long' });
  daysOfMonth:any[]=[];

  peopleList:any[]=[{Title:"Marcos",PeopleId:918},
    { Title: "Alberto", PeopleId: 464 }];

  holidaysData: any[] = [
    { PeopleId: 918, StartDate: new Date(2020, 0, 3), EndDate: new Date(2020, 0, 6), Active: true, Description: "a" },
    { PeopleId: 918, StartDate: new Date(2020, 0, 24), EndDate: new Date(2020, 1, 6), Active: true, Description: "b" },
    { PeopleId: 918, StartDate: new Date(2020, 0, 24), EndDate: new Date(2020, 1, 6), Active: false, Description: "c" },
    { PeopleId: 464, StartDate: new Date(2020, 0, 21), EndDate: new Date(2020, 1, 22), Active: true, Description: "d" },
    { PeopleId: 918, StartDate: new Date(2020, 2, 24), EndDate: new Date(2020, 2, 24), Active: true, Description: "e" },
    { PeopleId: 918, StartDate: new Date(2020, 11, 24), EndDate: new Date(2021, 0, 6), Active: true, Description: "f" },
  ];

  processedHolidaysData: any[] = [];

  allHolidays:Array<IHolidays>=[];

  datasource:any[]=[];

  constructor(private holidaysService:HolidaysService) { }

  ngOnInit() {
    let daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate();
    for (let index = 0; index < daysInMonth; index++) {
      this.daysOfMonth.push(index+1);
    }

    this.processedHolidaysData = this.holidaysService.prepareHolidaysData(this.holidaysData);

    this.getInitialData();
  }

  getInitialData(){
    this.allHolidays=[];
    this.peopleList.forEach(person => {
      let holidaysList=this.processedHolidaysData.filter(record=>record.PeopleId==person.PeopleId &&
        record.Active==true);
      let aux=this.holidaysService.calculateHolidays(holidaysList,person.PeopleId,this.year);
      this.allHolidays.push(aux);
    });

    this.getDataForCurrentMonth();
    
  }

  getDataForCurrentMonth() {
    this.datasource=[];
    this.allHolidays.forEach(element => {
      if(element.Year == this.year){
        if (element.hasOwnProperty(this.sMonth)) {
          this.datasource.push({
            PeopleId: element.PeopleId,
            Title: element.Title,
            Holidays: element[this.sMonth]
          });
        }
      }
      
    });

  }

  yearUp() {
    this.month = this.month + 1;
    if(this.month==12){
      this.year = this.year+1;
      this.month=0;
    }
    this.sMonth = new Date(this.year, this.month, 1).toLocaleString('default', { month: 'long' });
    this.getInitialData();
  }

  yearDown() {
    this.month = this.month - 1;
    if (this.month ==-1 ) {
      this.year = this.year - 1;
      this.month=11;
    }
    this.sMonth = new Date(this.year, this.month, 1).toLocaleString('default', { month: 'long' });
    this.getInitialData();
  }

  checkDay(day: number, sMonth: string,peopleId:number): boolean {
    let holidayObj = this.allHolidays.find(myh=>myh.PeopleId==peopleId);
    if(holidayObj!=undefined){
      let daysList = holidayObj[sMonth];
      return daysList.find(d => d.Day == day) != undefined;
    }else{
      return false;
    }
    
  }

  getDescription(day: number, sMonth: string, peopleId: number): string {
    let holidayObj = this.allHolidays.find(myh => myh.PeopleId == peopleId);
    if (holidayObj != undefined) {
      let daysList = holidayObj[sMonth];//.indexOf(date.day) > -1
    let obj = daysList.find(d => d.Day == day);//daysList.indexOf(day) > -1;
    if (obj != undefined)
      return obj.Description;
    else
      return "";
    }else{
      return "";
    }
  }
}
