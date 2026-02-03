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
  
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    newsletter: [false],
  });

  constructor(private emailService: EmailService) {}

  onSubmit() {
    if (this.form.valid) {
      this.submitted = true;
      this.emailService.sendEmail(this.form.value).subscribe({
        next: (response) => {
          alert('Email sent successfully!');
          this.form.reset();
        },
        error: (error) => {
          alert('Failed to send email. Please try again.');
          console.error(error);
        }
      });
    }
  }
}