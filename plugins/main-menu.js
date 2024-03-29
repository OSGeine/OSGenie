import {
  promises,
  readFileSync
 } from "fs"
 import {
  join
 } from "path"
 import {
  xpRange
 } from "../lib/levelling.js"
 import moment from "moment-timezone"
 import os from "os"

const handler = async (m, {
  conn,
  command,
  text,
  args,
  usedPrefix
}) => {
  

 let glb = global.db.data.users
 let usrs = glb[m.sender]
 let tag = `@${m.sender.split("@")[0]}`
 let mode = global.opts["self"] ? "Private" : "Public"
 
 let {
age,
exp,
limit,
level,
role,
registered,
credit
 } = glb[m.sender]
 let {
min,
xp,
max
 } = xpRange(level, global.multiplier)
 let name = await conn.getName(m.sender)


 let _uptime = process.uptime() * 1000
 let _muptime
 if (process.send) {
process.send("uptime")
_muptime = await new Promise(resolve => {
process.once("message", resolve)
setTimeout(resolve, 1000)
}) * 1000
 }
 let muptime = clockString(_muptime)
 let uptime = clockString(_uptime)

 
 let totalfeatures = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
 let totalreg = Object.keys(glb).length

  conn.gurumenu = conn.gurumenu ? conn.gurumenu : {};
  
  
 
  const infoText = `
  Hi ${name}, ${ucapan()}

  ⊰───『 *U S E R* 』───⊱
  ◈ *Name:* ${name}
  ◈ *Role:* ${role}
  ◈ *Level:* ${level}
  ◈ *Xp:* ${exp}

  ⊰───『 *I N F O* 』───⊱
  ◈ *Reply with the number*
  ◈ *to get respected Menu*

  ⊰───『 *M E N U* 』───⊱
  ◈ *1.* Bot Menu
  ◈ *2.* Owner Menu
  ◈ *3.* Group Menu
  ◈ *4.* Fun Menu
  ◈ *5.* Downloader Menu
  ◈ *6.* Game Menu
  ◈ *7.* Logo Menu
  ◈ *8.* Sticker Menu
  ◈ *9.* Audio Menu
  ◈ *10.* Levels Menu
  ◈ *11.* Tools Menu
  ◈ *12.* Islamic Menu` 
;

const { result, key, timeout } = await conn.sendMessage(m.chat, { image: { url: './Assets/OSGenieLogo.png' }, caption: infoText.trim(),  gifPlayback: true,
gifAttribution: 0})

// Save the menu options to gurumenu
conn.gurumenu[m.sender] = {
  result,
  key,
  timeout: setTimeout(() => {
    delete conn.gurumenu[m.sender];
}, 150 * 1000),
};
};


