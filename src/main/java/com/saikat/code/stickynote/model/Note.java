package com.saikat.code.stickynote.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="note")
public class Note extends Audit {
    @Id
    @GeneratedValue(generator = "note_id_generator")
    @SequenceGenerator(
            name = "note_id_generator",
            sequenceName = "note_id_sequence",
            initialValue = 1000
    )
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Column(columnDefinition = "text", length = 200)
    @NotNull
    private String content;
}
