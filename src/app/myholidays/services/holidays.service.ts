import { Injectable } from '@angular/core';
import { IHolidays } from '../models/holidays.model';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  constructor() { }

  public calculateHolidays(holidaysInYear: any[], peopleId: number, year?: number): IHolidays {
    let holidaysInYearClone: any[] = [];
    if (year) {
      holidaysInYearClone = JSON.parse(JSON.stringify(
        holidaysInYear.filter(f => f.StartDate.getFullYear() == year)
      ));
    } else {
      holidaysInYearClone = JSON.parse(JSON.stringify(holidaysInYear));
    }
    holidaysInYearClone.forEach(element => {
      element.StartDate = new Date(element.StartDate);
      element.EndDate = new Date(element.EndDate);
    });
    let result: IHolidays = {} as IHolidays;
    result.PeopleId = peopleId;
    result.January = [];
    result.February = [];
    result.March = [];
    result.April = [];
    result.May = [];
    result.June = [];
    result.July = [];
    result.August = [];
    result.September = [];
    result.October = [];
    result.November = [];
    result.December = [];


    holidaysInYearClone.forEach(record => {
      result.Year = record.StartDate.getFullYear();
      let sDate = record.StartDate;
      let eDate = record.EndDate;
      let difference_In_Time = eDate.getTime() - sDate.getTime();

      // dias de diferencia
      let difference_In_Days = difference_In_Time / (1000 * 3600 * 24);

      // Si la fechas están dentro del mismo año
      // if (sDate.getFullYear() == eDate.getFullYear()) {
      if (difference_In_Days > 0) {
        /* #region  date start */
        let dateStartAux = sDate;
        dateStartAux = new Date(dateStartAux.setDate(sDate.getDate()));
        this.processStartEndDate(dateStartAux, result, record.Description);
        /* #endregion */
        for (let index = 1; index <= difference_In_Days; index++) {
          let dateAux = sDate;
          dateAux = new Date(dateAux.setDate(sDate.getDate() + 1));
          this.processStartEndDate(dateAux, result, record.Description);
        }
      } else {
        this.processStartEndDate(sDate, result, record.Description);
      }
    });

    return result;
  }

  public prepareHolidaysData(holidaysData: any[]): any[] {
    let result: any[] = [];

    let holidaysDataClone = JSON.parse(JSON.stringify(holidaysData));
    holidaysDataClone.forEach(element => {
      element.StartDate = new Date(element.StartDate);
      element.EndDate = new Date(element.EndDate);
    });
    holidaysDataClone.forEach(record => {
      if (record.StartDate.getFullYear() == record.EndDate.getFullYear()) {
        result.push(record);
      } else {
        let record1 = {
          PeopleId: record.PeopleId,
          Active: record.Active,
          Description: record.Description,
          StartDate: record.StartDate,
          EndDate: new Date(record.StartDate.getFullYear(), 11, 31)
        };
        let record2 = {
          PeopleId: record.PeopleId,
          Active: record.Active,
          Description: record.Description,
          StartDate: new Date(record.EndDate.getFullYear(), 0, 1),
          EndDate: record.EndDate
        };
        result.push(record1);
        result.push(record2);
      }


    });

    return result;
  }

  private processStartEndDate(dateAux: any, holidays: IHolidays, description: string): any {
    switch (dateAux.getMonth()) {
      case 0:
        holidays.January.push({ Day: dateAux.getDate(), Description: description });
        break;
      case 1:
        holidays.February.push({ Day: dateAux.getDate(), Description: description });
        break;
      case 2:
        holidays.March.push({ Day: dateAux.getDate(), Description: description });
        break;
      case 3:
        holidays.April.push({ Day: dateAux.getDate(), Description: description });
        break;
      case 4:
        holidays.May.push({ Day: dateAux.getDate(), Description: description });
        break;
      case 5:
        holidays.June.push({ Day: dateAux.getDate(), Description: description });
        break;
      case 6:
        holidays.July.push({ Day: dateAux.getDate(), Description: description });
        break;
      case 7:
        holidays.August.push({ Day: dateAux.getDate(), Description: description });
        break;
      case 8:
        holidays.September.push({ Day: dateAux.getDate(), Description: description });
        break;
      case 9:
        holidays.October.push({ Day: dateAux.getDate(), Description: description });
        break;
      case 10:
        holidays.November.push({ Day: dateAux.getDate(), Description: description });
        break;
      case 11:
        holidays.December.push({ Day: dateAux.getDate(), Description: description });
        break;
    }

    return holidays;
  }
}
