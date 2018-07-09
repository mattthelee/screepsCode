var roleWorker = {

    /** @param {Creep} creep **/
    run: function(creep,jobArray) {
      jobIndex = jobArray.findIndex(thisJob => thisJob.description == creep.memory.job);
      job = jobArray[jobIndex];
      if (!job){
        // If it doesn't have a job, nothing do.

        return jobArray
      }

      target = job.target;

      switch(job.type) {
        case 'extract':

          //Do some harvesting
          if(creep.carry.energy < creep.carryCapacity) {
                if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
              // If creep is full finish job
              creep.say('Full');
              jobArray.splice(jobIndex,1);
              delete creep.memory.job;
            }
          break;
        case 'build':
          // go build something ERR_INVALID_TARGET
          if(creep.carry.energy != 0 ){
            var buildResponse = creep.build(target)
            if(buildResponse == ERR_INVALID_TARGET){
              console.log(creep + ' cant build ' + target);
              creep.say('Built');
              jobArray.splice(jobIndex,1);
              delete creep.memory.job;
            }
            if(buildResponse == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
          } else {
            // If creep is empty finish job
            creep.say('Empty b');
            jobArray.splice(jobIndex,1);
            delete creep.memory.job;
          }
          break;
        case 'upgrade':
          // upgrade something
          if(creep.carry.energy != 0 ){
            if(creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
              }
            }  else {
              // If creep is empty finish job
              creep.say('Empty u');
              jobArray.splice(jobIndex,1);
              delete creep.memory.job;
            }
          break;
        case 'transfer':
          // Transfer resources to storage
          if(creep.carry.energy != 0 ){
            var transferResponse = creep.transfer(target, RESOURCE_ENERGY);
              if( transferResponse == ERR_NOT_IN_RANGE || transferResponse == ERR_FULL) {
                  creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
              }

          } else {
            // If creep is empty finish job
            creep.say('Empty t');
            jobArray.splice(jobIndex,1);
            delete creep.memory.job;
            }
          }
      }
};

module.exports = roleWorker;
