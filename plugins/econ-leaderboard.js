import { areJidsSameUser } from '@whiskeysockets/baileys';
import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';
import { canLevelUp, xpRange } from '../lib/levelling.js';
import { Font, LeaderboardBuilder } from "canvacord";

let handler = async (m, { conn, args, usedPrefix, participants }) => {
  let users = Object.entries(global.db.data.users).map(([key, value]) => {
    return { ...value, jid: key };
  });
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let user = global.db.data.users[who];
  if (!(who in global.db.data.users)) throw '✳️ The user is not found in my database';
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './Guru.jpg');
  let about = (await conn.fetchStatus(who).catch(console.error))?.status || '';
  let { name, exp, credit, lastclaim, registered, regTime, age, level, role, warn } = global.db.data.users[who];
  let { min, xp, max } = xpRange(user.level, global.multiplier);
  let username = conn.getName(who);
  let math = max - xp;
  let prem = global.prems.includes(who.split('@')[0]);
  let sn = createHash('md5').update(who).digest('hex');

  let totalgold;
  totalgold = Object.entries(global.db.data.users).map(([key, value]) => {
    const user = { ...value, jid: key };
    user.tg = user.credit + user.bank;
    return user.tg;
  });


  let sortedExp = users.map(toNumber('exp')).sort(sort('exp'));
  let sortedLim = users.map(toNumber('credit')).sort(sort('credit'));
  let sortedLevel = users.map(toNumber('level')).sort(sort('level'));
  let sortedBank = users.map(toNumber('bank')).sort(sort('bank'));
  let sortedRank = users.map(toNumber('role')).sort(sort('role'));

  let usersExp = sortedExp.map(enumGetKey);
  let usersLim = sortedLim.map(enumGetKey);
  let usersLevel = sortedLevel.map(enumGetKey);
  let usersBank = sortedBank.map(enumGetKey);
  let usersRank = sortedRank.map(enumGetKey);

  let len = args[0] && args[0].length > 0 ? Math.min(50, Math.max(parseInt(args[0]), 5)) : Math.min(10, sortedExp.length);
//   let text = `
// 👑 *GLOBAL LEADERBOARD* 👑

// ${sortedExp.slice(0, len).map(({ jid, exp, level, role }, i) => {
//   // let totalgold = users.find(u => u.jid === jid).credit + users.find(u => u.jid === jid).bank;
//   let user = global.db.data.users[jid];
//   let username = user.name;
//   let pp = conn.profilePictureUrl(user, 'image').catch(_ => './Assets/profile.jpg');
//   return `*#${i + 1}.*
// *👑 Username:* ${username}
// *🌟 Experience:* ${exp}
// *🏆 Rank:* ${role}
// *✨ Level:* ${level}
// `;
// }).join('\n\n\n')}
// *You are at ${usersExp.indexOf(m.sender) + 1} out of total ${usersExp.length} members*`
// .trim();

const allUsers = sortedExp.slice(0, len).map(({ jid, exp, level, role }, i) => {
  let user = global.db.data.users[jid];
  let username = user.name;
  let pp = './Assets/profile.jpg';
  let roleId
  switch (role) {
    case "Semi Junior":
      roleId = 0
      break;
    case "Junior":
      roleId = 1
      break;
    case "Semi Senior":
      roleId = 2
      break;
    case "Senior":
      roleId = 3
      break;
    case "Trainee Doctor":
      roleId = 4
      break;
    case "General Practitioner":
      roleId = 5
      break;
    case "Resident Doctor":
      roleId = 6
      break;
    case "Assistant Specialist":
      roleId = 7
      break;
    case "Specialist":
      roleId = 8
      break;
    case "Senior Specialist":
      roleId = 9
      break;
    case "Consultant":
      roleId = 10
      break;
    case "Senior Consultant":
      roleId = 11
      break;
    case "Prof":
      roleId = 12
      break;
  }
  return {
    avatar : pp,
    rank: i + 1,
    username: `#${jid.substring(3, 7)}`,
    displayName: username,
    xp: exp,
    level: level
  };
});

Font.loadDefault();

// generate image
const lb = new LeaderboardBuilder()
.setPlayers(allUsers)
.setBackground("./Assets/leaderboard-bg.jpg");
lb.setVariant("default");

const image = await lb.build({ format: "png" });

try {
  conn.sendFile(m.chat, image, 'leaderboard.jpg', `*You are at ${usersExp.indexOf(m.sender) + 1} out of total ${usersExp.length} members*`, m, false, { mentions: [who] });
  m.react('✅');
} catch (error) {
  console.error(error);
}
  console.log(allUsers)
};

handler.help = ['leaderboard'];
handler.tags = ['core'];
handler.command = ['leaderboard', 'lb'];

export default handler;

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property];
  else return (...args) => args[ascending & 1] - args[!ascending & 1];
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return { ...b[i], [property]: a[property] === undefined ? _default : a[property] };
  };
  else return a => a === undefined ? _default : a;
}

function enumGetKey(a) {
  return a.jid;
}
