import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
console.log(environment.cvUrl);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  //styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-app';
}
