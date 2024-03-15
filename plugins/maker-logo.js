import * as mumaker from "mumaker";
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    // m.reply(
    //     "Hello, this is an experimental script that will be developed by Dr.Osman later !"
    // );
    if (!text) {
        m.reply(
            `📜 To use this command: \n\n ${usedPrefix}makelogo type Your_Text \n\n 📌 *Example:* ${usedPrefix}makelogo batman One_Two \n\n ❗ *Note:* Use "_" to separate words`
        );
        m.react("❎");
    }
    let types = [
        "sliced",
        "batman",
        "thunder",
        "magma",
        "glitch",
        "demon",
        "frozen",
        "ice",
        "typography",
        "foggy",
        "stone",
        "bear",
        "forest",
        "burger",
        "dragon",
        "pokemon",
        "natural",
        "shadow",
        "flowers",
        "wet_glass",
        "hacker",
        "3d_castle",
        "naruto",
        "quotes_natural",
        "birth_day"
    ];
    let newArray = types.map((element) => `» ${element}`);
    let message = `${newArray.join("\n")}`;
    if (text.toLowerCase() == "list") {
        m.reply(`
*Logo Types List*:

${message}`);
        m.react("📃");
    }
    if (args.length > 1) {
        let type = args[0].toLowerCase();
        let logoText = args[1].replace("_", " ");
        m.react("🕛");
        if (types.includes(type)) {
            let libLink;
            let library;
            switch (type) {
                case "sliced":
                    library = "textpro";
                    libLink =
                        "https://textpro.me/create-light-glow-sliced-text-effect-online-1068.html";
                    break;
                case "batman":
                    library = "textpro";
                    libLink =
                        "https://textpro.me/make-a-batman-logo-online-free-1066.html";
                    break;
                case "thunder":
                    library = "textpro";
                    libLink =
                        "https://textpro.me/create-thunder-text-effect-online-881.html";
                    break;
                case "magma":
                    library = "textpro";
                    libLink =
                        "https://textpro.me/create-a-magma-hot-text-effect-online-1030.html";
                    break;
                case "glitch":
                    library = "textpro";
                    libLink =
                        "https://textpro.me/create-impressive-glitch-text-effects-online-1027.html";
                    break;
                case "demon":
                    library = "textpro";
                    libLink =
                        "https://textpro.me/create-green-horror-style-text-effect-online-1036.html";
                    break;
                case "frozen":
                    library = "textpro";
                    libLink =
                        "https://textpro.me/create-realistic-3d-text-effect-frozen-winter-1099.html";
                    break;
                case "ice":
                    library = "textpro";
                    libLink =
                        "https://textpro.me/ice-cold-text-effect-862.html";
                    break;
                case "typography":
                    library = "textpro";
                    libLink =
                        "https://textpro.me/create-artistic-typography-online-1086.html";
                    break;
                case "foggy":
                    library = "textpro";
                    libLink =
                        "https://textpro.me/write-text-on-foggy-window-online-free-1015.html";
                    break;
                case "stone":
                    library = "textpro";
                    libLink =
                        "https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html";
                    break;
                case "bear":
                    library = "textpro";
                    libLink =
                        "https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html";
                    break;
                case "forest":
                    library = "textpro";
                    libLink =
                        "https://textpro.me/double-exposure-text-effect-black-white-976.html";
                    break;
                case "burger":
                    library = "textpro";
                    libLink =
                        "https://textpro.me/create-burger-3d-text-effect-1111.html";
                    break;
                case "dragon":
                    library = "textpro";
                    libLink =
                        "https://textpro.me/create-3d-dragon-scale-text-effect-online-1127.html";
                    break;
                case "pokemon":
                    library = "textpro";
                    libLink =
                        "https://textpro.me/create-pokemon-logo-style-text-effect-online-1134.html";
                    break;
                case "natural":
                    library = "textpro";
                    libLink =
                        "https://textpro.me/natural-leaves-text-effect-931.html";
                    break;
                case "shadow":
                    library = "textpro";
                    libLink =
                        "https://textpro.me/create-a-gradient-text-shadow-effect-online-1141.html";
                    break;
                case "flowers":
                    library = "photooxy";
                    libLink =
                        "https://photooxy.com/logo-and-text-effects/make-nature-3d-text-effects-364.html";
                    break;
                case "wet_glass":
                    library = "ephoto";
                    libLink =
                        "https://en.ephoto360.com/write-text-on-wet-glass-online-589.html";
                    break;
                case "hacker":
                    library = "ephoto";
                    libLink =
                        "https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html";
                    break;
                case "3d_castle":
                    library = "ephoto";
                    libLink =
                        "https://en.ephoto360.com/create-a-3d-castle-pop-out-mobile-photo-effect-786.html";
                    break;
                case "naruto":
                    library = "ephoto";
                    libLink =
                        "https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html";
                    break;
                case "birth_day":
                    library = "ephoto";
                    libLink =
                        "https://en.ephoto360.com/write-name-on-red-rose-birthday-cake-images-462.html";
                    break;
                case "quotes_natural":
                    library = "ephoto_quota";
                    libLink =
                        "https://en.ephoto360.com/create-typography-status-quotes-images-online-for-free-452.html";
                    break;
            }
            switch (library) {
                case "textpro":
                    await mumaker
                        .textpro(libLink, [`${logoText}`])
                        .then((data) =>
                            conn.sendMessage(m.chat, {
                                image: { url: `${data.image}` },
                                caption: "✅ Done",
                            })
                        )
                        .catch((err) => m.reply(err));
                    m.react("✅");

                    break;
                case "photooxy":
                    await mumaker
                        .photooxy(libLink, [`${logoText}`])
                        .then((data) =>
                            conn.sendMessage(m.chat, {
                                image: { url: `${data.image}` },
                                caption: "✅ Done",
                            })
                        )
                        .catch((err) => m.reply(err));
                    m.react("✅");

                    break;
                case "ephoto":
                    await mumaker
                        .ephoto(libLink, [`${logoText}`])
                        .then((data) =>
                            conn.sendMessage(m.chat, {
                                image: { url: `${data.image}` },
                                caption: "✅ Done",
                            })
                        )
                        .catch((err) => m.reply(err));
                    m.react("✅");
                    break;
                case "ephoto_quota":
                    const url = "https://api.quotable.io/random";
                    let getQuote = () => {
                        fetch(url)
                            .then((data) => data.json())
                            .then((item) => {
                                mumaker
                                    .ephoto(libLink, [
                                        `${logoText}`,
                                        `${item.content}`,
                                    ])
                                    .then((data) =>
                                        conn.sendMessage(m.chat, {
                                            image: { url: `${data.image}` },
                                            caption: "✅ Done",
                                        })
                                    )
                                    .catch((err) => m.reply(err));
                                m.react("✅");
                            });
                    };
                    getQuote();
                    break;
            }
            // let res = await mumaker
            //     .textpro(libLink, [`${logoText}`])
            //     .then((data) =>
            //         conn.sendMessage(m.chat, {
            //             image: { url: `${data.image}` },
            //             caption: "✅ Done this is your logo",
            //         })
            //     )
            //     .catch((err) => m.reply(err));
            // m.react("✅");
        }
    }
};

