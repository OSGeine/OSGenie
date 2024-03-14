import fetch from 'node-fetch';
import { translate } from '@vitalets/google-translate-api';

let quranSurahHandler = async (m, { conn }) => {
  try {
    // Extract the surah number or name from the command text.
    let surahInput = m.text.split(' ')[1];

    if (!surahInput) {
      throw new Error(`Please specify the surah number or name`);
    }

    let surahListRes = await fetch('https://quran-endpoint.vercel.app/quran');
    let surahList = await surahListRes.json();

    let surahData = surahList.data.find(surah =>
      surah.number === Number(surahInput) ||
      surah.asma.ar.short.toLowerCase() === surahInput.toLowerCase() ||
      surah.asma.en.short.toLowerCase() === surahInput.toLowerCase()
    );

    if (!surahData) {
      throw new Error(`Couldn't find surah with number or name "${surahInput}"`);
    }

    let res = await fetch(`https://quran-endpoint.vercel.app/quran/${surahData.number}`);

    if (!res.ok) {
      let error = await res.json();
      throw new Error(`API request failed with status ${res.status} and message ${error.message}`);
    }

    let json = await res.json();

    // Translate tafsir from Bahasa Indonesia to Urdu
    // let translatedTafsirUrdu = await translate(json.data.tafsir.id, { to: 'ur', autoCorrect: true });

    // Translate tafsir from Bahasa Indonesia to English
    // let translatedTafsirEnglish = await translate(json.data.tafsir.id, { to: 'ar', autoCorrect: true });

    let quranSurah = `
    🕌 *القرآن الكريم*\n
    📜 *سورة: ${json.data.asma.ar.short}*\n
    النوع: ${json.data.type.ar}\n
    عدد الآيات: ${json.data.ayahCount}\n`;

    m.reply(quranSurah);

    if (json.data.ayahCount < 50) {
      if (json.data.recitation.full) {
        let doc =
        {
          audio: {
            url: json.data.recitation.full
          },
          mimetype: 'audio/mpeg',
          ptt: true,
        }
        await conn.sendMessage(m.chat, doc);
      }
    } else {
      m.reply("*Sorry!* I cannot send large audio files ")
    }


  } catch (error) {
    console.error(error);
    m.reply(`Error: ${error.message}`);
  }
};

quranSurahHandler.help = ['quran [surah_number|surah_name]'];
quranSurahHandler.tags = ['quran', 'surah'];
quranSurahHandler.command = ['quran', 'surah']

export default quranSurahHandler;





