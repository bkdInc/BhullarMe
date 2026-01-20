import { Component } from "@angular/core";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
})
export class SkillsComponent {
  title: string;
  content: string;

  constructor() {
    this.title = "Skills";
    this.content =
      "This is the About Us page where you can learn more about our mission and values.";
  }
}
