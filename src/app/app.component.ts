import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';   
import { NavebarComponent } from './Components/navebar/navebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-Commerce';
}