handler.before = async (m, { conn, isAdmin }) => {
  conn.gurumenu = conn.gurumenu ? conn.gurumenu : {};
  if (m.isBaileys || !(m.sender in conn.gurumenu)) return;
  const { result, key, timeout } = conn.gurumenu[m.sender];
  if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
  const choice = m.text.trim();
  
  let glb = global.db.data.users
 let usrs = glb[m.sender]
 let tag = `@${m.sender.split("@")[0]}`
 let mode = global.opts["self"] ? "Private" : "Public"
 
 let {
age,
exp,
limit,
level,
role,
registered,
credit
 } = glb[m.sender]
 let {
min,
xp,
max
 } = xpRange(level, global.multiplier)
 let name = await conn.getName(m.sender)

 let groupmenu
 let ownermenu
 let botmenu 
 if (!isAdmin) {
  groupmenu = ownermenu = botmenu = `Hi ${name}, Sorry But This Menu For Admins Only`

} else {
  groupmenu = `
 ✦ ───『 *Group Menu* 』─── ✦
 
◈ /getbio <@tag/reply>  Ⓛ
◈ /Setdesc <text>
◈ /setname <text>
◈ /add
◈ /delete
◈ /delwarn @user
◈ /demote (@tag)
◈ /infogp
◈ /hidetag
◈ /invite <917xxx>
◈ /kick @user
◈ /link
◈ /poll question|option|option
◈ /profile
◈ /promote
◈ /resetlink
◈ /setbye <text>
◈ /group *open/close*
◈ /setwelcome <text>
◈ /simulate <event> @user
◈ /staff
◈ /tagall
◈ /totag
◈ /warn @user
◈ /warns
`
ownermenu = `
✦ ───『 *Owner Menu* 』─── ✦

◈ /addprem <@tag>
◈ /addowner @user
◈ /allow <@tag>
◈ /HEROKU
◈ /ban @user
◈ /banchat
◈ /tx
◈ /broadcastgroup <text>
◈ /bcgc <text>
◈ /cleartmp
◈ /delexpired
◈ /delprem @user
◈ /removeowner @user
◈ /setppbotfull
◈ /getplugin <name file>
◈ /getfile <name file>
◈ /join <chat.whatsapp.com> <dias>
◈ /reset <54xxx>
◈ /resetprefix
◈ /restart
◈ /.setprefix
◈ /.setprefix [symbol]
◈ /unban @user
◈ /unbanchat
◈ /update
◈ /config
◈ /listban
◈ /deleteplugin <name>
`

botmenu = `
 ✦ ───『 *Bot Menu* 』─── ⚝
 ◈ /ping
 ◈ /runtime
 ◈ /script
 ◈ /server
 ◈ /blocklist
 ◈ /alive
 ◈ /info
 ◈ /owner
 ◈ /totalfeature
 ◈ /list
 ◈ /cr7
 ◈ /ppcouple
 ◈ /ppcp
 ◈ /pinterest
 ◈ /reg <name.age>
 ◈ /mysn
 ◈ /unreg 
 `
}

let funmenu = `
✦ ───『 *Fun Menu* 』─── ✦

◈ ${level >= 5 ? "⌈🔓⌋ /dog" : "⌈🔒⌋ ⭐ `Requires a level 5`"}
◈ ${level >= 15 ? "⌈🔓⌋ /bot" : "⌈🔒⌋ ⭐ `Requires a level 15`"}

⭐ Your current level is: *${level}*
`

let dlmenu = `

✦ ───『 *Downloader Menu* 』─── ✦

◈ ${level >= 5 ? "⌈🔓⌋ /wallpaper <query>" : "⌈🔒⌋ ⭐ `Requires a level 5`"}
◈ ${level >= 10 ? "⌈🔓⌋ /gdrive <url>" : "⌈🔒⌋ ⭐ `Requires a level 10`"}
◈ ${level >= 10 ? "⌈🔓⌋ /mediafire <url>" : "⌈🔒⌋ ⭐ `Requires a level 10`"}
◈ ${level >= 10 ? "⌈🔓⌋ /mega" : "⌈🔒⌋ ⭐ `Requires a level 10`"}
◈ ${level >= 12 ? "⌈🔓⌋ /play <query>" : "⌈🔒⌋ ⭐ `Requires a level 12`"}
◈ ${level >= 12 ? "⌈🔓⌋ /play2 <text>" : "⌈🔒⌋ ⭐ `Requires a level 12`"}
◈ ${level >= 12 ? "⌈🔓⌋ /playvid <text>" : "⌈🔒⌋ ⭐ `Requires a level 12`"}
◈ ${level >= 12 ? "⌈🔓⌋ /spotify" : "⌈🔒⌋ ⭐ `Requires a level 12`"}
◈ ${level >= 15 ? "⌈🔓⌋ /facebook <url>" : "⌈🔒⌋ ⭐ `Requires a level 15`"}
◈ ${level >= 15 ? "⌈🔓⌋ /instagram" : "⌈🔒⌋ ⭐ `Requires a level 15`"}
◈ ${level >= 15 ? "⌈🔓⌋ /tiktok <url>" : "⌈🔒⌋ ⭐ `Requires a level 15`"}
◈ ${level >= 15 ? "⌈🔓⌋ /twitter <url>" : "⌈🔒⌋ ⭐ `Requires a level 15`"}
◈ ${level >= 15 ? "⌈🔓⌋ /ytmp3 <url>" : "⌈🔒⌋ ⭐ `Requires a level 15`"}
◈ ${level >= 15 ? "⌈🔓⌋ /ytsearch" : "⌈🔒⌋ ⭐ `Requires a level 15`"}
◈ ${level >= 15 ? "⌈🔓⌋ /ytmp4 <yt-link>" : "⌈🔒⌋ ⭐ `Requires a level 15`"}
◈ ${level >= 17 ? "⌈🔓⌋ /igstalk" : "⌈🔒⌋ ⭐ `Requires a level 17`"}
◈ ${level >= 17 ? "⌈🔓⌋ /tiktokstalk" : "⌈🔒⌋ ⭐ `Requires a level 17`"}

⭐ Your current level is: *${level}*
`

let gamemenu = `
✦ ───『 *Games Menu* 』─── ✦

◈ ${level >= 3 ? "⌈🔓⌋ /ppt <rock/paper/scissors>" : "⌈🔒⌋ ⭐ `Requires a level 3`"}
◈ ${level >= 3 ? "⌈🔓⌋ /tictactoe <tag number>" : "⌈🔒⌋ ⭐ `Requires a level 3`"}
◈ ${level >= 3 ? "⌈🔓⌋ /delttt" : "⌈🔒⌋ ⭐ `Requires a level 3`"}
◈ ${level >= 5 ? "⌈🔓⌋ /guessflag" : "⌈🔒⌋ ⭐ `Requires a level 5`"}
◈ ${level >= 5 ? "⌈🔓⌋ /Maths <modes>" : "⌈🔒⌋ ⭐ `Requires a level 5`"}
◈ ${level >= 10 ? "⌈🔓⌋ /chess [from to]" : "⌈🔒⌋ ⭐ `Requires a level 10`"}
◈ ${level >= 10 ? "⌈🔓⌋ /chess delete" : "⌈🔒⌋ ⭐ `Requires a level 10`"}
◈ ${level >= 10 ? "⌈🔓⌋ /chess join" : "⌈🔒⌋ ⭐ `Requires a level 10`"}
◈ ${level >= 10 ? "⌈🔓⌋ /chess start" : "⌈🔒⌋ ⭐ `Requires a level 10`"}

⭐ Your current level is: *${level}*`
let logomenu = `
✦ ───『 *Maker Menu* 』─── ✦

◈ ${level >= 6 ? "⌈🔓⌋ /blur" : "⌈🔒⌋ ⭐ `Requires a level 6`"}
◈ ${level >= 6 ? "⌈🔓⌋ /tweet <comment>" : "⌈🔒⌋ ⭐ `Requires a level 6`"}
◈ ${level >= 6 ? "⌈🔓⌋ /ytcomment <comment>" : "⌈🔒⌋ ⭐ `Requires a level 6`"}
◈ ${level >= 10 ? "⌈🔓⌋ /logo list" : "⌈🔒⌋ ⭐ `Requires a level 10`"}
◈ ${level >= 10 ? "⌈🔓⌋ /logo <type> <text1_text2>" : "⌈🔒⌋ ⭐ `Requires a level 10`"}

⭐ Your current level is: *${level}*
`

let stickermenu = `
✦ ───『 *Sticker Menu* 』─── ⚝

◈ ${level >= 2 ? "⌈🔓⌋ /sticker" : "⌈🔒⌋ ⭐ `Requires a level 2`"}
◈ ${level >= 2 ? "⌈🔓⌋ /toimg <sticker>" : "⌈🔒⌋ ⭐ `Requires a level 2`"}
◈ ${level >= 2 ? "⌈🔓⌋ /tovid" : "⌈🔒⌋ ⭐ `Requires a level 2`"}
◈ ${level >= 2 ? "⌈🔓⌋ /smaker" : "⌈🔒⌋ ⭐ `Requires a level 2`"}
◈ ${level >= 5 ? "⌈🔓⌋ /ttp" : "⌈🔒⌋ ⭐ `Requires a level 5`"}
◈ ${level >= 5 ? "⌈🔓⌋ /ttp2" : "⌈🔒⌋ ⭐ `Requires a level 5`"}
◈ ${level >= 5 ? "⌈🔓⌋ /ttp3" : "⌈🔒⌋ ⭐ `Requires a level 5`"}
◈ ${level >= 5 ? "⌈🔓⌋ /ttp4" : "⌈🔒⌋ ⭐ `Requires a level 5`"}
◈ ${level >= 5 ? "⌈🔓⌋ /ttp5" : "⌈🔒⌋ ⭐ `Requires a level 5`"}
◈ ${level >= 5 ? "⌈🔓⌋ /attp" : "⌈🔒⌋ ⭐ `Requires a level 5`"}
◈ ${level >= 5 ? "⌈🔓⌋ /attp2" : "⌈🔒⌋ ⭐ `Requires a level 5`"}
◈ ${level >= 5 ? "⌈🔓⌋ /attp3" : "⌈🔒⌋ ⭐ `Requires a level 5`"}
◈ ${level >= 7 ? "⌈🔓⌋ /emojimix <emoji+emoji>" : "⌈🔒⌋ ⭐ `Requires a level 7`"}
◈ ${level >= 7 ? "⌈🔓⌋ /take <name>|<author>" : "⌈🔒⌋ ⭐ `Requires a level 7`"}
◈ ${level >= 7 ? "⌈🔓⌋ /getsticker" : "⌈🔒⌋ ⭐ `Requires a level 7`"}
◈ ${level >= 7 ? "⌈🔓⌋ /telesticker <link>" : "⌈🔒⌋ ⭐ `Requires a level 7`"}

⭐ Your current level is: *${level}*
`

let audiomenu = `
✦ ───『 *Audio Menu* 』─── ✦

◈ ${level >= 12 ? "⌈🔓⌋ /bass [vn]" : "⌈🔒⌋ ⭐ `Requires a level 12`"}
◈ ${level >= 12 ? "⌈🔓⌋ /blown [vn]" : "⌈🔒⌋ ⭐ `Requires a level 12`"}
◈ ${level >= 12 ? "⌈🔓⌋ /deep [vn]" : "⌈🔒⌋ ⭐ `Requires a level 12`"}
◈ ${level >= 12 ? "⌈🔓⌋ /earrape [vn]" : "⌈🔒⌋ ⭐ `Requires a level 12`"}
◈ ${level >= 12 ? "⌈🔓⌋ /fast [vn]" : "⌈🔒⌋ ⭐ `Requires a level 12`"}
◈ ${level >= 12 ? "⌈🔓⌋ /fat [vn]" : "⌈🔒⌋ ⭐ `Requires a level 12`"}
◈ ${level >= 12 ? "⌈🔓⌋ /nightcore [vn]" : "⌈🔒⌋ ⭐ `Requires a level 12`"}
◈ ${level >= 12 ? "⌈🔓⌋ /reverse [vn]" : "⌈🔒⌋ ⭐ `Requires a level 12`"}
◈ ${level >= 12 ? "⌈🔓⌋ /robot [vn]" : "⌈🔒⌋ ⭐ `Requires a level 12`"}
◈ ${level >= 12 ? "⌈🔓⌋ /slow [vn]" : "⌈🔒⌋ ⭐ `Requires a level 12`"}
◈ ${level >= 12 ? "⌈🔓⌋ /smooth [vn]" : "⌈🔒⌋ ⭐ `Requires a level 12`"}
◈ ${level >= 12 ? "⌈🔓⌋ /tupai [vn]" : "⌈🔒⌋ ⭐ `Requires a level 12`"}

⭐ Your current level is: *${level}*`

// let economy = `
// ✦ ───『 *economy* 』─── ⚝
// ◈ .addgold <@user>
// ◈ .addxp <@user>
// ◈ .bank
// ◈ .buych
// ◈ .cock-fight <amount>
// ◈ .buy
// ◈ .buyall
// ◈ .daily
// ◈ .deposit
// ◈ .gamble <amount> <color(red/black)>
// ◈ .give credit [amount] [@tag]
// ◈ .levelup
// ◈ .rank
// ◈ .rob
// ◈ .roulette <amount> <color(red/black)>
// ◈ .wallet
// ◈ .withdraw
// ◈ .work
// ╰──────────⳹`

let levels = `
✦ ───『 *Levels Menu* 』─── ✦

◈ ⌈🔓⌋ /levelup
◈ ⌈🔓⌋ /rank

⭐ Your current level is: *${level}*
`

let toolsmenu = `
✦ ───『 *Tools Menu* 』─── ✦

◈ ${level >= 3 ? "⌈🔓⌋ /dice" : "⌈🔒⌋ ⭐ `Requires a level 3`"}
◈ ${level >= 5 ? "⌈🔓⌋ /cal <equation>" : "⌈🔒⌋ ⭐ `Requires a level 5`"}
◈ ${level >= 6 ? "⌈🔓⌋ /hdr" : "⌈🔒⌋ ⭐ `Requires a level 6`"}
◈ ${level >= 8 ? "⌈🔓⌋ /style <key> <text>" : "⌈🔒⌋ ⭐ `Requires a level 8`"}
◈ ${level >= 9 ? "⌈🔓⌋ /length <amount>" : "⌈🔒⌋ ⭐ `Requires a level 9`"}
◈ ${level >= 9 ? "⌈🔓⌋ /carbon <code>" : "⌈🔒⌋ ⭐ `Requires a level 9`"}
◈ ${level >= 10 ? "⌈🔓⌋ /google" : "⌈🔒⌋ ⭐ `Requires a level 10`"}
◈ ${level >= 10 ? "⌈🔓⌋ /define <word>" : "⌈🔒⌋ ⭐ `Requires a level 10`"}
◈ ${level >= 12 ? "⌈🔓⌋ /readmore <text1>|<text2>" : "⌈🔒⌋ ⭐ `Requires a level 12`"}
◈ ${level >= 12 ? "⌈🔓⌋ /tinyurl <link>" : "⌈🔒⌋ ⭐ `Requires a level 12`"}
◈ ${level >= 12 ? "⌈🔓⌋ /shorten <link>" : "⌈🔒⌋ ⭐ `Requires a level 12`"}
◈ ${level >= 12 ? "⌈🔓⌋ /wa" : "⌈🔒⌋ ⭐ `Requires a level 12`"}
◈ ${level >= 15 ? "⌈🔓⌋ /qr <text>" : "⌈🔒⌋ ⭐ `Requires a level 15`"}
◈ ${level >= 15 ? "⌈🔓⌋ /readqr" : "⌈🔒⌋ ⭐ `Requires a level 15`"}
◈ ${level >= 15 ? "⌈🔓⌋ /ss <url>" : "⌈🔒⌋ ⭐ `Requires a level 15`"}
◈ ${level >= 15 ? "⌈🔓⌋ /ssf <url>" : "⌈🔒⌋ ⭐ `Requires a level 15`"}
◈ ${level >= 18 ? "⌈🔓⌋ /tourl" : "⌈🔒⌋ ⭐ `Requires a level 18`"}
◈ ${level >= 18 ? "⌈🔓⌋ /translate <lang> <text>" : "⌈🔒⌋ ⭐ `Requires a level 18`"}
◈ ${level >= 19 ? "⌈🔓⌋ /wikipedia" : "⌈🔒⌋ ⭐ `Requires a level 19`"}
◈ ${level >= 20 ? "⌈🔓⌋ /tomp3" : "⌈🔒⌋ ⭐ `Requires a level 20`"}
◈ ${level >= 20 ? "⌈🔓⌋ /toav" : "⌈🔒⌋ ⭐ `Requires a level 20`"}
◈ ${level >= 20 ? "⌈🔓⌋ /tts <lang> <task>" : "⌈🔒⌋ ⭐ `Requires a level 20`"}
◈ ${level >= 30 ? "⌈🔓⌋ /imdb" : "⌈🔒⌋ ⭐ `Requires a level 30`"}
◈ ${level >= 30 ? "⌈🔓⌋ /itunes" : "⌈🔒⌋ ⭐ `Requires a level 30`"}
◈ ${level >= 30 ? "⌈🔓⌋ /lyrics" : "⌈🔒⌋ ⭐ `Requires a level 30`"}
◈ ${level >= 35 ? "⌈🔓⌋ /shazam" : "⌈🔒⌋ ⭐ `Requires a level 35`"}
◈ ${level >= 45 ? "⌈🔓⌋ /removebg" : "⌈🔒⌋ ⭐ `Requires a level 45`"}
◈ ${level >= 60 ? "⌈🔓⌋ /readvo" : "⌈🔒⌋ ⭐ `Requires a level 60`"}

⭐ Your current level is: *${level}*`

// let Aimenu = `
// ✦ ───『 *AI* 』─── ⚝
// ◈ .bing
// ◈ .dalle
// ◈ .chatgpt
// ◈ .toanime
// ◈ .gitagpt
// ◈ .tocartoon
// ◈ .ai
// ◈ .bard
// ◈ .alexa
// ◈ .bingimg
// ◈ .gemini
// ╰──────────⳹
// `
let islamicmenu = `
✦ ───『 *Islamic Menu* 』─── ✦

◈ ⌈🔓⌋ /quran [surah_number|surah_name]

⭐ Your current level is: *${level}*`

  if (choice === "1") {
      await conn.sendMessage(m.chat, { image: { url: './Assets/OSGenieLogo.png' },
      caption: botmenu
    } );
    } else if (choice === "2") {
      await conn.sendMessage(m.chat, { image: { url: './Assets/OSGenieLogo.png' },
      caption: ownermenu
    } );
    } else if (choice === "3") {
      await conn.sendMessage(m.chat, { image: { url: './Assets/OSGenieLogo.png' },
      caption: groupmenu
    } );
    } else if (choice === "4") {
      await conn.sendMessage(m.chat, { image: { url: './Assets/OSGenieLogo.png' },
      caption: funmenu
    } );
    } else if (choice === "5") {
      await conn.sendMessage(m.chat, { image: { url: './Assets/OSGenieLogo.png' },
      caption: dlmenu
    } );
    } else if (choice === "6") {
      await conn.sendMessage(m.chat, { image: { url: './Assets/OSGenieLogo.png' },
      caption: gamemenu
    } );
    } else if (choice === "7") {
      await conn.sendMessage(m.chat, { image: { url: './Assets/OSGenieLogo.png' },
      caption: logomenu
    } );
    } else if (choice === "8") {
      await conn.sendMessage(m.chat, { image: { url: './Assets/OSGenieLogo.png' },
      caption: stickermenu
    } );
    } else if (choice === "9") {
      await conn.sendMessage(m.chat, { image: { url: './Assets/OSGenieLogo.png' },
      caption: audiomenu
    } );
    } else if (choice === "10") {
      await conn.sendMessage(m.chat, { image: { url: './Assets/OSGenieLogo.png' },
      caption: levels
    } );
    } else if (choice === "11") {
      await conn.sendMessage(m.chat, { image: { url: './Assets/OSGenieLogo.png' },
      caption: toolsmenu
    } );
    } else if (choice === "12") {
      await conn.sendMessage(m.chat, { image: { url: './Assets/OSGenieLogo.png' },
      caption: islamicmenu
    } );
    } else {
      m.reply('Invalid choice. Please reply with a valid number.');
    }
};


handler.help = ["menu"];
handler.tags = ["main"];
handler.command = /^(menu)$/i;
handler.limit = true;
export default handler;



function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
 }
 
 const more = String.fromCharCode(8206)
 const readMore = more.repeat(4001)
 
 function clockString(ms) {
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
  return [h, " H ", m, " M ", s, " S "].map(v => v.toString().padStart(2, 0)).join("")
 }
 
 function clockStringP(ms) {
  let ye = isNaN(ms) ? "--" : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? "--" : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
  return [ye, " *Years 🗓️*\n", mo, " *Month 🌙*\n", d, " *Days ☀️*\n", h, " *Hours 🕐*\n", m, " *Minute ⏰*\n", s, " *Second ⏱️*"].map(v => v.toString().padStart(2, 0)).join("")
 }
 
 function ucapan() {
  const time = moment.tz("Africa/Cairo").format("HH")
  let res = "Good morning ☀️"
  if (time >= 4) {
   res = "Good Morning 🌄"
  }
  if (time >= 10) {
   res = "Good Afternoon ☀️"
  }
  if (time >= 15) {
   res = "Good Afternoon 🌇"
  }
  if (time >= 18) {
   res = "Good Night 🌙"
  }
  return res
 }

