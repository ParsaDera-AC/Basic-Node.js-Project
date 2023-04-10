package com.example.application.events.endpoint;

import com.example.application.events.entity.Events;
import com.example.application.events.repository.eventsRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class eventsEndpointTest {

    @Mock
    private eventsRepository eventsRepo;

    @InjectMocks
    private eventsEndpoint endpoint;

    @Test
    void testRetrieveAllEvents() {
        Events event1 = new Events(/* Set the required properties */);
        Events event2 = new Events(/* Set the required properties */);
        List<Events> events = Arrays.asList(event1, event2);

        when(eventsRepo.getAllEvents()).thenReturn(events);

        List<Events> retrievedEvents = endpoint.retrieveAllEvents();
        assertEquals(events, retrievedEvents);
        verify(eventsRepo, times(1)).getAllEvents();
    }

    @Test
    void testAddEvents() {
        Events event = new Events(/* Set the required properties */);

        endpoint.addEvents(event);
        verify(eventsRepo, times(1)).addEvents(event);
    }

    @Test
    void testEditEvents() {
        Events event = new Events(/* Set the required properties */);

        endpoint.editEvents(event);
        verify(eventsRepo, times(1)).editEvent(event);
    }

    @Test
    void testDeleteEvent() {
        int id = 1;

        endpoint.deleteEvent(id);
        verify(eventsRepo, times(1)).deleteEvent(id);
    }
}
