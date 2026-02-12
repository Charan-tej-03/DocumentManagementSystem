import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DocumentService } from '../../core/services/document.service';

@Component({
  selector: 'app-update-document',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4" style="max-width: 600px;">
      <h2>Upload New Version</h2>

      <input type="file"
             class="form-control mb-3"
             (change)="onFileSelect($event)">

      <button class="btn btn-primary w-100"
              (click)="update()">
        Upload New Version
      </button>
    </div>
  `
})
export class UpdateDocumentComponent {

  documentId!: string;
  selectedFile!: File;

  constructor(
    private route: ActivatedRoute,
    private docService: DocumentService,
    private router: Router
  ) {
    this.documentId = this.route.snapshot.paramMap.get('id')!;
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  update() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.docService.updateDocument(this.documentId, formData)
      .subscribe({
        next: () => {
          alert("Document updated successfully!");
          this.router.navigate(['/documents']);
        },
        error: (err) => {
          alert(err.error?.message || "Update failed");
        }
      });
  }
}
