
export class Event {
    event: string;
    location: string;
    date: string;
    time: string;
  
    constructor(event: string, location: string, date: string, time: string) {
      this.event = event;
      this.location = location;
      this.date = date;
      this.time = time;
    }
  }