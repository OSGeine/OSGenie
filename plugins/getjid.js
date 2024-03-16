const handler = async (m, { conn }) => {
    m.reply(`Your group jid is: ${m.chat}`);
};

handler.help = ['getjid'];
handler.tags = ['group'];
handler.command = ['getjid'];

export default handler;