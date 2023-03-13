package com.example.application.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.ZonedDateTime;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


@Entity
public class Event extends AbstractEntity {

    @ManyToOne
    @JoinColumn(name = "event_manager_id")
    @NotNull
    @JsonIgnoreProperties({ "events" })
    private EventManager eventManager;

    @NotEmpty
    private String eventName = "";

    @NotEmpty
    private String location = "";

    @NotNull
    private ZonedDateTime eventStartDate;

    @NotNull
    private ZonedDateTime eventEndDate;

    @Override
    public String toString() {
        return eventName;
    }

    public void setEventManager(EventManager eventManager) {
        this.eventManager = eventManager;
    }

    public EventManager getEventManager() {
        return eventManager;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public ZonedDateTime getEventStartDate() {
        return eventStartDate;
    }

    public void setEventStartDate(ZonedDateTime eventStartDate) {
        this.eventStartDate = eventStartDate;
    }

    public ZonedDateTime getEventEndDate() {
        return eventEndDate;
    }

    public void setEventEndDate(ZonedDateTime eventEndDate) {
        this.eventEndDate = eventEndDate;
    }

}

