import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTextComponent } from './note-text.component';

describe('NoteTextComponent', () => {
  let component: NoteTextComponent;
  let fixture: ComponentFixture<NoteTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteTextComponent);

  });

  it('should create', () => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Display passed text', () => {
    component = fixture.componentInstance;
    component.text = 'Sample text';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Sample text');
  });
});
