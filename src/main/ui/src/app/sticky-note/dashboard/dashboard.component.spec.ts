import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent, Note} from './dashboard.component';
import {NoteService} from '../services/note.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../shared/shared.module';
import {HttpClient} from '@angular/common/http';
import {NoteTextComponent} from '../note-text/note-text.component';
import {NoteComponent} from '../note/note.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of, throwError} from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: NoteService;
  let modalService: NgbModal;
  const notes = [new Note('Text1', 111), new Note('Text2', 111)];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        NoteTextComponent,
        NoteComponent
      ],
      imports: [
        SharedModule,
        HttpClientTestingModule,
      ],
      providers: [
        HttpClient,
        NoteService,
        NgbModal
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    modalService = TestBed.get(NgbModal);
    service = TestBed.get(NoteService);
    fixture = TestBed.createComponent(DashboardComponent);
  });

  it('should create', () => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('calls backend to retrieve list of notes', () => {
    const noteSpy = spyOn(service, 'retrieveAllNotes').and.returnValue(of(notes));
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(noteSpy).toHaveBeenCalled();
  });

  it('Shows error message if unable to fetch note lists', () => {
    spyOn(service, 'retrieveAllNotes').and.returnValue(throwError({message: 'Error occurred'}));
    component = fixture.componentInstance;
    fixture.detectChanges();
    const alert = fixture.nativeElement.querySelectorAll('.uit-note-retrieval-error')[0];
    expect(alert).toBeDefined();
    expect(component.failedToLoad).toBe(true);
    expect(component.failedMessage).toContain('Error occurred');
  });

  it('Test add click function call', () => {
    component = fixture.componentInstance;
    fixture.detectChanges();

    const addSpy = spyOn(component, 'addNote');

    const addButton = fixture.nativeElement.querySelectorAll('.uit-add-note-button')[0];
    addButton.click();
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalled();
  });

});
