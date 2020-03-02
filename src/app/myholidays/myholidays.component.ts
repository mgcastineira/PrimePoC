import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myholidays',
  templateUrl: './myholidays.component.html',
  styleUrls: ['./myholidays.component.scss']
})
export class MyholidaysComponent implements OnInit {
  newDataModel: boolean = true;
  peopleId: number = 918;
  year: number = new Date().getFullYear();

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
  datasource2: any[] = [
    { PeopleId: 918, StartDate: new Date(2020, 0, 3), EndDate: new Date(2020, 0, 6), Active: true },
    { PeopleId: 918, StartDate: new Date(2020, 0, 24), EndDate: new Date(2020, 1, 6), Active: true },
    { PeopleId: 918, StartDate: new Date(2020, 0, 24), EndDate: new Date(2020, 1, 6), Active: false },
    { PeopleId: 918, StartDate: new Date(2020, 2, 24), EndDate: new Date(2020, 2, 24), Active: true },
  ];

  januaryDate: Date = new Date(this.year, 0, 1);
  invalidDatesJanuary: Array<Date> = [];
  invalidDatesJanuaryAux: number[] = [];

  februaryDate: Date = new Date(this.year, 1, 1);
  invalidDatesFebruary: Array<Date> = [];
  invalidDatesFebruaryAux: number[] = [];

  marchDate: Date = new Date(this.year, 2, 1);
  invalidDatesMarch: Array<Date> = [];
  invalidDatesMarchAux: number[] = [];

  aprilDate: Date = new Date(this.year, 3, 1);
  invalidDatesApril: Array<Date> = [];
  invalidDatesAprilAux: number[] = [];

  mayDate: Date = new Date(this.year, 4, 1);
  invalidDatesMay: Array<Date> = [];
  invalidDatesMayAux: number[] = [];

  juneDate: Date = new Date(this.year, 5, 1);
  invalidDatesJune: Array<Date> = [];
  invalidDatesJuneAux: number[] = [];

  julyDate: Date = new Date(this.year, 6, 1);
  invalidDatesJuly: Array<Date> = [];
  invalidDatesJulyAux: number[] = [];

  augustDate: Date = new Date(this.year, 7, 1);
  invalidDatesAugust: Array<Date> = [];
  invalidDatesAugustAux: number[] = [];

  septemberDate: Date = new Date(this.year, 8, 1);
  invalidDatesSeptember: Array<Date> = [];
  invalidDatesSeptemberAux: number[] = [];

  octoberDate: Date = new Date(this.year, 9, 1);
  invalidDatesOctober: Array<Date> = [];
  invalidDatesOctoberAux: number[] = [];

  novemberDate: Date = new Date(this.year, 10, 1);
  invalidDatesNovember: Array<Date> = [];
  invalidDatesNovemberAux: number[] = [];

  decemberDate: Date = new Date(this.year, 11, 1);
  invalidDatesDecember: Array<Date> = [];
  invalidDatesDecemberAux: number[] = [];

  constructor() { }

  ngOnInit() {
    this.initializeDates();
    this.getInitialData();
  }

  private getInitialData() {
    if (!this.newDataModel) {
      let holidays = this.datasource.filter(r => r.PeopleId == this.peopleId && r.Active == true);
      holidays.forEach(record => {
        let d = record.Date as Date;
        switch (d.getMonth()) {
          case 0:
            this.invalidDatesJanuary.push(record.Date);
            this.invalidDatesJanuaryAux.push(record.Date.getDate());
            break;
          case 1:
            this.invalidDatesFebruary.push(record.Date);
            this.invalidDatesFebruaryAux.push(record.Date.getDate());
            break;
          case 2:
            this.invalidDatesMarch.push(record.Date);
            this.invalidDatesMarchAux.push(record.Date.getDate());
            break;
          case 3:
            this.invalidDatesApril.push(record.Date);
            this.invalidDatesAprilAux.push(record.Date.getDate());
            break;
          case 4:
            this.invalidDatesMay.push(record.Date);
            this.invalidDatesMayAux.push(record.Date.getDate());
            break;
          case 5:
            this.invalidDatesJune.push(record.Date);
            this.invalidDatesJuneAux.push(record.Date.getDate());
            break;
          case 6:
            this.invalidDatesJuly.push(record.Date);
            this.invalidDatesJulyAux.push(record.Date.getDate());
            break;
          case 7:
            this.invalidDatesAugust.push(record.Date);
            this.invalidDatesAugustAux.push(record.Date.getDate());
            break;
          case 8:
            this.invalidDatesSeptember.push(record.Date);
            this.invalidDatesSeptemberAux.push(record.Date.getDate());
            break;
          case 9:
            this.invalidDatesOctober.push(record.Date);
            this.invalidDatesOctoberAux.push(record.Date.getDate());
            break;
          case 10:
            this.invalidDatesNovember.push(record.Date);
            this.invalidDatesNovemberAux.push(record.Date.getDate());
            break;
          case 11:
            this.invalidDatesDecember.push(record.Date);
            this.invalidDatesDecemberAux.push(record.Date.getDate());
            break;
        }
      });
    } else {

      let holidays2 = this.datasource2.filter(r => r.PeopleId == this.peopleId && r.Active == true);
      holidays2.forEach(record => {
        let sDate = record.StartDate;
        let eDate = record.EndDate;
        let Difference_In_Time = eDate.getTime() - sDate.getTime();

        // To calculate the no. of days between two dates 
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        if (Difference_In_Days > 0) {
          for (let index = 1; index <= Difference_In_Days; index++) {
            let dateAux = sDate;
            dateAux = new Date(dateAux.setDate(sDate.getDate() + 1));
            this.processStartEndDate(dateAux);
          }
        }else{
          this.processStartEndDate(sDate);
        }


      });
    }
  }

  private processStartEndDate(dateAux: any) {
    switch (dateAux.getMonth()) {
      case 0:
        this.invalidDatesJanuaryAux.push(dateAux.getDate());
        break;
      case 1:
        this.invalidDatesFebruaryAux.push(dateAux.getDate());
        break;
      case 2:
        this.invalidDatesMarchAux.push(dateAux.getDate());
        break;
      case 3:
        this.invalidDatesAprilAux.push(dateAux.getDate());
        break;
      case 4:
        this.invalidDatesMayAux.push(dateAux.getDate());
        break;
      case 5:
        this.invalidDatesJuneAux.push(dateAux.getDate());
        break;
      case 6:
        this.invalidDatesJulyAux.push(dateAux.getDate());
        break;
      case 7:
        this.invalidDatesAugustAux.push(dateAux.getDate());
        break;
      case 8:
        this.invalidDatesSeptemberAux.push(dateAux.getDate());
        break;
      case 9:
        this.invalidDatesOctoberAux.push(dateAux.getDate());
        break;
      case 10:
        this.invalidDatesNovemberAux.push(dateAux.getDate());
        break;
      case 11:
        this.invalidDatesDecemberAux.push(dateAux.getDate());
        break;
    }
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
  }
  yearDown() {
    this.year = this.year - 1;
    this.setYear();
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

  // yearChanged(evento:any){

  // }
}
