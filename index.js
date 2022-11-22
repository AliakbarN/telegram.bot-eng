require('dotenv').config();
const express = require('express')
const PORT = process.env.PORT || 5000
const TelegramBot = require('node-telegram-bot-api')
const SceneController = require('./server/scene.api/controller')
const NameScene = require('./server/scene.creater/askname')
const AgeScene = require('./server/scene.creater/askage')
const Helper = require('./server/helper')

const bot = new TelegramBot(process.env.BOT_API, { polling: true });

const scenesController = new SceneController(bot, new AgeScene(bot), new NameScene(bot));
scenesController.on();

express()
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, `Hello`);

  scenesController.enter('name', msg.from.id, msg);
})

module.exports = bot;