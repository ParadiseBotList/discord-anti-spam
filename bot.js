const Discord = require('discord.js');
const client = new Discord.Client();

var schedule = require('node-schedule');

const guildID = "ID HERE";
var server = ''
var counter = []

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  server = client.guilds.get(guildID);
});


// debug function; remove before launch
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
    console.log(counter)
  }
});




//
// COUNTER TRIGGERS
//


// after deleting a channel
client.on('channelDelete', channel => {
  console.log("Channel delete detected.")
  server.fetchAuditLogs().then (
    audit => updateCounter(audit.entries.first().executor.username)
  )
});


// after deleting a message
client.on('messageDelete', (message, channel) => {
  console.log("Message delete detected.")
  server.fetchAuditLogs().then (
    audit => updateCounter(audit.entries.first().executor.id)
  )
});


// after banning a user
client.on('guildBanAdd', (user) => {
  console.log("Message delete detected.")
  server.fetchAuditLogs().then (
    audit => updateCounter(audit.entries.first().executor.id)
  )
});


// after editing a role
client.on('roleUpdate', (user) => {
  console.log("Message delete detected.")
  server.fetchAuditLogs().then (
    audit => updateCounter(audit.entries.first().executor.id)
  )
});


// after deleting a role
client.on('roleDelete', (user) => {
  console.log("Message delete detected.")
  server.fetchAuditLogs().then (
    audit => updateCounter(audit.entries.first().executor.id)
  )
});


// after kicking a user
client.on('guildMemberRemove', (user) => {
  console.log("Message delete detected.")
  server.fetchAuditLogs().then (
    audit => updateCounter(audit.entries.first().executor.id)
  )
});


function updateCounter(user) {
  // increments user's delete count by 1 if user exists in list
  if (counter[user] != null) {
    counter[user] = counter[user] + 1
    checkForSpam(user)
  }

  // creates entry for user if user isn't currently in list
  else {
    counter[user] = 1
  }
}

function checkForSpam(userID) {
  // console.log(server.members)
  // console.log(counter[server.members.get(userID])
  if (counter[userID] > 3) {
    console.log(userID + "is on cooldown!");
  }
}



//
// TIMERS
//
const ALERT_FREQUENCY = "0,15,22,23,32,34,35,45 * * * *"   // default every 15 mins

var resetCounter = schedule.scheduleJob(ALERT_FREQUENCY, function(){
  for (var user in counter) {
    counter[user] = 0;
  }
});

client.login('ID HERE');
