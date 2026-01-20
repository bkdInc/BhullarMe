import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";
import { AboutComponent } from "../about/about.component";
import { BioComponent } from "../bio/bio.comopnent";
import { SkillsComponent } from '../skills/skills.component';
import { ExperienceComponent } from '../experience/experience.component'; 
import { ContactUsComponent } from '../contact-us/contact-us.component';    



@Component({
  selector: "app-main-page",
  standalone: true,
  imports: [CommonModule, HeaderComponent, AboutComponent, BioComponent,SkillsComponent,ExperienceComponent, FooterComponent],
  templateUrl: "./main-page.html",
  //styleUrl: "./main-page.component.css", 

})
export class MainPageComponent {}