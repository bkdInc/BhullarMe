import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './header/header.component';  
import { FooterComponent } from "./footer/footer.component";  
import { AboutComponent } from "./about/about.component";
import { BioComponent } from "./bio/bio.comopnent";
import { SkillsComponent } from './skills/skills.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


export const routes: Routes = [
  { path: "", component: MainPageComponent },
  { path: "about", component: AboutComponent },
  { path: "bio", component: BioComponent },
  { path: "skills", component: SkillsComponent },
  { path: "contact-us", component: ContactUsComponent },
];