import 'os';
import _0x5dd74e from 'express';
import { spawn } from 'child_process';
import _0x418a10 from 'path';
import 'module';
import _0x1c8846 from 'fs';
import 'fs';
import _0x16d8a4 from 'chalk';
import _0x3c5eee from 'cfonts';
const {
  say
} = _0x3c5eee;
say("OSGEINE - V1", {
  'font': "block",
  'align': "center",
  'colors': ['#8e44ad'],
  'background': "transparent",
  'letterSpacing': 0x1,
  'lineHeight': 0x1,
  'space': true,
  'maxLength': '15'
});
say("OSGEINE By DR.OSMAN", {
  'font': "chrome",
  'align': "center",
  'colors': ["red", "magenta"],
  'background': "transparent",
  'letterSpacing': 0x1,
  'lineHeight': 0x1,
  'space': true,
  'maxLength': '30'
});
const app = _0x5dd74e();
const port = process.env.PORT || 0x1f90;
const basePath = new URL(import.meta.url).pathname;
const htmlDir = _0x418a10.join(_0x418a10.dirname(basePath), 'Assets');
const sendHtml = (_0x5e8df3, _0x831a69, _0x2e33fc) => {
  _0x831a69.sendFile(_0x418a10.join(htmlDir, _0x2e33fc + ".html"));
};
app.get('/', (_0x3f917b, _0x12b2d7) => sendHtml(_0x3f917b, _0x12b2d7, "guru"));
app.listen(port, () => {
  console.log(_0x16d8a4.green("Port " + port + " is open"));
});
let isRunning = false;
async function start(_0x733d1b) {
  if (isRunning) {
    return;
  }
  isRunning = true;
  const _0x2cd599 = new URL(import.meta.url).pathname;
  const _0x314900 = [_0x418a10.join(_0x418a10.dirname(_0x2cd599), _0x733d1b), ...process.argv.slice(0x2)];
  const _0x4d851d = spawn(process.argv[0x0], _0x314900, {
    'stdio': ["inherit", "inherit", "inherit", "ipc"]
  });
  _0x4d851d.on("message", _0x4a4026 => {
    console.log(_0x16d8a4.cyan("✔️OSGEINE CONNECTED" + _0x4a4026));
    switch (_0x4a4026) {
      case "reset":
        _0x4d851d.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
      case 'uptime':
        _0x4d851d.send(process.uptime());
        break;
    }
  });
  _0x4d851d.on("exit", _0xfadb21 => {
    isRunning = false;
    console.error(_0x16d8a4.red("❌ Exited with code: " + _0xfadb21));
    if (_0xfadb21 === 0x0) {
      return;
    }
    _0x1c8846.watchFile(_0x314900[0x0], () => {
      _0x1c8846.unwatchFile(_0x314900[0x0]);
      start("Guru.js");
    });
  });
  _0x4d851d.on("error", _0x565628 => {
    console.error(_0x16d8a4.red("Error: " + _0x565628));
    _0x4d851d.kill();
    isRunning = false;
    start('Guru.js');
  });
  const _0x590b3f = _0x418a10.join(_0x418a10.dirname(_0x2cd599), "plugins");
  _0x1c8846.readdir(_0x590b3f, async (_0x295a55, _0x1f00fa) => {
    if (_0x295a55) {
      console.error(_0x16d8a4.red("Error reading plugins folder: " + _0x295a55));
      return;
    }
    console.log(_0x16d8a4.yellow("Installed " + _0x1f00fa.length + " plugins"));
    try {
      const {
        default: _0x2d151e
      } = await import("@whiskeysockets/baileys");
      const _0xa1acdf = (await _0x2d151e.fetchLatestBaileysVersion()).version;
      console.log(_0x16d8a4.yellow("Using Baileys version " + _0xa1acdf));
    } catch (_0x48bf64) {
      console.error(_0x16d8a4.red("Baileys library is not installed"));
    }
  });
}
start('Guru.js');
process.on("unhandledRejection", () => {
  console.error(_0x16d8a4.red("Unhandled promise rejection. Bot will restart..."));
  start("Guru.js");
});
process.on("exit", _0x1d6264 => {
  console.error(_0x16d8a4.red("Exited with code: " + _0x1d6264));
  console.error(_0x16d8a4.red("Bot will restart..."));
  start("Guru.js");
});