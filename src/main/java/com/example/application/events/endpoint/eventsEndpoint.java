package com.example.application.events.endpoint;

import java.util.List;
import com.example.application.events.repository.eventsRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.example.application.events.entity.Events;

import dev.hilla.Endpoint;

@Endpoint
@AnonymousAllowed
public class eventsEndpoint {

    private eventsRepository eventsRepo;

    public eventsEndpoint(){
       eventsRepo = new eventsRepository();
    }

    public List<Events> retrieveAllEvents(){
        return eventsRepo.getAllEvents();
    }

    public void addEvents(Events event){
        eventsRepo.addEvents(event);
    }

    public void editEvents(Events event){
        eventsRepo.editEvent(event);
    }

    public void deleteEvent(int id){
        eventsRepo.deleteEvent(id);
    }
}
