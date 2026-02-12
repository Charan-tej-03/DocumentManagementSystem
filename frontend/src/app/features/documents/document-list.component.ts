import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../core/services/document.service';
import { AuthService } from '../../core/services/auth.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  template: `
  <div class="container mt-4">

    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Documents</h2>

      <!-- Upload Button -->
      <button
        *ngIf="canEdit()"
        class="btn btn-success"
        (click)="toggleUploadForm()">
        + Upload New Document
      </button>
    </div>

    <!-- Upload Form -->
    <div *ngIf="showUploadForm" class="card p-3 mb-4 shadow-sm">

      <h5>Upload New Document</h5>

      <input class="form-control mb-2"
             [(ngModel)]="newTitle"
             name="title"
             placeholder="Title">

      <input class="form-control mb-2"
             [(ngModel)]="newDescription"
             name="description"
             placeholder="Description">

      <input type="file"
             class="form-control mb-3"
             (change)="onFileSelect($event)">

      <div class="d-flex gap-2">
        <button class="btn btn-primary"
                (click)="uploadDocument()">
          Upload
        </button>

        <button class="btn btn-secondary"
                (click)="toggleUploadForm()">
          Cancel
        </button>
      </div>

    </div>

    <!-- Search -->
    <input class="form-control mb-3"
           placeholder="Search..."
           (input)="search($event)">

    <!-- Documents Table -->
    <table class="table table-bordered">
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Version</th>
        <th>Uploaded By</th>
        <th>File</th>
        <th>Actions</th>
      </tr>

      <tr *ngFor="let doc of documents">
        <td>{{doc.title}}</td>
        <td>{{doc.description}}</td>
        <td>{{doc.version}}</td>
        <td>{{doc.uploadedBy?.name}}</td>
        <td>
          <a [href]="'http://localhost:3000/' + doc.filePath"
             target="_blank">
            Download
          </a>
        </td>

        <td>
          <button
            *ngIf="canEdit()"
            class="btn btn-warning btn-sm"
            [routerLink]="['/update', doc._id]">
            Update
          </button>
        </td>
      </tr>
    </table>

  </div>
  `
})
export class DocumentListComponent implements OnInit {

  documents: any[] = [];

  // Upload form fields
  showUploadForm = false;
  newTitle = '';
  newDescription = '';
  selectedFile!: File;

  constructor(
    private docService: DocumentService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loadDocuments();
  }

  loadDocuments(search?: string) {
    this.docService.getDocuments(search)
      .subscribe((res: any) => this.documents = res);
  }

  search(event: any) {
    this.loadDocuments(event.target.value);
  }

  toggleUploadForm() {
    this.showUploadForm = !this.showUploadForm;
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadDocument() {

    if (!this.newTitle || !this.selectedFile) {
      alert("Title and file are required");
      return;
    }

    const formData = new FormData();
    formData.append('title', this.newTitle);
    formData.append('description', this.newDescription);
    formData.append('file', this.selectedFile);

    this.docService.uploadDocument(formData)
      .subscribe({
        next: () => {
          alert("Document uploaded successfully!");
          this.showUploadForm = false;
          this.newTitle = '';
          this.newDescription = '';
          this.loadDocuments();
        },
        error: (err) => {
          alert(err.error?.message || "Upload failed");
        }
      });
  }

  canEdit(): boolean {
    const role = this.auth.getRole();
    return role === 'admin' || role === 'editor';
  }
}
