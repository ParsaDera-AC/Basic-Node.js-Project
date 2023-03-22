
export class FinancialReport {
    title: string;
    date: string;
    type: string;
    income: number;
    totalSpent: number;
    netTotal: number;
  
    constructor(title: string, date: string, type: string, income: number,totalSpent: number, netTotal: number) {
      this.title = title;
      this.date = date;
      this.type = type;
      this.income = income;
      this.totalSpent = totalSpent;
      this.netTotal = netTotal;
    }
  }