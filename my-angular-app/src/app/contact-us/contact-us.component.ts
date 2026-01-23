import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
 
}
)
export class ContactUsComponent {
  constructor() {}

  submitForm(formData: any) {
    // Logic to handle form submission
    console.log('Form submitted:', formData);
  }
}