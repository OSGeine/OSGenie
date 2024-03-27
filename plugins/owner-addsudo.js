import * as fs from 'fs';
let handler = async (m, { conn, text }) => {
    let who;
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
    } else {
        who = m.chat;
    }
    let name = await conn.getName(m.quoted.sender)
    if (!who) throw 'Tag the person you want to make an Sudo!';
    // Function to write a number to a text file
    function writeNumberToFile(outputFilePath, number) {
        // Convert the number to a string
        const numberString = String(number);

        // Write the number to the file
        fs.appendFile(outputFilePath, numberString + '\n', 'utf8', err => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('Number added to file successfully!');
        });
    }

    const arrayToFind = [ who.split('@')[0], name, true ];
    const found = global.owner.some(item => 
        item.length === arrayToFind.length && 
        item.every((value, index) => value === arrayToFind[index])
    );

    const outputFilePath = 'number.txt';
    if (found) throw 'This person is already an sudo!';
    global.owner.push([who.split('@')[0], name, true]);
    writeNumberToFile(outputFilePath, who.split('@')[0]);
    const caption = `Now @${who.split('@')[0]} has been made an Sudo!`;
    await conn.reply(m.chat, caption, m, {
        mentions: conn.parseMention(caption)
    });
}
handler.help = ['addowner @user']
handler.tags = ['owner']
handler.command = /^(add|give|-)(owner|sudo)$/i;
handler.owner = true

export default handler;
