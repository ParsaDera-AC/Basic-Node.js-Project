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
public class CrmEndpointEvent {
  private EventRepository eventRepository;
  private EventManagerRepository eventManagerRepository;

  public CrmEndpointEvent(EventRepository eventRepository, EventManagerRepository eventManagerRepository) {
    this.eventRepository = eventRepository;
    this.eventManagerRepository = eventManagerRepository;
  }

  public static class CrmData {
    @Nonnull
    public List<@Nonnull Event> events = Collections.emptyList();
    @Nonnull
    public List<@Nonnull EventManager> eventManagers = Collections.emptyList();
  }

  @Nonnull
  public CrmData getCrmData() {
    CrmData crmData = new CrmData();
    crmData.events = eventRepository.findAll();
    crmData.eventManagers = eventManagerRepository.findAll();
    return crmData;
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
