var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleWorker = require('role.worker');


var Job = require('job');
var jobGenerator = require('job.generator');
var jobAssigner = require('job.assigner');


var harvesterNumber = 4;
var upgraderNumber = 0;
var builderNumber = 0;
var workerNumber = 8;

var harvesterDef = [WORK,WORK,CARRY,MOVE];
var upgraderDef = [WORK,WORK,CARRY,MOVE];
var builderDef = [WORK,WORK,CARRY,MOVE];
var workerDef = [WORK,WORK,CARRY,MOVE];

var jobArray = [];

module.exports.loop = function () {
    myRoom =  Game.rooms['E57N34']
    //console.log('pre-length' + jobArray.length);
    jobArray = jobGenerator.run(myRoom,jobArray);
    //console.log('mid-length' + jobArray.length);
    jobAssigner.run(myRoom,jobArray);
    //  console.log('post-length' + jobArray.length);
    //for (job of jobArray){
      //console.log(job.description);
      //console.log(typeof(job.target));
    //}

    var tower = Game.getObjectById('5b3b17e4cf8ff9098540f5c0');
   if(tower) {
       var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
           filter: (structure) => structure.hits < structure.hitsMax
       });
       if(closestDamagedStructure) {
           tower.repair(closestDamagedStructure);
       }

       var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
       if(closestHostile) {
           //tower.attack(closestHostile);
       }
   }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    //console.log('Harvesters: ' + harvesters.length);


    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    //console.log('Upgraders: ' + upgraders.length);

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //console.log('Builder: ' + builders.length);
    var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');



    if(harvesters.length < harvesterNumber) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(harvesterDef, newName,
            {memory: {role: 'harvester'}});
    } else if (upgraders.length < upgraderNumber) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(upgraderDef, newName,
            {memory: {role: 'upgrader'}});
    } else if (builders.length < builderNumber) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(builderDef, newName,
            {memory: {role: 'builder'}});
    } else if (workers.length < workerNumber) {
        var newName = 'Worker' + Game.time;
        console.log('Spawning new worker: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(workerDef, newName,
            {memory: {role: 'worker'}});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'worker') {
            roleWorker.run(creep,jobArray);
        }
    }
}
