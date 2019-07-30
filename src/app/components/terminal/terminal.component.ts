import { Component, OnInit, ElementRef, ViewEncapsulation, OnChanges, ViewChild, Input } from '@angular/core';
import { Terminal } from 'xterm';
import { FetchService } from 'src/app/services/fetch.service';
import * as attach from 'xterm/lib/addons/attach/attach'
import * as fit from 'xterm/lib/addons/fit/fit';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: [
    './terminal.component.css',
  ]
})
export class TerminalComponent implements OnInit, OnChanges {

  terminal: Terminal;
  @ViewChild('term', {read: ElementRef,static: false}) termDiv: ElementRef;
  @Input() active: number;
  loading = true;

  constructor(private fetchService: FetchService) {
    Terminal.applyAddon(attach);
    Terminal.applyAddon(fit);
    this.terminal = new Terminal({
      cols: 180,
      rows: 40,
      cursorBlink: true,
      fontSize: 16,
      fontFamily: 'Menlo, Monaco, Consolas, monospace',
    });
  }

  ngOnInit() {
    this.terminal.open(this.termDiv.nativeElement);
    this.terminal.writeln('Demo Terminal, try typing stuff..');
    this.terminal.writeln('');
    const protocol = (window.location.protocol === 'https:') ? 'wss://' : 'ws://';
    let socketURL = protocol + window.location.hostname + ':7000/terminals/';
    this.fetchService.getProcessIdUrl(this.terminal.rows.toString(), this.terminal.cols.toString()).subscribe(res => {
      console.log(res);
      const processId = res;
      socketURL += processId;
      const socket = new WebSocket(socketURL);
      socket.onopen = () => {
        this.loading = false;
        this.terminal.attach(socket);
        this.terminal._initialized = true;
      }
    },
    err => {
      console.log(err);
    });
  }

  setTheme() {
    const theme_core = {
      yellow: "#b58900",
      brightRed: "#cb4b16",
      red: "#dc322f",
      magenta: "#d33682",
      brightMagenta: "#6c71c4",
      blue: "#268bd2",
      cyan: "#2aa198",
      green: "#859900"
    };
    const themes = [
      {
          background: "#000000",
          foreground: "#ffffff"
      },
      Object.assign({}, theme_core, {
          background: "#002b36",
          foreground: "#fdf6e3",
          cursor: "#eee8d5",
          selection: "#ffffff77",
          brightBlack: "#002b36",
          black: "#073642",
          brightGreen: "#586e75",
          brightYellow: "#657b83",
          brightBlue: "#839496",
          brightCyan: "#93a1a1",
          white: "#eee8d5",
          brightWhite: "#fdf6e3"
      }),
      Object.assign({}, theme_core, {
          background: "#fdf6e3",
          foreground: "#002b36",
          cursor: "#073642",
          selection: "#00000044",
          brightWhite: "#002b36",
          white: "#073642",
          brightCyan: "#586e75",
          brightBlue: "#657b83",
          brightYellow: "#839496",
          brightGreen: "#93a1a1",
          black: "#eee8d5",
          brightBlack: "#fdf6e3"
      }),
      {
          background: "#ffffff",
          foreground: "#000000",
          selection: "#00000044",
          cursor: "#000000",
      },
    ];
    this.terminal.setOption('theme', themes[this.active]);
  }

  ngOnChanges() {
    this.setTheme();
  }

}
