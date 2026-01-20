import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  template: `
    <div class="container">
      <h1>Contact Us</h1>
      <form (ngSubmit)="submitForm(contactForm.value)" #contactForm="">
        <div>
          <label>Name:</label>
          <input type="text" name="name" ngModel required>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" ngModel required>
        </div>
        <div>
          <label>Message:</label>
          <textarea name="message" ngModel required></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    form {
      max-width: 500px;
    }
    div {
      margin: 10px 0;
    }
    input, textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }
    button {
      padding: 10px 20px;
      background-color: #333;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class ContactUsComponent {
  constructor() {}

  submitForm(formData: any) {
    // Logic to handle form submission
    console.log('Form submitted:', formData);
  }
}