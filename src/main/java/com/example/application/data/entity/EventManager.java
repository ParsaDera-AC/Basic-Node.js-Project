package com.example.application.data.entity;

import java.util.LinkedList;
import java.util.List;
import javax.annotation.Nullable;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
public class EventManager extends AbstractEntity {
    @NotBlank
    private String name;

    @OneToMany(mappedBy = "eventManager")
    @JsonIgnoreProperties("eventManager")
    private List<Event> events;

    public EventManager(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }
}