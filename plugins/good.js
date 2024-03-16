// goodmorningbot.js

import * as cron from 'node-cron';

// Replace 'your_group_id' with the actual group ID where you want to send the message
const targetGroupId = '120363100535956262@g.us';

// Function to send the "Good morning" message
// const sendGoodMorningMessage = async (conn) => {
//     try {
//         const chatId = await conn.groupCreate(targetGroupId, 'Good morning! 🌞');
//         console.log(`Message sent to group ${chatId}`);
//     } catch (error) {
//         console.error(a'Error sending message:', error);
//     }
//     sendGoodMorningMessage(conn);
// };
function getRandomGreeting() {
    const greetings = [
        "اللهُمّ نسألك في هذا الصباح أن تجعل لنا نصيباً من سعة الرزق، وتيسير الأحوال، وقضاء الحوائج، واستجابة الدعاء، ورحمتك ومغفرتك وعفوك، صباحكم خير وبركة. 🌟",
        "أشرق الصّبح، فنظرت للسماء وتذكّرت عظمة الخالق، وآمنت بقدرته، يولج النّهار بالليل، ويولج الليل بالنّهار، فسبحان الله العظيم. 🌟",
        "عطّر الله صباحكم بالرضا، وألبسكم ثوب المغفرة، وأسكنكم جنة عرضها السماوات والأرض. 🌟",
        // Add more greetings here
    ];
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
}

cron.schedule('0 7 * * *', () => {
    const randomGreeting = getRandomGreeting();
    conn.sendMessage(targetGroupId, {
        text: randomGreeting
    })
});



// Export the handler
