import {Component, OnInit} from '@angular/core';
import {NoteService} from '../services/note.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddNoteComponent} from '../add-note/add-note.component';
import {DeleteNoteComponent} from '../delete-note/delete-note.component';
import {EditNoteComponent} from '../edit-note/edit-note.component';

export class Note {
  readonly id?: number;
  readonly content: string;

  constructor(id: number, content: string) {
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

  private notes: Note[] = [];

  constructor(private service: NoteService, private modal: NgbModal) {

  }

  ngOnInit() {
    this.service.retrieveAllNotes().subscribe( notes => {
      this.notes = notes;
      console.log('Notes', this.notes);
    }, error => {
      console.log('Error', error);
    });
  }

  deleteNote(note: Note) {
    const modalRef = this.modal.open(DeleteNoteComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.note = note;
  }

  editNote(noteId: number) {
    console.log('Edditing', noteId);
    const modalRef = this.modal.open(EditNoteComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.nodeId = noteId;
  }

  addNote() {

    const modalRef = this.modal.open(AddNoteComponent, {size: 'lg', backdrop: 'static'});
  }

}
