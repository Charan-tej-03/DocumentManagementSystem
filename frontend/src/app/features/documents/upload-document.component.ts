import { Component } from '@angular/core';
import { DocumentService } from '../../core/services/document.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-document',
  imports: [
    CommonModule,
    FormsModule
  ],
  template: `
  <div class="container mt-4">
    <h2>Upload Document</h2>
    <form (ngSubmit)="upload()">
      <input class="form-control mb-2" [(ngModel)]="title" name="title" placeholder="Title">
      <input class="form-control mb-2" [(ngModel)]="description" name="description" placeholder="Description">
      <input class="form-control mb-2" type="file" (change)="onFileSelect($event)">
      <button class="btn btn-success">Upload</button>
    </form>
  </div>
  `
})
export class UploadDocumentComponent {

  title = '';
  description = '';
  selectedFile!: File;

  constructor(private docService: DocumentService) {}

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('file', this.selectedFile);

    this.docService.uploadDocument(formData)
      .subscribe(() => alert("Uploaded successfully"));
  }
}
