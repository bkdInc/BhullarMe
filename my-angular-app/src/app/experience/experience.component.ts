import { Component } from "@angular/core";

@Component({
  selector: "app-experience",
  templateUrl: "./experience.component.html",
})
export class ExperienceComponent {
  title: string;
  content: string;

  constructor() {
    this.title = "Experience";
    this.content =
      "This is the About Us page where you can learn more about our mission and values.";
  }
}
