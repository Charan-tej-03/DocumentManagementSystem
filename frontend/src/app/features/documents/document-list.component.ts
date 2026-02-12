import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../core/services/document.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-document-list',
  imports: [
    CommonModule,
    FormsModule
  ],
  template: `
  <div class="container mt-4">
    <h2>Documents</h2>

    <input class="form-control mb-3" placeholder="Search..."
      (input)="search($event)">

    <table class="table table-bordered">
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Version</th>
        <th>Uploaded By</th>
        <th>File</th>
      </tr>
      <tr *ngFor="let doc of documents">
        <td>{{doc.title}}</td>
        <td>{{doc.description}}</td>
        <td>{{doc.version}}</td>
        <td>{{doc.uploadedBy?.name}}</td>
        <td>
          <a [href]="'http://localhost:3000/' + doc.filePath" target="_blank">
            Download
          </a>
        </td>
      </tr>
    </table>
  </div>
  `
})
export class DocumentListComponent implements OnInit {

  documents: any[] = [];

  constructor(private docService: DocumentService) {}

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
}
