import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent<T> {

  @Output() delete: EventEmitter<T> = new EventEmitter();
  @Output() edit: EventEmitter<T> = new EventEmitter();
  @Input() hideToolbar = false;

  @ContentChild(TemplateRef, {static: true}) noteTemplate: TemplateRef<T>;

  constructor() {
  }

  onDelete(event) {
    this.delete.emit(event);
  }

  onClick(event) {
    this.edit.emit(event);
  }
}
