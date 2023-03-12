
export class Event {
  eventId: number;
    name: string;
    event: string;
    location: string;
    date: string;
    time: string;
    email: string;
  
    constructor(eventId:number, name:string, event: string, location: string, date: string, time: string, email:string) {
      this.eventId = eventId;
      this.name = name;
      this.event = event;
      this.location = location;
      this.date = date;
      this.time = time;
      this.email = email;
    }
  }