package com.example.application.data.generator;

import com.example.application.data.entity.Event;
import com.example.application.data.entity.EventManager;
import com.example.application.data.repository.EventManagerRepository;
import com.example.application.data.repository.EventRepository;
import com.vaadin.flow.spring.annotation.SpringComponent;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@SpringComponent
public class EventDataGenerator {

    @Bean
    public CommandLineRunner loadEventData(EventRepository eventRepository, EventManagerRepository eventManagerRepository) {
        return args -> {
            Logger logger = LoggerFactory.getLogger(getClass());
            if (eventRepository.count() != 0L) {
                logger.info("Using existing database");
                return;
            }

            logger.info("Generating demo data");

            EventManager eventManager1 = new EventManager("EventManager 1");
            EventManager eventManager2 = new EventManager("EventManager 2");
            EventManager eventManager3 = new EventManager("EventManager 3");

            eventManagerRepository.save(eventManager1);
            eventManagerRepository.save(eventManager2);
            eventManagerRepository.save(eventManager3);

            Event event1 = new Event();
            event1.setEventName("Event 1");
            event1.setLocationName("City 1");
            event1.setDate(Date.from(LocalDate.now().atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()));
            event1.setTime(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
            event1.setEventManager(eventManager1);
            eventRepository.save(event1);

            Event event2 = new Event();
            event2.setEventName("Event 2");
            event2.setLocationName("City 2");
            event2.setDate(Date.from(LocalDate.now().plusDays(1).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()));
            event2.setTime(Date.from(LocalDateTime.now().plusHours(2).atZone(ZoneId.systemDefault()).toInstant()));
            event2.setEventManager(eventManager2);
            eventRepository.save(event2);

            Event event3 = new Event();
            event3.setEventName("Event 3");
            event3.setLocationName("City 3");
            event3.setDate(Date.from(LocalDate.now().plusDays(2).atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()));
            event3.setTime(Date.from(LocalDateTime.now().plusHours(4).atZone(ZoneId.systemDefault()).toInstant()));
            event3.setEventManager(eventManager3);
            eventRepository.save(event3);

            logger.info("Generated demo data");
        };
    }
}
