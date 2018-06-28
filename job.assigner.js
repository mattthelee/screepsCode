var Job = require('job');


var jobAssigner = {

  assignJob: function (creep,job) {
    creep.memory.job = job.description;
    job.assigned = creep.name;
    console.log('Creep: ' + creep.name + ' should have job: ' + job.description);
  },

  run: function(room,jobArray) {
    for (job of jobArray) {
      if (job.assigned) {
        continue;
      }
      var unassignedJobs = jobArray.filter( job => job.assigned == false);
      var creeps = room.find(FIND_MY_CREEPS);
      unemployedCreeps = creeps.filter(creep => creep.memory.job == null);
      if (unemployedCreeps.length != 0) {
        this.assignJob(unemployedCreeps[0],job);
      }
    }
  }



}

module.exports = jobAssigner;
