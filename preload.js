const { contextBridge, ipcRenderer } = require('electron')

function getGuilds() {
  return ipcRenderer.sendSync('get-guilds')
}

contextBridge.exposeInMainWorld('discord', { getGuilds })
