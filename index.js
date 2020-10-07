const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const {Telegraf} = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const axios = require('axios');

bot.start((ctx) => {
    ctx.reply('Hello!!! This is the Cyborg bot\ntype /help to get details of the commands');
})

bot.command('/help', ctx => {
    ctx.reply("As this is a new bot, it comes with very limited functionality as of yet.\n Type /Hi to recieve a Hello message \n Type /developer to know about the developer \n Type /intro to know more about me\n Type /DevTalks to list the upcoming dev talks");    
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

bot.command('DevTalks', ctx => {
    axios.get(`https://api.github.com/repos/COPS-IITBHU/DevTalks/issues`).then(res => {
        const result = res.data;
        if(result.length == 0) {
            ctx.reply('No upcoming dev talks');
        }
        let msg = result.map(el => `[${el.title}](${el.html_url}) by [${el.user.login}](${el.user.html_url})`);
        ctx.replyWithMarkdown(msg.join('\n\n')).catch(err => {
            return ctx.reply('Sorry there was some error');
        })
    })
})

bot.launch();