package com.example.application.data.endpoint;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import com.example.application.data.entity.Event;
import com.example.application.data.entity.EventManager;
import com.example.application.data.repository.EventManagerRepository;
import com.example.application.data.repository.EventRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

@Endpoint
@AnonymousAllowed
public class EventCrudEndpoint {
    private EventRepository eventRepository;
    private EventManagerRepository eventManagerRepository;

    public EventCrudEndpoint(EventRepository eventRepository, EventManagerRepository eventManagerRepository) {
        this.eventRepository = eventRepository;
        this.eventManagerRepository = eventManagerRepository;
    }

    public static class EventData {
        @Nonnull
        public List<@Nonnull Event> events = Collections.emptyList();
        @Nonnull
        public List<@Nonnull EventManager> eventManagers = Collections.emptyList();
    }

    @Nonnull
    public EventData getEventData() {
        EventData eventData = new EventData();
        eventData.events = eventRepository.findAll();
        eventData.eventManagers = eventManagerRepository.findAll();
        return eventData;
    }

    @Nonnull
    public Event saveEvent(Event event) {
        event.setEventManager(eventManagerRepository.findById(event.getEventManager().getId())
            .orElseThrow(() -> new RuntimeException(
                "Could not find EventManager with ID " + event.getEventManager().getId())));
        return eventRepository.save(event);
    }

    public void deleteEvent(UUID eventId) {
        eventRepository.deleteById(eventId);
    }
}
