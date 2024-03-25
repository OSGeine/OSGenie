// import * as fs from 'fs'
// let handler = async (m, { conn, args, usedPrefix, command }) => {
//     conn.wordly = conn.wordly ? conn.wordly : {}

//     let id = m.chat

//     if (id in conn.wordly) return conn.reply(m.chat, '⚠️ There are still unanswered questions in this chat', conn.wordly[id][0])

//     let words = ["apple", "banana", "orange", "mango", "pineapple"]; // List of words for the game
//     // let words = loadWordsFromFile('./words.json'); // Load words from external JSON file
//     // if (!words || words.length === 0) {
//     //     return conn.reply(m.chat, 'Failed to load words for the game. Please try again later.', m)
//     // }
//     let wordIndex = Math.floor(Math.random() * words.length); // Choose a random word index
//     let targetWord = words[wordIndex]; // Get the target word
//     let hiddenWord = "_".repeat(targetWord.length); // Initialize hidden word with underscores

//     let replyMessage = `--WORDLY GAME--\n${hiddenWord} (${targetWord.length})`; // Initial message with hidden word

//     conn.wordly[id] = [
//         await conn.reply(m.chat, replyMessage), // Send the initial message
//         targetWord, // Store the target word for reference
//         hiddenWord.split(''), // Convert hidden word to array for easy manipulation
//         new Array(targetWord.length).fill('❎'), // Array to store player's guesses (default to ❎)
//         setTimeout(() => {
//             if (conn.wordly[id]) conn.reply(m.chat, `⏳ Time is over!`, conn.wordly[id][0])
//             delete conn.wordly[id]
//         }, 60000) // Set a timeout of 5 seconds
//     ]
// }

// handler.before = async function (m) {
//     // if (!m.text || m.isGroup) return // Only process messages in private chats
//     let id = m.chat
//     if (!m.quoted || !m.quoted.fromMe || !/^--WORDLY GAME--\n/.test(m.quoted.text)) return // Check if quoted message is from the Wordly game
//     if (!(id in this.wordly)) return this.reply(m.chat, 'The game is over', m) // Check if game is active in the chat

//     let wordlyData = this.wordly[id]
//     let targetWord = wordlyData[1]
//     let hiddenWordArr = wordlyData[2]
//     let playerGuesses = wordlyData[3]

//     let playerGuess = m.text.toLowerCase().trim() // Convert player's guess to lowercase
//     if (playerGuess === targetWord) { // If player's guess matches the target word
//         clearTimeout(wordlyData[4]) // Clear the timeout
//         delete this.wordly[id] // Delete game data for this chat
//         return this.reply(m.chat, `🎉 Congratulations! You've guessed the word correctly!`, m)
//     }

//     // Process player's guess
//     let feedback = playerGuess.split('').map((letter, index) => {
//         if (letter === targetWord[index]) return '🟩' // Correct letter in correct position
//         else if (targetWord.includes(letter)) return '🟧' // Correct letter in wrong position
//         else return '❎' // Incorrect letter
//     })

//     // Update hidden word with correct guesses
//     hiddenWordArr = hiddenWordArr.map((letter, index) => feedback[index] === '🟩' ? targetWord[index] : letter)

//     // Update player's guesses
//     playerGuesses = playerGuesses.map((prevGuess, index) => feedback[index])

//     // Send updated message with hidden word and feedback
//     let replyMessage = `--WORDLY GAME--\n${hiddenWordArr.join(' ')} (${targetWord.length})\n\nYour Guess: ${playerGuess}\nFeedback: ${playerGuesses.join(' ')}`

//     // Send the updated message
//     this.reply(m.chat, replyMessage, m)

//     // Check if player has guessed the word
//     if (hiddenWordArr.join('') === targetWord) {
//         clearTimeout(wordlyData[4]) // Clear the timeout
//         delete this.wordly[id] // Delete game data for this chat
//         return this.reply(m.chat, `🎉 Congratulations! You've guessed the word correctly!`, m)
//     }
// }

// handler.help = ['wordly']
// handler.tags = ['game']
// handler.command = ['wordly']

// export default handler

// function loadWordsFromFile(filePath) {
//     try {
//         let data = fs.readFileSync(filePath);
//         return JSON.parse(data);
//     } catch (error) {
//         console.error("Error loading words from file:", error);
//         return null;
//     }
// }