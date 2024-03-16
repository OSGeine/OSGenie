let sessionData = {};

const handler = async (m, { conn }) => {
    const [_, session] = m.text.split(" ");
    const chatID = m.chat.id;

    if (!session || isNaN(parseInt(session))) {
        return conn.reply(m.chat, 'Please specify a valid session number.', m);
    }

    const sessionID = parseInt(session);

    if (!sessionData[sessionID]) {
        sessionData[sessionID] = {
            player1: null,
            player2: null,
            lastWord: '',
            wordCount: 0,
            timer: 60
        };
    }

    const sessionInfo = sessionData[sessionID];

    if (!sessionInfo.player1) {
        sessionInfo.player1 = m.sender;
        return conn.reply(m.chat, 'You joined the game as player 1. Waiting for player 2...', m);
    }

    if (!sessionInfo.player2) {
        sessionInfo.player2 = m.sender;
        return startGame(sessionID, conn);
    }
};

const startGame = async (sessionID, conn) => {
    const sessionInfo = sessionData[sessionID];

    const { player1, player2 } = sessionInfo;

    conn.sendMessage(sessionID, `Game started between ${player1} and ${player2}! First player, please enter a word.`);

    conn.onMessage(sessionID, async (m) => {
        if (m.sender === conn.user.jid) return;

        const sessionInfo = sessionData[sessionID];

        if (!sessionInfo) return; // Session not found

        const { player1, player2, lastWord, wordCount, timer } = sessionInfo;

        if (wordCount % 2 === 0 && m.sender === player1) {
            handleTurn(sessionID, m.text, lastWord, wordCount, timer, conn);
        } else if (wordCount % 2 !== 0 && m.sender === player2) {
            handleTurn(sessionID, m.text, lastWord, wordCount, timer, conn);
        }
    });
};

const handleTurn = (sessionID, word, lastWord, wordCount, timer, conn) => {
    const isValidWord = (word) => {
        return /^[a-zA-Z]+$/.test(word);
    };

    if (!isValidWord(word)) {
        return conn.sendMessage(sessionID, 'Please enter a valid word.');
    }

    if (wordCount > 0 && word[0].toLowerCase() !== lastWord.slice(-1).toLowerCase()) {
        endGame(sessionID, `${m.sender} wins! The word must start with the last letter of the previous word.`);
        return;
    }

    sessionData[sessionID].lastWord = word;
    sessionData[sessionID].wordCount++;

    if (sessionData[sessionID].wordCount % 5 === 0 && timer > 15) {
        sessionData[sessionID].timer -= 15; // Decrease timer every 5 words by 15 seconds
    }

    setTimeout(() => {
        endGame(sessionID, `${m.sender} wins! They missed the timer.`);
    }, sessionData[sessionID].timer * 1000);

    if (wordCount % 2 === 0) {
        conn.sendMessage(sessionID, 'Second player, it\'s your turn. Enter a word that starts with the last letter of the previous word.');
    } else {
        conn.sendMessage(sessionID, 'First player, it\'s your turn. Enter a word that starts with the last letter of the previous word.');
    }
};

const endGame = (sessionID, message) => {
    sessionData[sessionID] = null;
    return conn.sendMessage(sessionID, message);
};

handler.help = ['lastletter <session_number>', 'Starts a last letter game with the specified session number.'];
handler.tags = ['games'];
handler.command = /^lastletter\s\d+$/i;

export default handler;
