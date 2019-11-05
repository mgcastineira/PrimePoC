import { Component, OnInit } from '@angular/core';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig
  ) { }

  ngOnInit() {
    let data = this.config.data;
  }

  closeImport(returnValue: any) {
    this.ref.close(returnValue);
  }
}
