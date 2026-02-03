import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';  // Remove .production

@Injectable({
  providedIn: 'root'
})
export class EmailService 
{
  private apiUrl = environment.EMAIL_API_URL;

  constructor(private http: HttpClient) {}

  sendEmail(formData: any): Observable<any> 
  {
    console.log('Sending email to:', this.apiUrl);  // Debug log
    return this.http.post(this.apiUrl, formData).pipe(
      timeout(60000) // 60 second timeout
    );
  }
}