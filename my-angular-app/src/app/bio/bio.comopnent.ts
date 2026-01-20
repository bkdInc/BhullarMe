import { Component } from "@angular/core";

@Component({
  selector: "app-bio",
  templateUrl: "./bio.component.html",
})
export class BioComponent {
  title: string;
  content: string;

  constructor() {
    this.title = "Bio";
    this.content =
      "This is the Bio page where you can learn more about my background and experience.";
  }
}
