export class Task {
    constructor(task) {
      this.id = undefined;
      this.label = undefined;
      this.periodicity = undefined;
      this.required = false;
      this.subtasks = [];
      this.history = {};
      this.status = undefined;
      this.lastDate = undefined;
      this.dueDate = undefined;
      this.status = undefined;
      this.status = undefined;

      if(task){
        this.computeTask(task);
        this.empty = false
      } else {
        this.empty = true
      }
    }

    computeTask(task) {
        this.id = task.id ;
        this.label = task.label ;
        this.periodicity = task.periodicity;
        this.required = task.required;
        this.subtasks = task.subtasks;
        this.history = task.history;
        this.status = this.getTastStatus();
        this.lastDate = this.getLastDate();
        this.dueDate = this.getDueDate();
        this.remainingDays = this.getRemainingDays();
        this.remainingPercentage = this.getRemainingPercentage();
    }
  
    // Méthode pour marquer la tâche comme demandé
    require() {
      this.required = true;
    }

    getTastStatus() {
        if(this.remainingPercentage <= 0 || this.required) {
            return 'urgent'
        } else if (this.remainingPercentage <= 35) {
            return 'medium'
        } else {
            return 'normal'
        }
    }
    
    getLastDate() {
        if (this.history.length > 0) {
            return this.history[0].date
        } else {
            return undefined;
        }
    }
    
    getDueDate() {
        if (this.lastDate) {
            return new Date(this.lastDate.setDate(this.lastDate.getDate() + this.periodicity))
        } else {
            return new Date(new Date() + this.periodicity)
        }
    }
    
    getRemainingDays(){
        let remainingTime = this.dueDate - new Date();
        return Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
    }
    
    getRemainingPercentage(){
        return this.remainingDays / this.periodicity * 100;
    }
}
