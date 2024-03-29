import { createCanvas, loadImage, registerFont } from 'canvas';
import path from 'path';
import fs from 'fs';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    const avatar = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');
// Function to create the card
async function createCard(avatarURL, text, backgroundURL) {
    // Load fonts if needed
    // registerFont('path/to/font.ttf', { family: 'FontName' });

    // Create a canvas
    const canvas = createCanvas(300, 450); // 2/3 and 1/3 ratio
    const ctx = canvas.getContext('2d');

    // Draw background image for the 2/3 section
    const backgroundImage = await loadImage(backgroundURL);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height * 2 / 3);

    // Draw background color for the 1/3 section
    ctx.fillStyle = '#222222';
    ctx.fillRect(0, canvas.height * 2 / 3, canvas.width, canvas.height * 1 / 3);

    // Load user avatar
    const avatarImage = await loadImage(avatarURL);

    // Draw circular avatar
    const avatarSize = 100;
    ctx.save();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height * 5 / 6, avatarSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatarImage, canvas.width / 2 - avatarSize / 2, canvas.height * 5 / 6 - avatarSize / 2, avatarSize, avatarSize);
    ctx.restore();

    // Set text style
    ctx.fillStyle = '#ffffff'; // Text color
    ctx.font = '16px Arial'; // Font size and type
    ctx.textAlign = 'center';

    // Draw text in the 1/3 section
    ctx.fillText(text, canvas.width / 2, canvas.height * 23 / 24);

     // Save to a file
     const out = fs.createWriteStream(new URL('./card.png', import.meta.url));
     const stream = canvas.createPNGStream();
     stream.pipe(out);
     out.on('finish', () => console.log('The card has been created.'));

     setTimeout(() => {
        conn.sendMessage(m.chat, {image: {url: "./card.png"}, caption: 'Done ✅'})
     }, 2000)
}

const avatarURL = avatar;
const text = 'Dog Zangetation syndrome Mode ON';
const backgroundURL = './Assets/dog-zang.png';

createCard(avatarURL, text, backgroundURL);



}

handler.help = ["dog"];
handler.tags = ["fun"];
handler.command = /^(dog)$/i;
// handler.level = 10

export default handler