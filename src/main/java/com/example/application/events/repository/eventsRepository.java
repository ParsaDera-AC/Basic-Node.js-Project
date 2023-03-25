package com.example.application.events.repository;

import java.util.ArrayList;
import java.util.List;
import com.example.application.events.entity.Events;

public class eventsRepository {

   List<Events> eventsList = new ArrayList<Events>(100);
   int id = 0;
   public eventsRepository(){

   }
   public List<Events> getAllEvents() {
      Events event = new Events();
      event.setId(1);
      event.setName("Patrol");
      event.setDate("2023-02-01");
      event.setEmail("test@gmail.com");
      event.setLocation("Ottawa, ON");
      event.setTime("01:00");
      event.setEvent("Patrolling");
      eventsList.add(event);

      Events events = new Events();
      event.setId(2);
      event.setName("Patrol");
      event.setDate("2023-02-01");
      event.setEmail("test@gmail.com");
      event.setLocation("Ottawa, ON");
      event.setTime("01:00");
      event.setEvent("Patrolling");
      eventsList.add(events);
      return eventsList;
   }

   public void addEvents(Events eventRqst) {

      Events newEvent = new Events();
      newEvent.setId(id);
      newEvent.setName(eventRqst.getName());
      newEvent.setEmail(eventRqst.getEmail());
      newEvent.setDate(eventRqst.getDate().toString());
      newEvent.setLocation(eventRqst.getLocation());
      newEvent.setTime(eventRqst.getTime().toString());
      eventsList.add(newEvent);
      id++;

   }

   public void editEvent(Events eventRqst){

      for (int i = 0; i < eventsList.size(); i++) {

         if (eventRqst.getId() == eventsList.get(i).getId()) {
            eventsList.get(i).setName(eventRqst.getName());
            eventsList.get(i).setEmail(eventRqst.getEmail());
            eventsList.get(i).setDate(eventRqst.getDate().toString());
            eventsList.get(i).setLocation(eventRqst.getLocation());
            eventsList.get(i).setTime(eventRqst.getTime().toString());
         }
      }
   }

   public void deleteEvent(Events eventRqst){

      for (int i = 0; i < eventsList.size(); i++) {
         if (eventRqst.getId() == eventsList.get(i).getId()) {
            eventsList.remove(i);
         }
      }
   }
}
