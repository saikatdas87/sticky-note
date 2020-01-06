import {Component, OnInit} from '@angular/core';
import {NoteService} from '../services/note.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddNoteComponent} from '../add-note/add-note.component';
import {DeleteNoteComponent} from '../delete-note/delete-note.component';
import {EditNoteComponent} from '../edit-note/edit-note.component';
import {AlertType} from '../../shared/alert-message/alert-message.component';

export class Note {
  readonly id?: number;
  readonly content: string;

  constructor(content: string, id?: number) {
    this.id = id;
    this.content = content;
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  notes: Note[] = [];
  failedToLoad = false;
  failedMessage = '';
  showAlertType = AlertType;

  constructor(private service: NoteService, private modal: NgbModal) {
  }

  ngOnInit() {
    this.service.retrieveAllNotes().subscribe(notes => {
      this.notes = notes;
      this.failedToLoad = false;
      this.failedMessage = '';
    }, error => {
      this.failedToLoad = true;
      this.failedMessage = error.message;
    });
  }

  deleteNote(note: Note) {
    const modalRef = this.modal.open(DeleteNoteComponent, {backdrop: 'static'});
    modalRef.componentInstance.note = note;
  }

  editNote(noteId: number) {
    const modalRef = this.modal.open(EditNoteComponent, {backdrop: 'static'});
    modalRef.componentInstance.nodeId = noteId;
  }

  addNote() {
    this.modal.open(AddNoteComponent, {backdrop: 'static'});
  }

}
