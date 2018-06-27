var Job = require('jobs');

var = jobGenerator = {

  run: function(room) {
    sources = room.find(FIND_SOURCES);
    for (source in sources) {
      jobGenerator.push(new Job("extract from source:" + source));
    }

    constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);
    for (constructionSite in constructionSites) {
      jobGenerator.push(new Job("build :" + constructionSite));
    }

    jobGenerator.push(new Job("upgrade :" + room.controller));
  }
}

module.exports = jobGenerator;
