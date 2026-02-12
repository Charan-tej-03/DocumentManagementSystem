import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DocumentService {

  private API = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getDocuments(search?: string) {
    return this.http.get(`${this.API}?search=${search || ''}`);
  }

  uploadDocument(formData: FormData) {
    return this.http.post(`${this.API}/documents`, formData);
  }

  updateDocument(id: string, formData: FormData) {
    return this.http.put(`${this.API}/documents/${id}`, formData);
  }
}
