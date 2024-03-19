import fs from 'fs'
import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix: _p }) => {
    let img = "https://avatars.githubusercontent.com/u/106463398?v=4"
let info = `*BOT ACTIVE*`
await conn.reply(m.chat, "All is good")
}
handler.customPrefix = /^(tes|tess|test)$/i
handler.command = new RegExp

export default handler