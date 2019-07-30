import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  settingsOpen = false;
  themes = {
    'black': 0,
    'dark': 1,
    'light': 2,
    'white': 3
  }
  active = 0;
  @Output() emitActive = new EventEmitter<Number>();
  @ViewChild('terminals', {static: true}) terminals: ElementRef;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  settingsClicked(e: Event) {
    this.settingsOpen = this.settingsOpen ? false : true;
  }

  themeChosen(n: number) {
    this.active = n;
    this.emitActive.emit(n);
  }

  newTerminal(e: Event) {
    const term = this.renderer.createElement('a');
    this.renderer.setAttribute(term, "href", "/terminal");
    this.renderer.addClass(term, "nav-link");
    this.renderer.addClass(term, "nav-text");
    const text = this.renderer.createText('Terminal');
    this.renderer.appendChild(term, text);
    this.terminals.nativeElement.parentNode.insertBefore(term, this.terminals.nativeElement);
  }

}
