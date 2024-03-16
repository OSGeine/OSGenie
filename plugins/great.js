// greetingsbot.js

function getRandomGreeting() {
    const greetings = [
        "Hello there!",
        "Hi, how can I assist you?",
        "Greetings!",
        // Add more greetings here
    ];
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
}

const handler = async (m, { conn }) => {
    const randomGreeting = getRandomGreeting();
    m.reply(randomGreeting);
};

handler.help = ['greet'];
handler.tags = ['group'];
handler.command = ['greet'];

export default handler;
