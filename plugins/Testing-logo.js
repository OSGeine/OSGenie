let handler = async (m, { conn, text, args, usedPrefix, command }) => {

    conn.sendMessage(m.chat,{ image: {url: "https://textpro.me/images/user_image/2024/03/6605eca49caf6.jpg"}})

}

handler.command = /^(testlogo)$/i;

export default handler;