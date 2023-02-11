
export class FinancialReport {
    title: string;
    date: string;
    type: string;
  
    constructor(title: string, date: string, type: string) {
      this.title = title;
      this.date = date;
      this.type = type;
    }
  }