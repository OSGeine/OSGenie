// Import any necessary modules or dependencies here

// Define the Last Letter game class
class LastLetterGame {
    constructor(playerX, playerO) {
        this.playerX = playerX
        this.playerO = playerO
        this.currentTurn = playerX // PlayerX starts the game
        this.words = [] // Array to store the words played in the game
        this.timer = 60 // Initial timer value set to 60 seconds
        this.wordCount = 0 // Counter to keep track of the number of words played
    }

    // Function to check if a word is valid based on game rules
    isValidWord(word) {
        if (this.words.length === 0) return true // First word is always valid
        const lastWord = this.words[this.words.length - 1]
        return lastWord[lastWord.length - 1].toLowerCase() === word[0].toLowerCase() // Check if the new word starts with the last letter of the previous word
    }

    // Function to handle a player's turn
    playWord(player, word) {
        if (this.currentTurn !== player) return false // Not the player's turn
        if (!this.isValidWord(word)) return false // Word does not follow game rules
        this.words.push(word) // Add the word to the list of words
        this.wordCount++ // Increment word count
        // Update timer based on word count
        if (this.wordCount > 4) {
            this.timer -= 15 // Decrease timer by 15 seconds if more than 4 words played
        }
        // Switch turns
        this.currentTurn = this.currentTurn === this.playerX ? this.playerO : this.playerX
        return true
    }
}

// Define the Last Letter game handler
let handler = async (m, { conn, usedPrefix, command, text }) => {
    conn.game = conn.game ? conn.game : {} // Initialize game object
    // Check if the player is already in a game
    if (Object.values(conn.game).find(room => room.id.startsWith('lastletter') && [room.game.playerX, room.game.playerO].includes(m.sender))) throw `✳️ You are still in the game. To restart the session, type: *${usedPrefix}delLastLetter*`
    if (!text) throw `✳️ Please enter a room number`
    let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true))
    if (room) {
        m.reply('✅ Mate found')
        room.playerO = m.sender
        room.state = 'PLAYING'
        let str = `Waiting for @${room.game.currentTurn.split('@')[0]} to start the game`
        await conn.reply(room.playerX, str, m, { mentions: conn.parseMention(str) })
        await conn.reply(room.playerO, str, m, { mentions: conn.parseMention(str) })
    } else {
        room = {
            id: 'lastletter-' + (+new Date),
            playerX: m.chat,
            playerO: '',
            game: new LastLetterGame(m.sender, ''),
            state: 'WAITING'
        }
        room.name = text || ''
        conn.reply(m.chat, `⏳ Expecting partner. Type the following command to accept:
▢ *${usedPrefix + command} ${text}*
🎁 Reward: *4999 XP*`, m, { mentions: conn.parseMention(text) })
        conn.game[room.id] = room
    }
}

// Define the Last Letter game plugin properties
handler.help = ['lastletter <room number>']
handler.tags = ['game']
handler.command = ['lastletter', 'llg']

// Define the function to handle timer logic
export async function before(m) {
    // Initialize variables
    let isSurrender = false
    this.game = this.game ? this.game : {}
    // Find the room and check if the game is in progress
    let room = Object.values(this.game).find(room => room.id && room.game && room.state && room.id.startsWith('lastletter') && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state === 'PLAYING')
    if (room) {
        // Check if the message is a valid word or surrender command
        if (!/^([a-zA-Z]+|surrender)$/i.test(m.text))
            return true
        isSurrender = !/^[a-zA-Z]+$/.test(m.text)
        // Check if it's the player's turn
        if (m.sender !== room.game.currentTurn) {
            if (!isSurrender)
                return true
        }
        // Check if the word is valid
        if (!isSurrender && !room.game.playWord(m.sender, m.text)) {
            m.reply('Invalid word. Please enter a word that starts with the last letter of the previous word.')
            return true
        }
        // Handle surrender
        if (isSurrender) {
            room.game.currentTurn = m.sender === room.game.playerX ? room.game.playerO : room.game.playerX
        }
        // Update timer based on word count
        if (room.game.wordCount > 4) {
            room.game.timer -= 15 // Decrease timer by 15 seconds if more than 4 words played
        }
        // Check if the game is over
        // Handle game over logic here (e.g., check for winner, update scores, etc.)
        // Send messages to players accordingly
        // Delete the game room if needed
        // Update player scores
    }
    return true
}

// Export the handler and timer function
export { handler, before }
