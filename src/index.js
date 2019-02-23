var Discord = require('discord.io');
var ElizaBot = require('elizabot');
var moment = require('moment');
var firebase = require('firebase');
var request = require('request');

var KEYS = require('../keys.js')
var GENERAL = '546115566218379266';

var bot = new Discord.Client({
    autorun: true,
    token: KEYS.TOKEN
});
var firebase = firebase.initializeApp(KEYS.FIREBASE);
var db = firebase.database();

var eliza = new ElizaBot();

var time_words = ["minute", "minutes", "hour", "hours", "day", "days", "week", "weeks", "month", "months"];
var sites = [
  'http://joewoodsworks.com',
  'http://failbetter.com',
  'https://failbetter.editorland.com'
];

daily_reminders = firebase.database().ref('daily_reminder');

function minuteListeners() {
  // downchecker:
  if (moment().format('mm') === '16') {
    sites.map((site) => {
      request.get(site, (error, response, body) => {
        if (error) {
          console.log('548899419433730048');
          bot.sendMessage({
            to: '548899419433730048',
            message: `@tjwds ${site} IS DOWN!`
        });
        }
      })
    })
  }

  // daily reminders: 
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
    // console.log(user, userID, channelID, message, event);
    var message_string = message.split(" ");
    // console.log(message_string);
    if (message_string[0] === "!remindme") {
      if (Number(message_string[1])) {
        if (time_words.includes(message_string[2]) && message_string.length > 3) {
          message_return = message_string.slice(3);
          bot.sendMessage({
            to: channelID,
            message: 'Okay, I will remind you to "' + message_return.join(' ') + ' on ' + moment().add(message_string[1], message_string[2]).format('LLL')
          });
        }
      }
    }

      if (message === "ping") {
          bot.sendMessage({
              to: channelID,
              message: channelID
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


