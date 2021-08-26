const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
            .setName('info')
            .setDescription('Returns info based on input')
            .addSubcommand(subcommand =>
                subcommand
                .setName('user')
                .setDescription('Gets info of mentioned user')
                .addUserOption(option => option.setName('target').setDescription('Mentioned User'))
            )
            .addSubcommand(subcommand =>
                subcommand
                .setName('server')
                .setDescription('Gets info for the Server')
            ),
        async execute(interaction) {
            if (interaction.options.getSubcommand() === 'user') {
                const user = interaction.options.getUser('target');
                if (user) {
                
                    const userEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`${user.username}`)
                    .setURL(`${user.defaultAvatarURL}`)
                    .setAuthor('RudeAverageDad', 'https://pbs.twimg.com/profile_images/925461540131577856/u5xik3hL_400x400.jpg', 'https://github.com/timleitch')
                    .setDescription('Heres that info you requested.')
                    .setThumbnail(`${user.defaultAvatarURL}`)
                    .addFields(             //use addField for single filed
                        { name: 'Username', value: `${user.username}`, inline: true},//can have 3 inlines                        
                        { name: 'Tag:', value: `#${user.discriminator}`, inline: true },
                        {name: 'Created on:', value: `${user.createdAt}`, inline: true},
                        { name: '\u200B', value: '\u200B' },//blank field
                        //{ name: 'Inline field title', value: 'Some value here', inline: true },
                    )                    
                    // .setImage(`${user.defaultAvatarURL}`)

                    .setTimestamp()
                    .setFooter('Thanks for looking', 'https://pbs.twimg.com/profile_images/925461540131577856/u5xik3hL_400x400.jpg');

                    await interaction.reply({   embeds: [userEmbed]  });
                    
                } else {
                    await interaction.reply(
                        `Username: ${user.username}\nTag: ${user.tag}\nYour ID: ${user.id}\nCreated Date: ${user.createdAt}`);
                       } 
            } else if (interaction.options.getSubcommand() === 'server') {
                    await interaction.reply(`Server name: ${interaction.guild.name} \nMember Count: ${interaction.guild.memberCount}`);
                } else {
                    await interaction.reply('No sub command selected');
                }
            
            },
        };