var Job = require('jobs');


var jobAssigner = {

  run: function(room,jobArray) {
    for (job in jobArray) {
      if (job.assigned) {
        continue;
      }
      var unassignedJobs = jobArray.filter( job => job.assigned == false);
      var creeps = room.find(FIND_MY_CREEPS);
      unemployedCreeps = creeps.filter(creep => creep.memory.job == false);
      assignJob(unemployedCreeps[0],job);
    }
  }

  function assignJob(creep,job) {
    creep.memory.job = job.description;
    job.assigned = creep.name;
    console.log('Creep: ' + creep.name + ' should have job: ' + job.description);
  }

}

module.exports = jobAssigner;
