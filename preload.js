const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('geminiApi', {
  chooseOutputFolder: () => ipcRenderer.invoke('choose-output-folder'),
  downloadMedia: (options) => ipcRenderer.invoke('download-media', options)
});
