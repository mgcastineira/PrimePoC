import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myholidays',
  templateUrl: './myholidays.component.html',
  styleUrls: ['./myholidays.component.scss']
})
export class MyholidaysComponent implements OnInit {
  year:number= new Date().getFullYear();

  januaryDate:Date = new Date(this.year,0,1);
  invalidDatesJanuary:Array<Date>;
  invalidDatesJanuaryAux: number[]=[3,4,5,6];

  februaryDate: Date = new Date(this.year, 1, 1);
  invalidDatesFebruary: Array<Date>;
  invalidDatesFebruaryAux: number[] = [3, 4, 5, 6,12,13,14,15];

  marchDate: Date = new Date(this.year, 2, 1);
  invalidDatesMarch: Array<Date>;
  invalidDatesMarchAux: number[] = [3, 4, 5, 6];

  aprilDate: Date = new Date(this.year, 3, 1);
  invalidDatesApril: Array<Date>;
  invalidDatesAprilAux: number[] = [3, 4, 5, 6];

  mayDate: Date = new Date(this.year, 4, 1);
  invalidDatesMay: Array<Date>;
  invalidDatesMayAux: number[] = [3, 4, 5, 6];

  juneDate: Date = new Date(this.year, 5, 1);
  invalidDatesJune: Array<Date>;
  invalidDatesJuneAux: number[] = [3, 4, 5, 6];

  julyDate: Date = new Date(this.year, 6, 1);
  invalidDatesJuly: Array<Date>;
  invalidDatesJulyAux: number[] = [3, 4, 5, 6];

  augustDate: Date = new Date(this.year, 7, 1);
  invalidDatesAugust: Array<Date>;
  invalidDatesAugustAux: number[] = [3, 4, 5, 6];

  septemberDate: Date = new Date(this.year, 8, 1);
  invalidDatesSeptember: Array<Date>;
  invalidDatesSeptemberAux: number[] = [3, 4, 5, 6];

  octoberDate: Date = new Date(this.year, 9, 1);
  invalidDatesOctober: Array<Date>;
  invalidDatesOctoberAux: number[] = [3, 4, 5, 6];

  novemberDate: Date = new Date(this.year, 10, 1);
  invalidDatesNovember: Array<Date>;
  invalidDatesNovemberAux: number[] = [3, 4, 5, 6];

  decemberDate: Date = new Date(this.year, 11, 1);
  invalidDatesDecember: Array<Date>;
  invalidDatesDecemberAux: number[] = [3, 4, 5, 6];

  constructor() { }

  ngOnInit() {
    this.invalidDatesJanuary = [new Date(2020, 3, 3), 
      new Date(2020, 3, 4),
      new Date(2020, 3, 5),
      new Date(2020, 3, 6)]
  }


}
