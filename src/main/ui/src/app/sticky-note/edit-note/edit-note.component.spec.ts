import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNoteComponent } from './edit-note.component';
import {AddNoteComponent} from '../add-note/add-note.component';
import {NoteComponent} from '../note/note.component';
import {NoteTextComponent} from '../note-text/note-text.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NoteService} from '../services/note.service';
import {AlertMessageComponent} from '../../shared/alert-message/alert-message.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {Note} from '../dashboard/dashboard.component';

describe('EditNoteComponent', () => {
  let component: EditNoteComponent;
  let fixture: ComponentFixture<EditNoteComponent>;
  let service: NoteService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNoteComponent, AddNoteComponent, NoteComponent, NoteTextComponent, AlertMessageComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, FormsModule],
      providers: [NgbActiveModal, NoteService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(NoteService);
    fixture = TestBed.createComponent(EditNoteComponent);
    component = fixture.componentInstance;
    component.nodeId = 11112;
    spyOn(service, 'getNoteById').and.returnValue(of(new Note('Note text', 1112)));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Uses add-note component', () => {
    const add = fixture.nativeElement.querySelectorAll('app-add-note')[0];
    expect(add).toBeDefined();
  });

  it('Click save calls editNote()', () => {
    const saveBtn = fixture.nativeElement.querySelectorAll('.uit-note-content-save')[0];
    const editSpy = spyOn(component, 'editNote');
    saveBtn.click();
    fixture.detectChanges();

    expect(editSpy).toHaveBeenCalledWith({content: 'Note text', id: 1112});

  });

  it('onEdit calls service method to call backend', () => {
    const expected = new Note('Edited', 1112);
    const editSpy = spyOn(service, 'editNote').and.returnValue(of(expected));
    component.editNote(expected);
    fixture.detectChanges();

    expect(editSpy).toHaveBeenCalledWith(1112, expected);
    const textComp = fixture.nativeElement.querySelectorAll('app-note-text')[0];
    expect(textComp.textContent.trim()).toBe('Edited');
  });

});
