import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})

export class AboutComponent {
  title: string;
  content: string;

  constructor() {
    this.title = 'About Us';
    this.content = 'This is the About Us page where you can learn more about our mission and values.';
  }
}