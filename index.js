require('dotenv').config();
const express = require('express')
const PORT = process.env.PORT || 5000
const TelegramBot = require('node-telegram-bot-api')
const mongoose = require('mongoose')
const SceneController = require('./server/scene/scene.api/controller')
const SceneAssembler = require('./server/scene/assembler')
const Helper = require('./server/helper')
const WordModel = require('./server/db/models/word')

const bot = new TelegramBot(process.env.BOT_API, { polling: true });

mongoose
  .connect(process.env['DB_URL'], { useNewUrlParser: true, useUnifiedTopology: true })
  .then( res => console.log('Conected to DB ...'))
  .catch( err => console.log(err));

const scenesController = new SceneController(bot, new SceneAssembler.SaveWord(bot));
scenesController.on();

express()
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

bot.onText(/\/start/, msg => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, `Hello, I'm ur personal bot for saving words which u learned`);

  scenesController.enter('saveWord', msg.from.id, msg);
});

bot.onText(/\/count/, async msg => {
  const chatId = msg.chat.id;

  const responseFromDb = await WordModel.find();
console.log(responseFromDb);
  bot.sendMessage(chatId, `U have learned  ${responseFromDb.length} words right now`);
});

module.exports = bot;