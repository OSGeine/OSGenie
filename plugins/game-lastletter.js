let sessions = {}

let handler = async (m, { conn, text }) => {
    let session = sessions[m.chat]
    if (!session) {
        if (/^\/lastletter\s+\d+$/i.test(text)) {
            // Start a new game session
            let sessionId = text.trim().split(' ')[1]
            sessions[m.chat] = {
                id: sessionId,
                words: [],
                timer: 60, // Starting with 60 seconds
                interval: null
            }
            await conn.sendMessage(m.chat, `Game session ${sessionId} started! You have 60 seconds for the first word.`, m)
            // Set up the timer
            session = sessions[m.chat]
            session.interval = setInterval(() => {
                session.timer -= session.words.length >= 5 ? 15 : 0
                session.timer = session.timer < 15 ? 15 : session.timer // Minimum 15 seconds
                if (session.timer <= 0) {
                    clearInterval(session.interval)
                    conn.sendMessage(m.chat, `Time's up! Player 2 wins!`, m)
                    delete sessions[m.chat] // End the session
                }
            }, 1000)
        } else {
            await conn.sendMessage(m.chat, 'To start a game, type /lastletter followed by a session number.', m)
        }
    } else {
        // Game logic for ongoing session
        let lastWord = session.words.slice(-1)[0] || ''
        let lastLetter = lastWord.slice(-1)
        if (text.toLowerCase().startsWith(lastLetter)) {
            session.words.push(text.toLowerCase())
            await conn.sendMessage(m.chat, `Good job! Next word starts with '${text.slice(-1)}'. Timer: ${session.timer} seconds.`, m)
        } else {
            await conn.sendMessage(m.chat, `Wrong start letter! Player 1 wins!`, m)
            clearInterval(session.interval)
            delete sessions[m.chat] // End the session
        }
    }
}

handler.help = ['lastletter']
handler.tags = ['fun']
handler.command = /^\/lastletter(\s+\d+)?$/i

export default handler;
