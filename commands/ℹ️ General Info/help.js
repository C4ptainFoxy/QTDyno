const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const db = require("quick.db");

module.exports = {
  name: "help",
  aliases: ['h', 'helppls'],
  description: "Shows all available bot commands.",
  execute: async (client, message, args) => {

    var prefix = db.fetch(`guildprefix_${message.guild.id}`);
    if (!prefix) {
      var prefix = ".";
    }
    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];
      var commandnum = [];
      readdirSync("./commands/").forEach((dir, files) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
    
        );

        const cmds = commands.map((command) => {
        
          let file = require(`../../commands/${dir}/${command}`);
          
          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });
 
        let data = new Object();
        let data1 = new Object();
       
        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(", "),
        };

        categories.push(data);

      });

   let commandscount = "214";

      const embed = new MessageEmbed()
        .setTitle(`📬 Need help? Here are all of my commands:\n Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`.`)



        .addField("** <:AC_info:902912302083342377> BOT CODE INFO**", "`dependencies`, `modules`, `servers`, `stats`, `uptime`\n\n**<:AC_files:902905794364850228> GENERAL INFO**\n`djs`, `help`, `invite`, `links`, `ping`, `serverstats`, `vote`, **`privacy`**\n\n** <a:AC_verifed_bot_dev:902904061559463936> ** **OWNERS**\n`shell`, `control`, `eval`, `usage`\n\n <a:AC_crown:902711733326610472> **Guessing Games** <a:AC_secons:902910391871496254>\n `find-words`, `guess-number`, `lovecalc`\n\n :cake: **Birthday Commands** :cake:\n `set-birthday`, `check-birthday`\n\n **Anti Bad Words**\n `anti-badwords`")


        .addField("** <:AC_pen:902895223510822913>  AUTOMOD**", "`anti-alt`, `antilink`, `autonick`, `auto-official-role`, `auto-official-role-disable`, `autorole`, `role-all`\n\n**<a:AC_heart:902912708645638164>  FUN**\n`afk`, `animesearch`, `ascii`, `baka`, `beep`, `dumb`, `calc`, `cattext`, `dice`, `eightball`, `flipcoin`, `fliptext`, `hack`, `iq`, `joke`, `kill`, `messages`, `poke`, `poll`, `ratewaifu`, `rps`, `sneeze`, `waifu`, `youtube`, `zalgo`\n\n **Information Of People**\n `Profile`\n\n **Biography**\n `set-bio`, `bio-reset`, `check-bio`\n\n **Custom Commands**\n `cc-create`, `cc-delete`, `cc-list`")


        .addField("**<:AC_chat:902912624503689276>  LEVELING**", "`rank`\n\n** <a:AC_diamond:902904691057393734>  ECONOMY**\n`addmoney`, `balance`, `beg`, `bet`, `buy`, `daily`, `deposit`, `monthly`, `pay`, `profile`, `roulette`, `weekly`, `withdraw`, `work`\n\n**<:AC_shield_deny:902910620234559518>  LOGS**\n`logs-ticket`, `set-logs`, `remove-logs`\n\n**<a:AC_tadada:902910448561696809>  GIVEAWAY**\n`edit`, `list`, `end`, `reroll`, `start`,`create`, `cancel`\n\n**<a:AC_dj:902904633347932181>  MUSIC**\n`24/7`, `bassboost`, `dc`, `connect`, `lyrics`, `np`, `pause`, `play`, `queue`, `resume`, `shuffle`, `skip`, `stop`, `volume`\n\n**<a:AC_badge:902909841968857098>  REPORT**\n`suggest`, `bug-report`\n\n** <a:AC_ver_tick:902909844267352094>  WELCOME AND LEAVE**\n`leave`, `set-welcome`, `set-leave`, `welcome`")


        


        .addField("**<:AC_ticket:904192892149592084> TICKET**", "`add`, `close`, `delete`, `new`, `open`, `remove`, `setup`\n\n**<:AC_bulb:902905513812058193> REACTION ROLES**\n`reaction-role`, `reaction-role-remove`\n\n**:video_game: GAMES**\n`csgo`, `poke`, `slots`, `tictactoe`\n\n**<:AC_img:902905482774192178>  IMAGE**\n`3000yr`, `approved`, `batslap`, `beautiful`, `brazzers`, `burn`, `cat`, `challenger`, `cuddle`, `dict`, `distort`, `dog`, `ddungeon`, `facechange`, `fire`, `flatearth`, `foxgirl`, `gay`, `hug`, `kiss`, `love`, `magik`, `meme`, `qrcode`, `randomav`, `rip`, `scary`, `slap`, `triggered`, `tickle`, `tweet`, `vs`, `wanted`")


        .addField("**<:AC_moderator_badge:902910861180534814>  MODERATION**", "`announce`, `ban`, `color`, `hide`, `kick`, `lock`, `maintainence`, `nuke`, `prune`, `purge`, `say`, `sendembed`, `serverlock`, `serverunlock`, `set`, `slowmode`, `stealemoji`, `unban`, `unhide`, `unlock`, `vcid`, `voicedeafen`, `voicekick`, `voicemove`, `voicemute`, `voiceundeaf`, `voiceunmute`, `warn`, `warns`\n\n**<a:AC_black_flame:902903759598932008> CHATBOT**\n`remove-channel`, `set-channel`\n\n**<a:AC_red_dot:902903574042902568>  UTILITY**\n`avatar`, `covid`, `id`, `members`, `roleid`, `github`, `servericon`, `serverinfo`, `time`, `info`, `weather`")

      

        .setFooter(
          `Requested by ${message.author.tag} | Total ${commandscount} Commands`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands! (Some Commands will show on help And they are working just Command is disabled in detaied help command)`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${prefix}${command.name} ${command.help.usage}}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.help.description
            ? command.help.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
          
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  },
};

      //made by aditya codez