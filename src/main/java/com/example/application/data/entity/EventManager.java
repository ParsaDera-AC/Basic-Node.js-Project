package com.example.application.data.entity;

import java.util.List;

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