require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require("express");
const app = express();
const moment = require("moment-timezone");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('Hello!!! This is the Cyborg bot\ntype /help to get details of the commands');
})

bot.command('/help', ctx => {
    ctx.reply("As this is a new bot, it comes with very limited functionality as of yet.\n Type /Hi to recieve a Hello message \n Type /developer to know about the developer \n Type /intro to know more about me\n Type /day to get current day");
})

bot.command('Hi', ctx => {
    ctx.reply(`Hello there`);
})

bot.command('intro', ctx => {
    ctx.reply('Hello!!! My name is cyborg bot. I am 0 years old');
})

bot.command('developer', ctx => {
    ctx.reply("I have been developed by Shreyash !!!");
})

bot.command('dog', ctx => {
    ctx.replyWithPhoto({ url: 'https://dog.ceo/api/breeds/image/random' });
})


bot.command('day', ctx => {
    // Gets IST from UTC
    const istString = moment.tz(new Date().toISOString(), "Asia/Kolkata").format().slice(0, 16);

    // Gets Date string from IST
    const dayString = new Date(
        istString.slice(0, 4),          // Year
        istString.slice(5, 7) - 1,      // Month
        istString.slice(8, 10),         // Day
        istString.slice(11, 13),        // Hour
        istString.slice(14, 16)         // Minute
    ).toDateString();

    ctx.reply("Today is "
        + dayString.slice(0, 10) + ","   // Day, Month & Date
        + dayString.slice(10, 15));      // Year
})

// bot.command('sortingHat', async (ctx) => {
//     const house = await fetch('https://www.potterapi.com/v1/sortingHat');
//     ctx.reply(`You have been inducted into the house of ${house}`);
// })

app.get("/", (req, res) => {
    res.send("This is the root route of the bot");
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Bot started`);
})

bot.startPolling();