handler.help = ["logo <Type> <Name>"];
handler.tags = ["logo"];
handler.command = /^(logo)$/i;

export default handler;
/* 

https://textpro.me/create-light-glow-sliced-text-effect-online-1068.html
sliced

https://textpro.me/make-a-batman-logo-online-free-1066.html
batman

https://textpro.me/create-thunder-text-effect-online-881.html
thunder

https://textpro.me/create-a-magma-hot-text-effect-online-1030.html
magma

https://textpro.me/create-impressive-glitch-text-effects-online-1027.html
glitch

https://textpro.me/create-green-horror-style-text-effect-online-1036.html
demon

https://textpro.me/create-realistic-3d-text-effect-frozen-winter-1099.html
frozen

https://textpro.me/ice-cold-text-effect-862.html
ice

https://textpro.me/create-artistic-typography-online-1086.html
typography

https://textpro.me/write-text-on-foggy-window-online-free-1015.html
foggy

https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html
stone

https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html
bear

https://textpro.me/double-exposure-text-effect-black-white-976.html
forest

https://textpro.me/create-burger-3d-text-effect-1111.html
burger

https://textpro.me/create-3d-dragon-scale-text-effect-online-1127.html
dragon

https://textpro.me/create-pokemon-logo-style-text-effect-online-1134.html
pokemon

https://textpro.me/natural-leaves-text-effect-931.html
natural

https://textpro.me/create-a-gradient-text-shadow-effect-online-1141.html
shadow

*/
