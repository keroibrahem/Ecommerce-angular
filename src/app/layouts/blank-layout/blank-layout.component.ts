import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavebarComponent } from '../../Components/navebar/navebar.component';
import { FooterComponent } from '../../Components/footer/footer.component';

@Component({
  selector: 'app-blank-layout',
  imports: [RouterOutlet,NavebarComponent,FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss']
})
export class BlankLayoutComponent {
  showScrollTop = false;

ngOnInit() {
  window.addEventListener('scroll', this.onScroll, true);
}

onScroll = () => {
  this.showScrollTop = window.scrollY > 200;
}

scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
}
