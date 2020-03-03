export interface IHolidayDays{
    Day:number;
    Description:string;
}
export interface IHolidays {
    PeopleId:number;
    Title:string;
    TeamId:number;
    Year:number;
    Description:string;
    January: IHolidayDays[];
    February: IHolidayDays[];
    March: IHolidayDays[];
    April: IHolidayDays[];
    May: IHolidayDays[];
    June: IHolidayDays[];
    July: IHolidayDays[];
    August: IHolidayDays[];
    September: IHolidayDays[];
    October: IHolidayDays[];
    November: IHolidayDays[];
    December: IHolidayDays[];
}