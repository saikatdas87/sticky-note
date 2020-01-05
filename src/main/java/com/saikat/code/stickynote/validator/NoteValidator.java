package com.saikat.code.stickynote.validator;

public interface NoteValidator {
    void validateExistence(final Long noteId);

    void validateContent(final String noteContent);
}
