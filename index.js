const { Telegraf } = require('telegraf');
require('dotenv').config();

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

bot.command('intro', ctx=>{
    ctx.reply('Hello!!! My name is cyborg bot. I am 0 years old');
})

bot.command('developer', ctx=> {
    ctx.reply("I have been developed by Shreyash !!!");
})

bot.command('dog', ctx=> {
    ctx.replyWithPhoto({url: 'https://dog.ceo/api/breeds/image/random'});
})


bot.command('day', ctx => {
    const curDate = new Date();
    const date = curDate.getDate();
    const day = curDate.getDay();
    const month = curDate.getMonth();
    const year = curDate.getFullYear();
    const dayMap = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
    }
    ctx.reply(`Today is ${date}/${month+1}/${year}, and the day is ${dayMap[day]}`);
})

// bot.command('sortingHat', async (ctx) => {
//     const house = await fetch('https://www.potterapi.com/v1/sortingHat');
//     ctx.reply(`You have been inducted into the house of ${house}`);
// })

bot.launch();