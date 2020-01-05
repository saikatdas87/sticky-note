import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteComponent } from './note.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Note} from '../dashboard/dashboard.component';
import {NoteTextComponent} from '../note-text/note-text.component';

@Component({
  template: `
    <app-note *ngFor="let note of notes">
      <app-note-text [text]="note.content"></app-note-text>
    </app-note>`
})
class NoteWrapperComponent {
  notes: Note[];
}

describe('NoteComponent', () => {
  let component: NoteComponent<string>;
  let fixture: ComponentFixture<NoteComponent<string>>;
  let wrapperComponent: NoteWrapperComponent;
  let wrapperFixture: ComponentFixture<NoteWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteComponent, NoteWrapperComponent , NoteTextComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent<NoteComponent<string>>(NoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test click on content ', async () => {
    wrapperFixture = TestBed.createComponent(NoteWrapperComponent);
    wrapperComponent = wrapperFixture.componentInstance;
    wrapperComponent.notes = [new Note('Text', 1112)];
    await wrapperFixture.detectChanges();

    const clickSpy = spyOn(component, 'onClick');
    const noteBody = fixture.nativeElement.querySelectorAll('.uit-note-content')[0];
    noteBody.click();

    await fixture.detectChanges();
    await wrapperFixture.detectChanges();

    expect(clickSpy).toHaveBeenCalled();
  });

  it('Test click on delete button ', async () => {
    wrapperFixture = TestBed.createComponent(NoteWrapperComponent);
    wrapperComponent = wrapperFixture.componentInstance;
    wrapperComponent.notes = [new Note('Text', 1112)];
    await wrapperFixture.detectChanges();

    const deleteSpy = spyOn(component, 'onDelete');
    const deleteButton = fixture.nativeElement.querySelectorAll('.uit-note-delete-button')[0];
    deleteButton.click();

    await fixture.detectChanges();
    await wrapperFixture.detectChanges();

    expect(deleteSpy).toHaveBeenCalled();
  });
});
