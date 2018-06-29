var Job = require('job');


var jobAssigner = {

  assignJob: function (creep,job) {
    creep.memory.job = job.description;
    job.assigned = creep.name;
    console.log('Creep: ' + creep.name + ' should have job: ' + job.description);
    console.log('job assigned: ' + job.assigned);
    return job
  },

  run: function(room,jobArray) {
    var assignedJobs = jobArray.filter( job => job.assigned != false);
    var unassignedJobs = jobArray.filter( job => job.assigned === false);
    console.log('assigned Jobs: ' + assignedJobs.length + ' unassigned: ' + unassignedJobs.length);
    for (job of unassignedJobs) {
      //console.log(job.description);
      //console.log('Assigned: ' + job.assigned);
      var creeps = room.find(FIND_MY_CREEPS);
      unemployedCreeps = creeps.filter(creep => creep.memory.job == null);
      //console.log(creeps);
      //console.log(unemployedCreeps.length);
      if (unemployedCreeps.length > 0) {
        assignedJobs.push(this.assignJob(unemployedCreeps[0],job));
      }
    }
    for (debug of assignedJobs){
      console.log(debug.assigned);
    }
    return assignedJobs;
  }



}

module.exports = jobAssigner;
