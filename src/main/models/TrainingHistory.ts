export class TrainingHistory {
  registeredDate: string;
  course: string;
  completedDate: string;
  
    constructor(registeredDate: string, course: string, completedDate: string, ) {
        this.registeredDate = registeredDate;
        this.course = course;
        this.completedDate = completedDate;
  }
}