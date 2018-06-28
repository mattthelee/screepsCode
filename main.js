var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var Job = require('job');
var jobGenerator = require('job.generator');
var jobAssigner = require('job.assigner');


var harvesterNumber = 2;
var upgraderNumber = 2;
var builderNumber = 2;
var harvesterDef = [WORK,WORK,CARRY,MOVE]
var upgraderDef = [WORK,WORK,CARRY,MOVE]
var builderDef = [WORK,WORK,CARRY,MOVE]


module.exports.loop = function () {
    myRoom =  Game.rooms['W8N7']
    jobArray = jobGenerator.run(myRoom);
    jobAssigner.run(myRoom,jobArray)

     var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);


    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builder: ' + builders.length);


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
    }
}
