import { Component, OnInit } from '@angular/core';
import { FileFilters } from '../models/file-filters.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  uploadedFiles: any[] = [];
  allowedFileTypes:FileFilters[]=[FileFilters.xlsx];

  constructor() { }

  ngOnInit() {
  }
  sendFilesToComponent(evt: File[]): void {
    this.uploadedFiles = evt;
  }
}
