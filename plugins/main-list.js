// let handler = async (m, { conn, usedPrefix, command }) => {
//   let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
//   if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`;

//   let pp = './Assets/OSGenieLogo.png'
//   let more = String.fromCharCode(8206);
//   let readMore = more.repeat(850);
//   //Bling bling! Your personal vault of virtual economy. Spend or save? Choose wisely!
//   let lkr;
//   switch (command) {
//     case 'list':
//       lkr = "*Get ready for the ride, here are your ticket options:*\n\n" +
//         "📥 *" + usedPrefix + "dlmenu* - 'DL' stands for 'Delicious Loot'. Come grab your goodies!\n\n" +
//         // "🎉 *" + usedPrefix + "funmenu* - The bot's party hat. Games, jokes and instant ROFLs. Let's get this party started!\n\n" +
//         "💰 *" + usedPrefix + "economymenu* - _Under maintenance_\n\n" +
//         "🎮 *" + usedPrefix + "gamemenu* - Enter the gaming arena. May the odds be ever in your favor!\n\n" +
//         "🎨 *" + usedPrefix + "stickermenu* - A rainbow of stickers for your inner artist. Make your chats pop!\n\n" +
//         "🧰 *" + usedPrefix + "toolmenu* - Your handy-dandy toolkit. What's your pick, genius?\n\n" +
//         "🎩 *" + usedPrefix + "logomenu* - Create a logo that screams YOU. Or whispers. You choose the volume.\n\n";
//       break;

//     case 'downloadermenu':
//     case 'dlmenu':
//       lkr = `
// ┏┫⦀⦙ Downloader Menu ⦙⦀┣┓

// » _${usedPrefix}play_
// » _${usedPrefix}spotify_
// » _${usedPrefix}yta <link>_
// » _${usedPrefix}ytv <link>_
// » _${usedPrefix}ytmp3 <link>_
// » _${usedPrefix}ytmp4 <link>_
// » _${usedPrefix}gimage_
// » _${usedPrefix}pinterest_
// » _${usedPrefix}mediafire <link>_
// » _${usedPrefix}gdrive <link>_
// » _${usedPrefix}twitter <link>_
// » _${usedPrefix}tiktok <link>_
// » _${usedPrefix}tiktokstalk_
// » _${usedPrefix}instagram <link>_
// » _${usedPrefix}facebook <link>_

// ┗┫⦀⦙ Downloader Menu ⦙⦀┣┛`; // 
//       break;
//     //         case 'economymenu':
//     //         lkr = `❀° ┄──•••───╮
//     //         𝙀𝘾𝙊𝙉𝙊𝙈𝙔 
//     //  ╰───•••──┄ °❀     
//     //  ┏━━━ʕ•㉨•ʔ━━━┓
//     //  ⎪⌲👑 _${usedPrefix}claim/daily_
//     //  ⎪⌲👑 _${usedPrefix}weekly_
//     //  ⎪⌲👑 _${usedPrefix}monthly_
//     //  ⎪⌲👑 _${usedPrefix}leaderboard_
//     //  ⎪⌲👑 _${usedPrefix}bet_
//     //  ⎪⌲👑 _${usedPrefix}heal_
//     //  ⎪⌲👑 _${usedPrefix}craft_
//     //  ⎪⌲👑 _${usedPrefix}balance_
//     //  ⎪⌲👑 _${usedPrefix}shop_
//     //  ⎪⌲👑 _${usedPrefix}sell_
//     //  ⎪⌲👑 _${usedPrefix}adventure_
//     //  ⎪⌲👑 _${usedPrefix}opencrate_
//     //  ⎪⌲👑 _${usedPrefix}mine_
//     //  ⎪⌲👑 _${usedPrefix}work_
//     //  ⎪⌲👑 _${usedPrefix}transfer_
//     //  ⎪⌲👑 _${usedPrefix}todiamond_
//     //  ⎪⌲👑 _${usedPrefix}tomoney_
//     //  ┗━━━ʕ•㉨•ʔ━━━┛`; // 
//     //         break;
//     case 'economymenu':
//       lkr = `
// ⭑┏┫⦀⦙ Economy Menu ⦙⦀┣┓⭑

// _Economy features are under maintenance now_

