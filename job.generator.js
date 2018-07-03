var Job = require('job');

var jobGenerator = {

  run: function(room,jobArray = []) {
    sources = room.find(FIND_SOURCES);
    for (source in sources) {
      // Check to see if there is already a job for this source
      if (jobArray){
        var planned = jobArray.find(job => job.target === source);
        if (planned){
          // If source planned skip to next
          //console.log('planned source:' + planned);
          continue;
        }
      }
      var sourceJob = new Job("extract from source:" + source,'extract',source );
      jobArray.push(sourceJob);
    }

    constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);
    for (constructionSite of constructionSites) {
      // Check to see if there is already a job for this constructionSite
      if (jobArray){
        var planned = jobArray.find(job => job.target === constructionSite);
        if (planned){
          // If source planned skip to next
          continue;
        }
      }
      jobArray.push(new Job("build :" + constructionSite,'build',constructionSite));
    }

    var stores = room.find(FIND_STRUCTURES, {
          filter: (structure) => {
              return (structure.structureType == STRUCTURE_EXTENSION ||
                  structure.structureType == STRUCTURE_SPAWN ||
                  structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
          }
      });
      for (jobDebug of jobArray ){
        //console.log('store: ' + store)
        console.log('target: ' + jobDebug.target)
      }
      for (storedebug of stores){
        console.log('store: ' + storedebug)

      }
    for (store of stores) {
      if (jobArray){
        var planned = jobArray.find(job => job.target == store);
        var debug = jobArray.find(job => job.type == 'transfer');
        //console.log('debug ' + debug.length);

        //TODO fix this
        if (planned){
          // If source planned skip to next
          continue;
        }
      }
      jobArray.push(new Job("transfer to :" + store,'transfer',store));
    }

    // Check to see if there is already a job for this constructionSite
    if (jobArray){
      var planned = jobArray.find(job => job.target === room.controller.id);
      if (!planned){
        jobArray.push(new Job("upgrade :" + room.controller.id,'upgrade',room.controller.id));
      }
    }

    return jobArray

  }
}

module.exports = jobGenerator;
