import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NoteComponent} from './note/note.component';
import {NoteTextComponent} from './note-text/note-text.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddNoteComponent} from './add-note/add-note.component';
import {DeleteNoteComponent} from './delete-note/delete-note.component';
import {SharedModule} from '../shared/shared.module';
import {EditNoteComponent} from './edit-note/edit-note.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  declarations: [
    DashboardComponent,
    NoteComponent,
    NoteTextComponent,
    AddNoteComponent,
    DeleteNoteComponent,
    EditNoteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
    BrowserModule,
  ],
  entryComponents: [
    AddNoteComponent,
    DeleteNoteComponent,
    EditNoteComponent]
})
export class StickyNoteModule {
}
