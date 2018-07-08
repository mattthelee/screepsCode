// 1) I want to generate a list of jobs that need doing and order them by priority
//    a) There should always be a job to extract resources if there is an open Resource
//    b) transfer job should be created when a structure is not full 
//    c) if no job available creeps should return to holding area near but not directly next to the source
//    d) if a creep dies its job should be unassigned
// 2) creeps should accept jobs from the list starting with highest priority
//    a) creeps holding pattern should prevent them getting stuck, therefore at least one gap between others.
//    b) creeps should hold the function to perform their job in their memory?
// 3) only creeps capable of doing the job should accept it
// 4) Resource extraction should be number 1 priority until storage is full
// 5) When storage full we want priority to switch to spending resources.
// 6) Full creeps should be assigned to one of the spending priorities.
// 7) priorities for creeps should be based on the the proximity of the job start.
// 8) jobs should also have a mechanism to move up in priority if they have not been dealt with in a while
// 9) There should be a job to pre-emptively move to a source to perform resource extraction even when currently free
// 10) should be possible to reassign creep to new task if it can efficiently swap jobs with another
// 11) creeps should bid for work based on their proximity
// 12) creeps should bid for work also based on their tools
// TODO whenever the script is re-run the job array will be destroyed therefore must stor info in creep memory
class Job {
  constructor(description, type, target, assigned = false) {
    this.description = description;
    this.type = type;
    this.target = target;
    this.assigned = assigned;
  }
}

module.exports = Job;
