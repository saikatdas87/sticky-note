import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddNoteComponent} from './add-note.component';
import {AlertMessageComponent} from '../../shared/alert-message/alert-message.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NoteComponent} from '../note/note.component';
import {NoteTextComponent} from '../note-text/note-text.component';
import {NgbActiveModal, NgbModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NoteService} from '../services/note.service';
import {of} from 'rxjs';
import {Note} from '../dashboard/dashboard.component';

describe('AddNoteComponent', () => {
  let component: AddNoteComponent;
  let fixture: ComponentFixture<AddNoteComponent>;
  let service: NoteService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNoteComponent, AlertMessageComponent, NoteComponent, NoteTextComponent],
      imports: [ReactiveFormsModule, FormsModule, NgbModalModule, HttpClientTestingModule, RouterTestingModule],
      providers: [NgbModal, NgbActiveModal, NoteService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(NoteService);
    fixture = TestBed.createComponent(AddNoteComponent);
  });

  it('should create', () => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Calls save method once clicked save', () => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    const saveButton = fixture.nativeElement.querySelectorAll('.uit-note-content-save')[0];
    const saveSpy = spyOn(component, 'save');
    saveButton.click();

    fixture.detectChanges();
    expect(saveSpy).toHaveBeenCalled();
  });

  it('on save service method is called', () => {
    component = fixture.componentInstance;
    component.noteForm = new FormGroup({
      content: new FormControl('Note text')
    });
    fixture.detectChanges();

    const addSpy = spyOn(service, 'addNewNote').and.returnValue(of(new Note('Note text', 11112)));

    component.save();
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledWith({content: 'Note text'});
  });

  it('On Edit mode textarea pre populated', () => {
    component = fixture.componentInstance;
    component.editNoteMode = true;
    component.noteId = 1112;
    spyOn(service, 'getNoteById').and.returnValue(of(new Note('Note text', 1112)));
    fixture.detectChanges();

    const textArea = fixture.nativeElement.querySelectorAll('#uit-note-text-content')[0];

    expect(textArea.value).toBe('Note text');
  });

  it('On Edit click save event emitted', () => {
    component = fixture.componentInstance;
    component.editNoteMode = true;
    component.noteId = 1112;
    spyOn(service, 'getNoteById').and.returnValue(of(new Note('Note text', 1112)));
    const editEmitter = spyOn(component.editEmitter, 'emit');
    fixture.detectChanges();

    component.save();
    fixture.detectChanges();

    expect(editEmitter).toHaveBeenCalledWith({content: 'Note text', id: 1112});
  });

  it('On close click calls closeModal()', () => {
    component = fixture.componentInstance;
    fixture.detectChanges();

    const closeBtn = fixture.nativeElement.querySelectorAll('.uit-note-add-close')[0];
    const spy = spyOn(component, 'closeModal');

    closeBtn.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

});
