import { Component, OnInit } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent {
  filesToUpload:any[]=[];
  uploadedFiles: any[] = [];
  draggedFiles:any=null;
  progress:number=0;
  filesProcessed:number=0;

  constructor() { }
  
  myUploader(event) {
    this.filesToUpload = this.filesToUpload.concat(event.files);
    for (let file of event.files) {
      // call upload method
      this.uploadedFiles.push(file);
      this.progress = (this.uploadedFiles.length * 100) / this.filesToUpload.length;
    }
  }
}
