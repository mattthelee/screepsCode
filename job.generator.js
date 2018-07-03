var Job = require('job');

var jobGenerator = {

  run: function(room,jobArray = []) {
    sources = room.find(FIND_SOURCES);
    for (source in sources) {
      // Check to see if there is already a job for this source
      if (jobArray){
        var planned = jobArray.find(job => job.target.id == source.id);
        if (!planned){
          // If source not planned add it to array
          jobArray.push(new Job("extract from source:" + source,'extract',source ));
        }
      }
    }

    constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);
    for (constructionSite of constructionSites) {
      // Check to see if there is already a job for this constructionSite
      if (jobArray){
        var planned = jobArray.find(job => job.target.id == constructionSite.id);
        if (!planned){
          // If source not planned add it to array
          jobArray.push(new Job("build :" + constructionSite,'build',constructionSite));
        }
      }
    }

    var stores = room.find(FIND_STRUCTURES, {
          filter: (structure) => {
              return (structure.structureType == STRUCTURE_EXTENSION ||
                  structure.structureType == STRUCTURE_SPAWN ||
                  structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
          }
      });
    for (store of stores) {
      if (jobArray){
        var planned = jobArray.find(job => job.target.id == store.id);
        if (!planned){
          // If source not planned add it to array
          jobArray.push(new Job("transfer to :" + store,'transfer',store));
        }
      }
    }

    // Check to see if there is already a job for this constructionSite
    if (jobArray){
      var planned = jobArray.find(job => job.target === room.controller.id);
      if (!planned){
        jobArray.push(new Job("upgrade :" + room.controller.id,'upgrade',room.controller.id));
      }
    }
    if (jobArray.length > 50) {
      jobArray = []
      console.log('Deleting job array due to oversizing')
    }
    return jobArray

  }
}

module.exports = jobGenerator;
