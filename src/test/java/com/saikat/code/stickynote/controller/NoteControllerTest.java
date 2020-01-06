package com.saikat.code.stickynote.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.saikat.code.stickynote.exception.InvalidDataException;
import com.saikat.code.stickynote.exception.ResourceNotFoundException;
import com.saikat.code.stickynote.model.Note;
import com.saikat.code.stickynote.repository.NoteRepository;
import com.saikat.code.stickynote.validator.NoteValidator;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.BDDMockito.doThrow;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(NoteController.class)
public class NoteControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private NoteRepository noteRepo;

    @MockBean
    private NoteValidator noteValidator;

    @Autowired
    private ObjectMapper objectMapper;


    @Test
    public void testGetAllNotes() throws Exception {
        Long id = 123L;
        Note expected = new Note();
        expected.setId(id);
        expected.setContent("Test");
        List<Note> notes = Collections.singletonList(expected);
        given(noteRepo.findAll(Sort.by(Sort.Direction.ASC, "id"))).willReturn(notes);
        MvcResult mvcResult = mvc.perform(get("/notes")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON)).andReturn();
        String actualResponseBody = mvcResult.getResponse().getContentAsString();
        assertEquals(objectMapper.writeValueAsString(notes), actualResponseBody);
    }

    @Test
    public void testGetNodeByIdSuccess() throws Exception {
        Long id = 123L;
        Note expected = new Note();
        expected.setId(id);
        expected.setContent("Test");
        when(noteRepo.findById(id)).thenReturn(Optional.of(expected));
        MvcResult mvcResult = mvc.perform(get("/note/123")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON)).andReturn();
        String actualResponseBody = mvcResult.getResponse().getContentAsString();
        assertEquals(objectMapper.writeValueAsString(expected), actualResponseBody);
    }

    @Test
    public void testGetNodeByIdNotFound() throws Exception {
        Long id = 123L;
        Note expected = new Note();
        expected.setId(id);
        expected.setContent("Test");
        when(noteRepo.findById(id)).thenReturn(Optional.empty());
        mvc.perform(get("/note/123")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andReturn();
    }

    @Test
    public void testAddNoteSuccess() throws Exception {
        Long id = 123L;
        Note expected = new Note();
        expected.setId(id);
        expected.setContent("Test");
        expected.setCreatedAt(new Date());
        expected.setUpdatedAt(new Date());
        doNothing().when(noteValidator).validateContent("Test");
        when(noteRepo.save(expected)).thenReturn(expected);
        MvcResult mvcResult = mvc.perform(post("/note")
                .content(objectMapper.writeValueAsString(expected))
                .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andReturn();

    }

    @Test
    public void testUpdateNoteSuccess() throws Exception {
        Long id = 123L;
        Note expected = new Note();
        expected.setId(id);
        expected.setContent("Test");
        doNothing().when(noteValidator).validateContent(expected.getContent());
        doNothing().when(noteValidator).validateExistence(id);
        when(noteRepo.findById(id)).thenReturn(Optional.of(expected));
        when(noteRepo.save(expected)).thenReturn(expected);
        MvcResult mvcResult = mvc.perform(put("/note/123")
                .content(objectMapper.writeValueAsString(expected))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        String actualResponseBody = mvcResult.getResponse().getContentAsString();
        assertEquals(objectMapper.writeValueAsString(expected), actualResponseBody);
    }

    @Test
    public void testUpdateNoteFailsInValidation() throws Exception {
        Long id = 123L;
        Note expected = new Note();
        expected.setId(id);
        expected.setContent("Test");
        doThrow(new ResourceNotFoundException("No note found with the id")).when(noteValidator).validateExistence(id);
        mvc.perform(put("/note/123")
                .content(objectMapper.writeValueAsString(expected))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andReturn();
    }

    @Test
    public void testUpdateNoteFailsIfContentInvalid() throws Exception {
        Long id = 123L;
        Note expected = new Note();
        expected.setId(id);
        expected.setContent("");
        doNothing().when(noteValidator).validateExistence(id);
        doThrow(new InvalidDataException("Content invalid")).when(noteValidator).validateContent(expected.getContent());
        mvc.perform(put("/note/123")
                .content(objectMapper.writeValueAsString(expected))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andReturn();
    }

    @Test
    public void testUpdateNoteFailsInFind() throws Exception {
        Long id = 123L;
        Note expected = new Note();
        expected.setId(id);
        expected.setContent("Test");
        doNothing().when(noteValidator).validateContent(expected.getContent());
        doNothing().when(noteValidator).validateExistence(id);
        when(noteRepo.findById(id)).thenReturn(Optional.empty());
        mvc.perform(put("/note/123")
                .content(objectMapper.writeValueAsString(expected))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andReturn();
    }

    @Test
    public void testDeleteSuccess() throws Exception {
        Long id = 123L;
        Note expected = new Note();
        expected.setId(id);
        expected.setContent("Test");
        when(noteRepo.findById(id)).thenReturn(Optional.of(expected));
        doNothing().when(noteRepo).delete(expected);
        mvc.perform(delete("/note/123")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testDeleteFailsIfNoteNotFound() throws Exception {
        Long id = 123L;
        Note expected = new Note();
        expected.setId(id);
        expected.setContent("Test");
        when(noteRepo.findById(id)).thenReturn(Optional.empty());
        mvc.perform(delete("/note/123")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}
