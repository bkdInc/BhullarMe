import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';  

@Component({
  selector: 'app-contact-us',
   imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styles: [`
    form { display: grid; gap: 10px; max-width: 360px; margin-bottom: 60px; }
    label { display: grid; gap: 6px; }
    small { color: crimson; }
  `],
}
)
export class ContactUsComponent {
  
  fb = new FormBuilder();
  submitted=false;
  form = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    email: ['',[Validators.required, Validators.email]],
    message: ['',[Validators.required, Validators.minLength(10)]],
    newsletter: [false],
  });
  onSubmit(){
    this.submitted=true;}

    constructor() {}
     }