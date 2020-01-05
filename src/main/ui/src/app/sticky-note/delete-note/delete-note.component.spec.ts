import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteNoteComponent} from './delete-note.component';
import {AlertMessageComponent} from '../../shared/alert-message/alert-message.component';
import {NoteTextComponent} from '../note-text/note-text.component';
import {NoteComponent} from '../note/note.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Note} from '../dashboard/dashboard.component';
import {NoteService} from '../services/note.service';
import {of} from 'rxjs';

describe('DeleteNoteComponent', () => {
  let component: DeleteNoteComponent;
  let fixture: ComponentFixture<DeleteNoteComponent>;
  const note: Note = new Note('Note Text', 1112);
  let service: NoteService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteNoteComponent, AlertMessageComponent, NoteTextComponent, NoteComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [NgbActiveModal, NoteService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(NoteService);
    fixture = TestBed.createComponent(DeleteNoteComponent);
    component = fixture.componentInstance;
    component.note = note;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('On click delete calls component delete()', () => {
    const deleteBtn = fixture.nativeElement.querySelectorAll('.uit-delete-note-button')[0];
    const spy = spyOn(component, 'delete');

    deleteBtn.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(note);
  });

  it('Calls service deleteNote() method on delete ', async () => {
    const spy = spyOn(service, 'deleteNote').and.returnValue(of({}));
    component.delete(note);
    await fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(note.id);
  });
});
