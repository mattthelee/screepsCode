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
    var creeps = room.find(FIND_MY_CREEPS);
    var employedCreeps = creeps.filter(creep => creep.memory.job != null);
    activeJobs = []
    for (employedCreep of employedCreeps) {
      activeJobs.push(employedCreep.memory.job)
    }
    var assignedJobs = jobArray.filter( job => activeJobs.includes(job.description));
    var unassignedJobs = jobArray.filter( job => !activeJobs.includes(job.description));
    console.log('assigned Jobs: ' + assignedJobs.length + ' unassigned: ' + unassignedJobs.length);
    for (job of unassignedJobs) {
      // If extract job ensure worker isnt full
      if (job.type == 'extract'){
        unemployedCreeps = creeps.filter(creep => creep.memory.job == null && creep.carry.energy < creep.carryCapacity);
      } else {
        unemployedCreeps = creeps.filter(creep => creep.memory.job == null);
      }
      //console.log(creeps);
      //console.log(unemployedCreeps.length);
      if (unemployedCreeps.length > 0) {
        assignedJobs.push(this.assignJob(unemployedCreeps[0],job));
      }
    }
    return assignedJobs;
  }
}

module.exports = jobAssigner;
