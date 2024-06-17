import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ie11-markdown',
  templateUrl: './ie11-markdown.component.html',
  styleUrls: [ './ie11-markdown.component.css' ]
})
export class Ie11MarkdownComponent implements OnInit {
  @Input() data: any;

  @Input() src!: string;

  isIE11: boolean = typeof window === 'undefined' ? false : !!(window as any).MSInputMethodContext && !!(document as any).documentMode;

  ngOnInit(): void {
  }

}
