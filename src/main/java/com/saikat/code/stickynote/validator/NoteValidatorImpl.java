package com.saikat.code.stickynote.validator;

import com.saikat.code.stickynote.exception.InvalidDataException;
import com.saikat.code.stickynote.exception.ResourceNotFoundException;
import com.saikat.code.stickynote.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoteValidatorImpl implements NoteValidator{

    private final NoteRepository noteRepo;

    @Autowired
    public NoteValidatorImpl(NoteRepository noteRepo) {
        this.noteRepo = noteRepo;
    }

    public void validateExistence(final Long noteId) {
        if (!noteRepo.existsById(noteId)) {
            throw new ResourceNotFoundException("No note found with the id");
        }
    }

    public void validateContent(final String noteContent) {
        if (noteContent == null || noteContent.isEmpty() || noteContent.length() > 200) {
            throw new InvalidDataException("Invalid note content");
        }
    }
}
