package com.example.application.data.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
public class Event extends AbstractEntity {
    @ManyToOne
    @JoinColumn(name = "eventmanager_id")
    @NotNull
    @JsonIgnoreProperties({"events"})
    private EventManager eventManager;

    @NotEmpty
    private String eventName = "";

    @NotEmpty
    private String location = "";

    @NotNull
    private Date time;

    @NotNull
    private Date date;

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

    public String getLocationName() {
        return location;
    }

    public void setLocationName(String location) {
        this.location = location;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
