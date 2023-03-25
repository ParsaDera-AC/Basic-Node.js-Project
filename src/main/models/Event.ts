
export class Event {
  id: number;
    name: string;
    event: string;
    location: string;
    date: string;
    time: string;
    email: string;
  
    constructor(id:number, name:string, event: string, location: string, date: string, time: string, email:string) {
      this.id = id;
      this.name = name;
      this.event = event;
      this.location = location;
      this.date = date;
      this.time = time;
      this.email = email;
    }
  }