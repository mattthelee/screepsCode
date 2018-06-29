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
    for (constructionSite in constructionSites) {
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
