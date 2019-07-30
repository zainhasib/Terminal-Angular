import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Terminal';
  active = 0;

  activeListener(e: any) {
    this.active = e;
    console.log(e);
  }

}
