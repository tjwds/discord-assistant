var Discord = require('discord.io');
var ElizaBot = require('elizabot');
var moment = require('moment');
var firebase = require('firebase');

var KEYS = require('../keys.js')
var GENERAL = '546115566218379266';

var bot = new Discord.Client({
    autorun: true,
    token: KEYS.TOKEN
});
var firebase = firebase.initializeApp(KEYS.FIREBASE);
var db = firebase.database();


var eliza = new ElizaBot();

daily_reminders = firebase.database().ref('daily_reminder');

function minuteListeners() {
  var active_reminders = [];

  var these_reminders = [];
  daily_reminders.once("value").then(function(snapshot){
    active_reminders = snapshot.val();
    
    if (active_reminders.length) {
      these_reminders = active_reminders.filter(reminder => reminder.time === moment().format('h:mm a'));
    }
    
    if (these_reminders.length) {
      these_reminders.forEach(reminder => {
        bot.sendMessage({
          to: GENERAL,
          message: reminder.text
        });
      })
    }
  })

  // if (moment().format('h:mm a') === '7:57 pm') {
  //   bot.sendMessage({
  //     to: GENERAL,
  //     message: "It's 7:57 PM!!!!!!"
  //   });
  // }
}

setInterval(minuteListeners, 60000);

console.log(moment().format('h:mm:ss a'));

bot.on('ready', function(event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.on('message', function(user, userID, channelID, message, event) {
  if (user === "tjwds") {
    console.log(user, userID, channelID, message, event);
  
      if (message === "ping") {
          bot.sendMessage({
              to: channelID,
              message: "pong"
          });
      }
  
      if (message === "hello meedle I love you") {
        bot.sendMessage({
          to: channelID,
          message: "yes, I, the robot even know that joe's love for meedle is immense and immeasurable"
      });
      }
    
    if (channelID === "546121420800000000") {
      var reply = eliza.transform(message)
      bot.sendMessage({
        to: channelID,
        message: reply
      });
    }
  }
});


