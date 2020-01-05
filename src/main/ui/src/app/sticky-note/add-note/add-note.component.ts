import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {NoteService} from '../services/note.service';
import {Note} from '../dashboard/dashboard.component';
import {Router} from '@angular/router';
import {AlertType} from '../../shared/alert-message/alert-message.component';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  @Input() editNoteMode = false;
  @Input() noteId: number;
  @Output() editEmitter: EventEmitter<Note> = new EventEmitter<Note>();

  noteAddedSuccess = false;
  failedToAddOrUpdate = false;
  addedNote: Note | undefined;
  alertType = AlertType;
  errorMessage = '';
  noteForm: FormGroup = new FormGroup({
    content: new FormControl('')
  });

  constructor(public modal: NgbActiveModal, private service: NoteService, private router: Router, private formBuilder: FormBuilder) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit() {
    if (this.editNoteMode) {
      this.service.getNoteById(this.noteId).subscribe(note => {
        this.noteForm = this.formBuilder.group({
          content: note.content,
          id: note.id
        });
      }, error => {
        this.errorMessage = error.message;
        this.failedToAddOrUpdate = true;
      });
    }
  }

  closeModal() {
    this.modal.dismiss('Cross click');
    return this.router.navigate(['/']);
  }

  save() {
    if (this.editNoteMode) {
      this.editEmitter.emit(this.noteForm.value);
    } else {
      this.service.addNewNote(this.noteForm.value).subscribe(note => {
        this.noteAddedSuccess = true;
        this.addedNote = note;
      }, error => {
        this.errorMessage = error.status === 0 ? error.message : error.error.message;
        this.failedToAddOrUpdate = true;
      });
    }
  }

}
