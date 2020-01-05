import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NoteComponent} from './note/note.component';
import {NoteTextComponent} from './note-text/note-text.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddNoteComponent} from './add-note/add-note.component';
import {DeleteNoteComponent} from './delete-note/delete-note.component';
import {SharedModule} from '../shared/shared.module';
import { EditNoteComponent } from './edit-note/edit-note.component';


@NgModule({
  declarations: [DashboardComponent, NoteComponent, NoteTextComponent, AddNoteComponent, DeleteNoteComponent, EditNoteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [AddNoteComponent, DeleteNoteComponent, EditNoteComponent]
})
export class StickyNoteModule {
}
