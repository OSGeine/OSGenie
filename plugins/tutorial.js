const handler = async (m, { conn }) => {
    m.reply(`Hi, thank you for using OSGenie bot 😊`, m.sender);
    const asud = setTimeout(() => conn.sendMessage(m.sender, { audio: { url: "./Assets/mp3/alive.mp3" }, mimetype: 'audio/mp4' }), 100)

    const firstMsg = setTimeout(() => conn.sendMessage(m.sender, {
        text: `To view the list of commands that I am running, all you have to do is type *"/list"*.`
    }), 1100)
    const secMsg = setTimeout(() => conn.sendMessage(m.sender, {
        text: `Please write the command once, and if I do not respond, please inform the developers about it`
    }), 1600)
    const thrdMsg = setTimeout(() => conn.sendContact(m.sender, ["966530740094@s.whatsapp.net", "Dr.Osman"]), 2100)
    
};

handler.help = ['help'];
handler.tags = ['main'];
handler.command = ['help'];

export default handler;