import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Note} from '../dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private host = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  public retrieveAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.host}/notes`);
  }

  public addNewNote(note: Note): Observable<Note> {
    return this.http.post<Note>(`${this.host}/note`, note);
  }

  public getNoteById(noteId: number): Observable<Note> {
    return this.http.get<Note>(`${this.host}/note/${noteId}`);
  }

  public editNote(noteId: number, note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.host}/note/${noteId}`, note);
  }

  public deleteNote(noteId: number): Observable<any> {
    return this.http.delete(`${this.host}/note/${noteId}`);
  }
}
