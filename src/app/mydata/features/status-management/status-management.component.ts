import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-status-management',
  templateUrl: './status-management.component.html',
  styleUrls: ['./status-management.component.scss']
})
export class StatusManagementComponent implements OnInit {
  userData:any;

  constructor(private fBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) { }

  ngOnInit() {
    this.userData = this.config.data.userData;
  }

  closeStatus(returnValue: any) {
    this.ref.close(returnValue);
  }

  applyChanges() {
    
  }

}
