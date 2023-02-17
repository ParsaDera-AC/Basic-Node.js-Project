export class HumanResourcesHistory {
    hireDate: string;
    reason:string;
    leaveDate:string;
  
    constructor(hireDate: string, reason: string, leaveDate: string, ) {
     this.hireDate = hireDate;
     this.reason = reason;
     this.leaveDate = leaveDate;
    }
  }