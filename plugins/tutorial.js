const handler = async (m, { conn }) => {
    m.reply(`Hi, thank you for using OSGenie bot 😊`, m.sender);
    
    const firstMsg = setTimeout(() => conn.sendMessage(m.sender, {
        text: `To view the list of commands that I am running, all you have to do is type *"/list"*.`
    }), 500)
    const secMsg = setTimeout(() => conn.sendMessage(m.sender, {
        text: `Please write the command once, and if I do not respond, please inform the developers about it`
    }), 1000)
    const thrdMsg = setTimeout(() => conn.sendContact(m.sender, ["966530740094@s.whatsapp.net", "Dr.Osman"]), 1500)
    
};

handler.help = ['help'];
handler.tags = ['group'];
handler.command = ['help'];

export default handler;