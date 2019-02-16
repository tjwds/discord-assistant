var Discord = require('discord.io');
var ElizaBot = require('elizabot');

var KEYS = require('../keys.js')

var bot = new Discord.Client({
    autorun: true,
    token: KEYS.TOKEN
});
var eliza = new ElizaBot();

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