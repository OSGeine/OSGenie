import { xpRange } from '../lib/levelling.js';
import Canvacord from 'canvacord';

let handler = async (m, { conn }) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

  if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`;

  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './Assets/profile.jpg');
  let user = global.db.data.users[who];
  let { exp, level, role } = global.db.data.users[who];
  let { min, xp } = xpRange(user.level, global.multiplier);
  let username = conn.getName(who);
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

  let crxp = exp - min
  let customBackground = './Assets/rankbg.jpg'
  let requiredXpToLevelUp = xp
//.setBackground('IMAGE', customBackground)
  const card = await new Canvacord.Rank()
    .setAvatar(pp)
    .setRank(roleId, 'Rank')
    .setLevel(level, 'Level')
    .setCurrentXP(crxp)
    .setRequiredXP(requiredXpToLevelUp)
    .setProgressBar('#079992', 'COLOR') // Set progress bar color here
    .setDiscriminator(who.substring(3, 7))
    .setCustomStatusColor('#ffffff')
    .setLevelColor('#FFFFFF', '#FFFFFF')
    .setOverlay('#3d3d3d')
    .setUsername(username)
    .setBackground('COLOR', '#4b4b4b')
    .renderEmojis(true)
    .build();
  

  const str = `🏮 *Username:* ${username}\n\n⭐ *Experience:* ${crxp} / ${requiredXpToLevelUp}\n\n🏅 *Rank:* *${role}*`

  try {
    conn.sendFile(m.chat, card, 'rank.jpg', str, m, false, { mentions: [who] });
    m.react('✅');
  } catch (error) {
    console.error(error);
  }
}

handler.help = ['rank'];
handler.tags = ['economy'];
handler.command = ['rank'];

export default handler;
