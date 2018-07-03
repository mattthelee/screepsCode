var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('ð harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('ð§ build');
	    }

	    if(creep.memory.building) {
	        var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(target) {
                //console.log('building at ' + target.id);
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
      else {
          var withdrawSources = creep.room.find(FIND_STRUCTURES, {
                  filter: (structure) => {
                      return (structure.structureType == STRUCTURE_EXTENSION ||
                              structure.structureType == STRUCTURE_SPAWN) && structure.energy == structure.energyCapacity;
                  }
          });
          if(creep.withdraw(withdrawSources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(withdrawSources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
          }
      }
	}
};

module.exports = roleBuilder;
