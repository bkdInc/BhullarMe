import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-contact-us',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact-us.component.html',
  styles: [`
    form { display: grid; gap: 10px; max-width: 360px; margin-bottom: 60px; }
    label { display: grid; gap: 6px; }
    small { color: crimson; }
  `],
})
export class ContactUsComponent {
  fb = new FormBuilder();
  submitted = false;
  isLoading = false;
  
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    newsletter: [false],
  });

  constructor(private emailService: EmailService) {}

  onSubmit() {
    console.log('Form submitted, valid:', this.form.valid);
    console.log('Form value:', this.form.value);
    
    if (this.form.valid) {
      this.submitted = true;
      this.isLoading = true;
      console.log('Calling email service...');
      
      this.emailService.sendEmail(this.form.value).subscribe({
        next: (response) => {
          console.log('Success response:', response);
          this.isLoading = false;
          alert('Email sent successfully! ✅');
          this.form.reset();
          this.submitted = false;
        },
        error: (error) => {
          console.error('Error response:', error);
          this.isLoading = false;
          alert('Failed to send email. Please try again. ❌');
          this.submitted = false;
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}