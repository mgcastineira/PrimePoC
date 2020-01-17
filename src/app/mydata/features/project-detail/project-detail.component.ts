import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Calendar } from 'primeng/calendar';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  @Input() projectData: any;
  @Input() tabId: number;

  @ViewChild('teamEndDate') endDateCalendar: Calendar;
  @ViewChild('teamStartDate') startDateCalendar: Calendar;

  editMode:boolean=false;

  constructor() { }

  ngOnInit() {
  }

  setNullDate(evento: any,calendarId:string) {
    switch(calendarId){
      case "teamStartDate":
        if (evento.currentTarget.value == "") {
          this.startDateCalendar.value = null;
          this.startDateCalendar.updateInputfield();
        }
        break;
      case "teamEndDate":
        if (evento.currentTarget.value == "") {
          this.endDateCalendar.value = null;
          this.endDateCalendar.updateInputfield();
        }
        break;
    }
    
  }
}
