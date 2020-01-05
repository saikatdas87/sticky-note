import {Component, Input, OnInit} from '@angular/core';
import {Note} from '../dashboard/dashboard.component';
import {NoteService} from '../services/note.service';
import {AlertType} from '../../shared/alert-message/alert-message.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  @Input() nodeId: number;
  editSuccess = false;
  editFailed = false;
  alertType = AlertType;
  editedNote: Note;
  errorMessage = '';

  constructor(public modal: NgbActiveModal, private service: NoteService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit() {
  }

  editNote(noteToEdit: Note) {
    this.service.editNote(noteToEdit.id, noteToEdit).subscribe(note => {
      this.editSuccess = true;
      this.editedNote = note;
    }, error => {
      this.errorMessage = error.error ? error.error.message : error.message;
      this.editFailed = true;
    });
  }

  closeModal() {
    this.modal.dismiss('Cross click');
    return this.router.navigate(['/']);
  }
}
