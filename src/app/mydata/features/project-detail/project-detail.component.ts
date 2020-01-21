import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { TitleCasePipe, DatePipe } from '@angular/common';
import { DialogService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  providers: [
    DialogService,
    ConfirmationService,
    DatePipe,
    TitleCasePipe
  ]
})
export class ProjectDetailComponent implements OnInit {
  @Input() projectData: any;
  @Input() tabId: number;
  @Input() componentId: number;

  @ViewChild('teamEndDate') endDateCalendar: Calendar;
  @ViewChild('teamStartDate') startDateCalendar: Calendar;


  editMode:boolean=false;

  constructor(private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private titleCasePipe:TitleCasePipe) { }

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

  removeUserFromTeam(){
    this.confirmationService.confirm({
      message: "Remove this user from this team?",
      key: "cdd",
      header: 'Remove Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        // call service to remove user from this team

      },
      reject: () => {

      }
    });
  }
}
