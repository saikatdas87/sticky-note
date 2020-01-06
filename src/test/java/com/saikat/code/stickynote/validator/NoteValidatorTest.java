package com.saikat.code.stickynote.validator;

import com.saikat.code.stickynote.model.Note;
import com.saikat.code.stickynote.repository.NoteRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.BDDMockito.given;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = NoteValidator.class)
public class NoteValidatorTest {

    @MockBean
    private NoteRepository noteRepo;

    private NoteValidator validator;

    @Before
    public void init() {
        validator = new NoteValidatorImpl(noteRepo);
    }

    @Test
    public void testExistenceSuccess() {
        Long id = 123L;
        Note expected = new Note();
        expected.setId(id);
        expected.setContent("Test");
        given(noteRepo.existsById(id)).willReturn(true);
        try {
            validator.validateExistence(123L);
        } catch (Exception e) {
            fail("Should not have thrown any exception");
        }

    }

    @Test
    public void testExistenceFails() {
        Long id = 123L;
        Note expected = new Note();
        expected.setId(id);
        expected.setContent("Test");
        given(noteRepo.existsById(id)).willReturn(true);
        try {
            validator.validateExistence(123L);
        } catch (Exception e) {
            assertTrue(true);
        }
    }

    @Test
    public void testContentSuccess() {
        String expected = "Test";
        try {
            validator.validateContent(expected);
        } catch (Exception e) {
            fail("Should not have thrown any exception");
        }
    }

    @Test
    public void testContentEmptyFails() {
        String expected = "";
        try {
            validator.validateContent(expected);
            fail("Should have thrown exception");
        } catch (Exception e) {
            assertTrue(true);
        }
    }

    @Test
    public void testContentMoteThan200CharsFails() {
        String expected = "asdasdasdasd asdasdasdasd asdasdasdsadas" +
                "asdsadasd" +
                "asdsadasdsadasdasdsadsadsadasdsadasdasdasdsadsa das asdasdasdasdasdasdasdasdasdasdasd" +
                "asdasdasdasdasdasdd klahdshasldlajdlahdlahsldhlasdlashdlhasldhl dlajsdalsdlasdlhasldhlasjhdlasdlajsldjasldlasdlhj";
        try {
            validator.validateContent(expected);
            fail("Should have thrown exception");
        } catch (Exception e) {
            assertTrue(true);
        }
    }
}
