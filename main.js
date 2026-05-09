const path = require('path');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const ffmpegStatic = require('ffmpeg-static');
const ytdlpModule = require('yt-dlp-exec');
const ytdlp = typeof ytdlpModule === 'function'
  ? ytdlpModule
  : ytdlpModule.default || ytdlpModule.create?.() || ytdlpModule;

const ffmpegPath = typeof ffmpegStatic === 'string' ? ffmpegStatic : ffmpegStatic?.path || ffmpegStatic;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1040,
    height: 760,
    minWidth: 940,
    minHeight: 720,
    title: "Aashu's Downloader",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.removeMenu();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('choose-output-folder', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: 'Select output folder',
    properties: ['openDirectory']
  });
  return canceled ? null : filePaths[0];
});

ipcMain.handle('download-media', async (event, { url, type, outputFolder }) => {
  if (!url || !type) {
    throw new Error('URL and type are required.');
  }

  const outputTemplate = path.join(outputFolder || app.getPath('downloads'), '%(title)s.%(ext)s');
  const options = {
    output: outputTemplate,
    quiet: true,
    noWarnings: true,
    ffmpegLocation: ffmpegPath
  };

  if (type === 'audio') {
    options.extractAudio = true;
    options.audioFormat = 'wav';
    options.audioQuality = 0;
  }

  try {
    const result = await ytdlp(url, options);
    return { success: true, message: result.toString() };
  } catch (error) {
    return { success: false, message: error.stderr || error.message || String(error) };
  }
});