// ⭑┗┫⦀⦙ Economy Menu ⦙⦀┣┛⭑`; // 
//       break;
//     // case 'funmenu':
//     //   lkr = `
//     //   ⭑┏━━┫⦀⦙ Fun Menu ⦙⦀┣━━┓⭑
//     // ⎪⌲👑 _${usedPrefix}character_
//     // ⎪⌲👑 _${usedPrefix}truth_
//     // ⎪⌲👑 _${usedPrefix}shayeri_
//     // ⎪⌲👑 _${usedPrefix}ship_
//     // ⎪⌲👑 _${usedPrefix}waste_
//     // ⎪⌲👑 _${usedPrefix}simpcard_
//     // ⎪⌲👑 _${usedPrefix}hornycard_
//     // ⎪⌲👑 _${usedPrefix}ytcomment_
//     // ⎪⌲👑 _${usedPrefix}stupid_
//     // ⎪⌲👑 _${usedPrefix}lolicon_
//     // ┗━━━ʕ•㉨•ʔ━━━┛`; // 
//     //   break;
//     case 'gamemenu':
//       lkr = `
// ⭑┏━━┫⦀⦙ Games Menu ⦙⦀┣━━┓⭑

// » _${usedPrefix}tictactoe_
// » _${usedPrefix}delttt_
// » _${usedPrefix}math_
// » _${usedPrefix}math answer_
// » _${usedPrefix}ppt_
  
// ⭑┗━━┫⦀⦙ Games Menu ⦙⦀┣━━┛⭑`; // 
//       break;
//     case 'stickermenu':
//       lkr = `
// ⭑┏━┫⦀⦙ Sticker Menu ⦙⦀┣━┓⭑

// » _${usedPrefix}sticker_
// » _${usedPrefix}take_
// » _${usedPrefix}scircle_
// » _${usedPrefix}smaker_
// » _${usedPrefix}sremovebg_
// » _${usedPrefix}getsticker_
// » _${usedPrefix}emojimix_
// » _${usedPrefix}toimg_
// » _${usedPrefix}tovid_
// » _${usedPrefix}ttp_
// » _${usedPrefix}telesticker_
// » _${usedPrefix}attp_
// » _${usedPrefix}attp2_
// » _${usedPrefix}attp3_

// ⭑┗━┫⦀⦙ Sticker Menu ⦙⦀┣━┛⭑`;
//       break;
//     case 'toolmenu':
//       lkr = `
// ⭑┏━━┫⦀⦙ Tools Menu ⦙⦀┣━━┓⭑

// » _${usedPrefix}autosticker_
// » _${usedPrefix}pdf_
// » _${usedPrefix}whatmusic_
// » _${usedPrefix}calc_
// » _${usedPrefix}google_
// » _${usedPrefix}lyrics_
// » _${usedPrefix}readmore_
// » _${usedPrefix}ssweb_
// » _${usedPrefix}tts_
// » _${usedPrefix}translate_
// » _${usedPrefix}tourl_
// » _${usedPrefix}wikipedia_
// » _${usedPrefix}qrmaker_
// » _${usedPrefix}readqr_
// » _${usedPrefix}fancy_
// » _${usedPrefix}weather_
// » _${usedPrefix}siri_
// » _${usedPrefix}alexa_
// » _${usedPrefix}tocartoon_
// » _${usedPrefix}quote_
// » _${usedPrefix}technews_
// » _${usedPrefix}define_
// » _${usedPrefix}pokedex_
// » _${usedPrefix}removebg_
// » _${usedPrefix}apk_
// » _${usedPrefix}tinyurl/shorturl_
// » _${usedPrefix}readvo_
// » _${usedPrefix}true_

// ⭑┗━━┫⦀⦙ Tools Menu ⦙⦀┣━━┛⭑`; // 
//       break;
//     case 'logomenu':
//       lkr = `
// ⭑┏┫⦀⦙ Logo Menu ⦙⦀┣┓⭑

// » _${usedPrefix}logo_ <type> <text1> <text2>
// » _${usedPrefix}logo list_

// ⭑┗┫⦀⦙ Logo Menu ⦙⦀┣┛⭑`; // 
//       break;
//     default:
//       lkr = `Invalid command. Type ${usedPrefix}list to see available options.`;
//   }

//   conn.sendFile(m.chat, pp, 'perfil.jpg', lkr, m, false, { mentions: [who] });

//   let done = '📃';
//   m.react(done);
// };

// handler.help = ['list', 'botmenu', 'ownermenu', 'groupmenu', 'dlmenu', 'downloadermenu', 'economymenu', 'funmenu', 'gamemenu', 'stickermenu', 'nsfwmenu', 'logomenu', 'toolmenu'];
// handler.tags = ['main'];
// handler.command = ['list', 'botmenu', 'ownermenu', 'groupmenu', 'dlmenu', 'downloadermenu', 'economymenu', 'funmenu', 'gamemenu', 'stickermenu', 'nsfwmenu', 'logomenu', 'toolmenu'];

// export default handler


