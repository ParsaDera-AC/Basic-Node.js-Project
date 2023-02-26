package com.example.application.data.endpoint;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import com.example.application.data.entity.Event;
import com.example.application.data.repository.EventRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

@Endpoint
@AnonymousAllowed
public class CrmEndpoint {
  private EventRepository eventRepository;


  public CrmEndpoint(EventRepository eventRepository) {
    this.eventRepository = eventRepository;
  }

  public static class CrmData {
    @Nonnull
    public List<@Nonnull Event> events = Collections.emptyList();

  }

  @Nonnull
  public CrmData getCrmData() {
    CrmData crmData = new CrmData();
    crmData.events = eventRepository.findAll();
    return crmData;
  }

  @Nonnull
  public Event saveEvent(Event event) {
    event.setEvent(eventRepository.findById(event.getEvent().getId())
        .orElseThrow(() -> new RuntimeException(
            "Could not find Company with ID " + event.getEvent().getId())));
    return eventRepository.save(event);
  }

  public void deleteContact(UUID eventId) {
    eventRepository.deleteById(eventId);
  }

}
