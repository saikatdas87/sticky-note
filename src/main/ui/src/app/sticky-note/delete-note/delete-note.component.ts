import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Note} from '../dashboard/dashboard.component';
import {NoteService} from '../services/note.service';
import {AlertType} from '../../shared/alert-message/alert-message.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-note',
  templateUrl: './delete-note.component.html',
  styleUrls: ['./delete-note.component.scss']
})
export class DeleteNoteComponent {

  @Input() note: Note;
  deleteFailed = false;
  deleteSuccess = false;
  failMessage = '';
  alertType = AlertType;

  constructor(public modal: NgbActiveModal, private service: NoteService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  closeModal() {
    this.modal.dismiss('Cross click');
  }

  delete(note: Note) {
    this.service.deleteNote(note.id).subscribe(() => {
      this.deleteSuccess = true;
    }, error => {
      this.deleteFailed = true;
      this.failMessage = error.error.message || error.message;
    });
  }

  close() {
    this.modal.dismiss('Cross click');
    return this.router.navigate(['/']);
  }
}
