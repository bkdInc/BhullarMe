import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { environment } from '../../environments/environment';

@Component ({ 
    selector: "app-header",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./header.component.html",
    // styleUrl: "./header.component.css",
})
export class HeaderComponent {
   cvUrl = environment.cvUrl;
}
