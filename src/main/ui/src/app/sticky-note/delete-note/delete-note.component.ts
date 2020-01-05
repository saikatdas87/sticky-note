import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Note} from '../dashboard/dashboard.component';

@Component({
  selector: 'app-delete-note',
  templateUrl: './delete-note.component.html',
  styleUrls: ['./delete-note.component.scss']
})
export class DeleteNoteComponent implements OnInit {

  @Input() note: Note;

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }
  closeModal() {
    this.modal.dismiss('Cross click');
  }
}
