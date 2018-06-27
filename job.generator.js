var Job = require('job');

var jobGenerator = {

  run: function(room) {
    jobArray = []
    sources = room.find(FIND_SOURCES);
    for (source in sources) {
      jobArray.push(new Job("extract from source:" )); //+ source
    }

    constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);
    for (constructionSite in constructionSites) {
      jobArray.push(new Job("build :" + constructionSite));
    }

    jobArray.push(new Job("upgrade :" + room.controller));

    console.log('jobs: ');
    for (job in jobArray) {
      console.log(job.description);
    }
  }
}

module.exports = jobGenerator;
