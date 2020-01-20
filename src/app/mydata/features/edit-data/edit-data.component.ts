import { Component, OnInit, ViewChild } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserDataOperations } from '@root/mydata/models/user-data-operations';
import { Calendar } from 'primeng/calendar';

@Component({
  selector: 'app-edit-data.component',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss'],
  providers: [
    TitleCasePipe
  ]
})
export class EditDataComponent implements OnInit {
  @ViewChild('birthDateCalendar') birthCalendar: Calendar;
  userDataOperations = UserDataOperations;
  editForm: FormGroup;
  userData:any;
  type: UserDataOperations;

  bDate:Date=null;

  constructor(private fBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private titleCasePipe: TitleCasePipe) { }

  ngOnInit() {
    this.userData = this.config.data.userData;
    if (this.userData.BirthDate!=null)
      this.bDate=new Date(this.userData.BirthDate);
    this.type = this.config.data.type;

    this.initilizeControls();
  }

  private initilizeControls() {
    this.editForm = this.fBuilder.group({
      dni: new FormControl({ value: this.userData.DNI, disabled: false }, Validators.required),
      airbusSAPUser: new FormControl({ value: this.userData.AirbusSAPUser, disabled: false }),
      nEmployee: new FormControl({ value: this.userData.NEmployee, disabled: false }),
      NATO: new FormControl({ value: null, disabled: false }),
      enterpriseID: new FormControl({ value: this.userData.EnterpriseID, disabled: false }),
      nUserNG: new FormControl({ value: this.userData.NUserNG, disabled: false }),
      nSS: new FormControl({ value: this.userData.NSS, disabled: false }),
      
      birthDate: new FormControl({ value: null, disabled: false }),
      placeBirth: new FormControl({ value: this.userData.PlaceBirth, disabled: false }),
      nationality: new FormControl({ value: this.userData.Nationality, disabled: false }),

      mailAccenture: new FormControl({ value: this.userData.MailAccenture, disabled: false }, Validators.required),
      mailAirbus: new FormControl({ value: this.userData.AirbusMail, disabled: false }),
    });
  }

  setNullDate(evento: any, calendarId: string) {
    switch (calendarId) {
      case "birthDate":
        if (evento.currentTarget.value == "") {
          this.birthCalendar.value = null;
          this.birthCalendar.updateInputfield();
        }
        break;
      
    }

  }
}
