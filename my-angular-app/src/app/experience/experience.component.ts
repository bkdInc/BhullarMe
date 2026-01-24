import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import ExperienceDataComponent from '../../assets/data/experience.json';

// Define an interface for the data structure
interface ExperienceData {
  id: number;
  dateFrom: string;
  dateTo: string;
  position: string;
  company: string;
  location: string;
  description: string;
}


@Component({
  selector: "app-experience",
  templateUrl: "./experience.component.html",
})

export class ExperienceComponent {
  title: string;
  content: string;
   public items: ExperienceData[] = ExperienceDataComponent;

  constructor() {
    this.title = "Experience";
    this.content =
      "This is the About Us page where you can learn more about our mission and values.";
      console.log(this.items);
  }
}
