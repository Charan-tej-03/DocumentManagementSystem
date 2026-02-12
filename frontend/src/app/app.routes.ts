import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { DocumentListComponent } from './features/documents/document-list.component';
import { UploadDocumentComponent } from './features/documents/upload-document.component';
import { RegisterComponent } from './features/auth/register.component';
import { UpdateDocumentComponent } from './features/documents/update-document.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'documents', component: DocumentListComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadDocumentComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: UpdateDocumentComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
