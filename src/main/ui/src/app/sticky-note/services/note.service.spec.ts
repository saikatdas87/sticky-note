import {TestBed} from '@angular/core/testing';

import {NoteService} from './note.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Note} from '../dashboard/dashboard.component';
import {StickyNoteModule} from '../sticky-note.module';

describe('NoteService', () => {
  let httpClient: HttpTestingController;
  let service: NoteService;

  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientTestingModule, StickyNoteModule]}));
  beforeEach(() => {
    httpClient = TestBed.get(HttpTestingController);
    service = TestBed.get(NoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('retrieveAllNotes', () => {

    it('Should success', () => {
      const expected = [new Note('Test')];
      service.retrieveAllNotes().subscribe(res => {
        expect(res).toBe(expected);
      }, () => {
        throw(Error('should not be reached'));
      });
      const req = httpClient.expectOne('http://localhost:8080/notes');
      req.flush(expected);
      expect(req.request.method).toBe('GET');
      httpClient.verify();
    });

    it('Should return error if req fails', () => {
      const errorText = 'Server error';
      const errorCode = 500;
      service.retrieveAllNotes().subscribe(() => {
        throw(Error('should not be reached'));
      }, error => {
        expect(error.status).toBe(errorCode);
        expect(error.statusText).toBe(errorText);
      });
      const req = httpClient.expectOne('http://localhost:8080/notes');
      req.error(new ErrorEvent(''), {status: errorCode, statusText: errorText});
      expect(req.request.method).toBe('GET');
      httpClient.verify();
    });

  });

  describe('addNewNote', () => {

    it('Should success', () => {
      const expected = new Note('Test');
      service.addNewNote(expected).subscribe(res => {
        expect(res).toBe(expected);
      }, () => {
        throw(Error('should not be reached'));
      });
      const req = httpClient.expectOne('http://localhost:8080/note');
      req.flush(expected);
      expect(req.request.method).toBe('POST');
      httpClient.verify();
    });

    it('Should return error if req fails', () => {
      const errorText = 'Server error';
      const errorCode = 500;
      service.addNewNote(new Note('Test')).subscribe(() => {
        throw(Error('should not be reached'));
      }, error => {
        expect(error.status).toBe(errorCode);
        expect(error.statusText).toBe(errorText);
      });
      const req = httpClient.expectOne('http://localhost:8080/note');
      req.error(new ErrorEvent(''), {status: errorCode, statusText: errorText});
      expect(req.request.method).toBe('POST');
      httpClient.verify();
    });

  });


  describe('getNoteById', () => {

    it('Should success', () => {
      const expected = new Note('Test', 123);
      service.getNoteById(expected.id).subscribe(res => {
        expect(res).toBe(expected);
      }, () => {
        throw(Error('should not be reached'));
      });
      const req = httpClient.expectOne(`http://localhost:8080/note/${expected.id}`);
      req.flush(expected);
      expect(req.request.method).toBe('GET');
      httpClient.verify();
    });

    it('Should return error if req fails', () => {
      const errorText = 'Server error';
      const errorCode = 500;
      service.getNoteById(123).subscribe(() => {
        throw(Error('should not be reached'));
      }, error => {
        expect(error.status).toBe(errorCode);
        expect(error.statusText).toBe(errorText);
      });
      const req = httpClient.expectOne('http://localhost:8080/note/123');
      req.error(new ErrorEvent(''), {status: errorCode, statusText: errorText});
      expect(req.request.method).toBe('GET');
      httpClient.verify();
    });

  });


  describe('editNote', () => {

    it('Should success', () => {
      const expected = new Note('Test', 123);
      service.editNote(expected.id, expected).subscribe(res => {
        expect(res).toBe(expected);
      }, () => {
        throw(Error('should not be reached'));
      });
      const req = httpClient.expectOne(`http://localhost:8080/note/${expected.id}`);
      req.flush(expected);
      expect(req.request.method).toBe('PUT');
      httpClient.verify();
    });

    it('Should return error if req fails', () => {
      const errorText = 'Server error';
      const errorCode = 500;
      service.editNote(123, new Note('xx', 123)).subscribe(() => {
        throw(Error('should not be reached'));
      }, error => {
        expect(error.status).toBe(errorCode);
        expect(error.statusText).toBe(errorText);
      });
      const req = httpClient.expectOne('http://localhost:8080/note/123');
      req.error(new ErrorEvent(''), {status: errorCode, statusText: errorText});
      expect(req.request.method).toBe('PUT');
      httpClient.verify();
    });

  });


  describe('deleteNote', () => {

    it('Should success', () => {
      const expected = new Note('Test', 123);
      service.deleteNote(expected.id).subscribe(res => {
        expect(res).toBe(expected);
      }, () => {
        throw(Error('should not be reached'));
      });
      const req = httpClient.expectOne(`http://localhost:8080/note/${expected.id}`);
      req.flush(expected);
      expect(req.request.method).toBe('DELETE');
      httpClient.verify();
    });

    it('Should return error if req fails', () => {
      const errorText = 'Server error';
      const errorCode = 500;
      service.deleteNote(123).subscribe(() => {
        throw(Error('should not be reached'));
      }, error => {
        expect(error.status).toBe(errorCode);
        expect(error.statusText).toBe(errorText);
      });
      const req = httpClient.expectOne('http://localhost:8080/note/123');
      req.error(new ErrorEvent(''), {status: errorCode, statusText: errorText});
      expect(req.request.method).toBe('DELETE');
      httpClient.verify();
    });

  });

});
