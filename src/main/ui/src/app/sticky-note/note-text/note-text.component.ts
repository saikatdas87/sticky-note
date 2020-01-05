import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-note-text',
  templateUrl: './note-text.component.html',
  styleUrls: ['./note-text.component.scss']
})
export class NoteTextComponent implements OnInit {
  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
