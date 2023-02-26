package com.example.application.data.entity;


import java.sql.Time;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
public class Event extends AbstractEntity {

    private Event event;

    @NotEmpty
    private String eventName = "";

    @NotEmpty
    private String location = "";

    @NotNull
    @NotEmpty
    private Date time;

    @NotNull
    @NotEmpty
    private Date date;

    @Override
    public String toString() {
        return eventName;
    }

    public void setEvent(Event event){
        this.event=event;
    }

    public Event getEvent() {
        return event;
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

    public void setTime(Time time) {
        this.time = time;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
