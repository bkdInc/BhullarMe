import { Component } from "@angular/core";
import SkillsDataComponent from '../../assets/data/skills.json';

// Define an interface for the data structure
interface SkillsData {
  id: number;
  name: string;
  value: number;
}

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
})
export class SkillsComponent {
  title: string;
  content: string;
  public items: SkillsData[] = SkillsDataComponent;

  constructor() {
    this.title = "Skills";
    this.content =
      "This is the About Us page where you can learn more about our mission and values.";
    console.log(this.items);
  }
}

