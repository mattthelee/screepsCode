var Job = require('job');

var jobGenerator = {

  run: function(room) {
    jobArray = []
    sources = room.find(FIND_SOURCES);
    for (source in sources) {
      var sourceJob = new Job("extract from source:" + source )
      jobArray.push(sourceJob);
    }

    constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);
    for (constructionSite in constructionSites) {
      jobArray.push(new Job("build :" + constructionSite));
    }

    jobArray.push(new Job("upgrade :" + room.controller));

    return jobArray
    
  }
}

module.exports = jobGenerator;
