// Everything has been written by Pizzakeitto,
// using https://discordjs.guide/ as example :) yes

const Discord = require('discord.js')
require('dotenv').config()
const { prefix } = require('./config.json')
const fs = require('fs')

const maintenancemode = false

const client = new Discord.Client({
    intents: ['GUILDS',
        'GUILD_EMOJIS_AND_STICKERS',
        'GUILD_INTEGRATIONS',
        'GUILD_WEBHOOKS',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGE_TYPING',
        'DIRECT_MESSAGES',
        'DIRECT_MESSAGE_REACTIONS',
        'DIRECT_MESSAGE_TYPING']
})

//Read commands from the commands directory
client.commands = new Discord.Collection()
const commandFolders = fs.readdirSync('./commands')

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`)
        client.commands.set(command.name, command)
    }
}

console.log(client.commands)

client.once('ready', () => {
    client.user.setStatus("online")
    console.log('[Lilith] I am aliveee')
})

client.on('messageCreate', msg => {
    if (maintenancemode && msg.author.id != 221652595486228481) return
    if (msg.author.bot) return // If the message is sent by a bot, do nothing
    if (msg.mentions.users.has(client.user.id)) {
    }

    if (!msg.content.toLowerCase().startsWith(prefix)) return //If the message doesn't start with the prefix, do nothing

    if (!msg.guild) return msg.channel.send("Ei pyge")

    let args = msg.content.slice(prefix.length).trim().split(/ +/);
    let commandWithoutSpace = args.shift().toLowerCase();
    let commandWithSpace1 = `${commandWithoutSpace} ${args[0]}`;
    let commandWithSpace2 = `${commandWithoutSpace} ${args[0]} ${args[1]}`;
    let commandWithSpace3 = `${commandWithoutSpace} ${args[0]} ${args[1]} ${args[2]}`;
    let commandWithSpace4 = `${commandWithoutSpace} ${args[0]} ${args[1]} ${args[2]} ${args[3]}`;
    let commandWithSpace5 = `${commandWithoutSpace} ${args[0]} ${args[1]} ${args[2]} ${args[3]} ${args[4]}`;
    let command = null;

// check with the space first
if (client.commands.has(commandWithSpace1)) {
    command = commandWithSpace1;
    args.shift();
} else if (client.commands.has(commandWithSpace2)) {
    command = commandWithSpace2;
    args.shift();
    args.shift();
} else if (client.commands.has(commandWithSpace3)) {
    command = commandWithSpace3;
    args.shift();
    args.shift();
    args.shift();
} else if (client.commands.has(commandWithSpace4)) {
    command = commandWithSpace4;
    args.shift();
    args.shift();
    args.shift();
    args.shift();
} else if (client.commands.has(commandWithSpace5)) {
    command = commandWithSpace5;
    args.shift();
    args.shift();
    args.shift();
    args.shift();
    args.shift();
} else if (client.commands.has(commandWithoutSpace)) {
    // Ok komennos ei löydy viittä välilyöntii    
    command = commandWithoutSpace;
}


    if (!command) {
        const msgs = [
            "Minulla ei ole mitään hajua mitä haluat minun tekevän :bone:",
            "Eei kyl nyt onnnaa",
            "Ei pysty",
            "EPEK = Ei pysty ei kykene",
            "En voi toteuttaa pyyntöäsi",
            "Ei huvita nyt, katsotaanko myöehmmin?",
        ]
        let randomMsg = msgs[Math.floor(Math.random() * msgs.length)]
        msg.channel.send(randomMsg)
        return
    }
    command = client.commands.get(command) //gets the actual command object


    try {
        command.execute(msg, args)
    } catch (error) {
        console.error(error)
        msg.reply("Lahos saatana")
    }
})

process.on('exit', function () {
    client.destroy()
})

process.on('SIGINT', function () {
    client.destroy()
    process.abort()
})

client.login(process.env.TOKEN) 