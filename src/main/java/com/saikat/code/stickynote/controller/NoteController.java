package com.saikat.code.stickynote.controller;

import com.saikat.code.stickynote.exception.ResourceNotFoundException;
import com.saikat.code.stickynote.model.Note;
import com.saikat.code.stickynote.repository.NoteRepository;
import com.saikat.code.stickynote.validator.NoteValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class NoteController {

    private final NoteRepository noteRepo;
    private final NoteValidator noteValidator;

    @Autowired
    public NoteController(NoteRepository noteRepo, NoteValidator noteValidator) {
        this.noteRepo = noteRepo;
        this.noteValidator = noteValidator;
    }

    @GetMapping("/notes")
    public List<Note> getAllNotes() {
        return noteRepo.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @GetMapping("/note/{noteId}")
    public Note getNodeById(@PathVariable Long noteId) {
        return noteRepo.findById(noteId).orElseThrow(() -> new ResourceNotFoundException("Note could not found"));
    }

    @PostMapping("/note")
    public Note addNote(@Valid @RequestBody Note note) {
        noteValidator.validateContent(note.getContent());
        return noteRepo.save(note);
    }

    @PutMapping("/note/{noteId}")
    public Note updateNote(@NotNull @PathVariable Long noteId, @Valid @RequestBody Note note) {
        noteValidator.validateExistence(noteId);
        noteValidator.validateContent(note.getContent());

        return noteRepo.findById(noteId).map(noteToUpdate -> {
            noteToUpdate.setContent(note.getContent());
            return noteRepo.save(noteToUpdate);
        }).orElseThrow(() -> new ResourceNotFoundException("Note could not be updated"));
    }

    @DeleteMapping("/note/{noteId}")
    public ResponseEntity<?> deleteNote(@PathVariable Long noteId) {
        noteValidator.validateExistence(noteId);

        return noteRepo.findById(noteId).map(note -> {
            noteRepo.delete(note);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Note could not be deleted"));
    }
}
