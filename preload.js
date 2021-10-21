const { contextBridge, ipcRenderer } = require('electron')

function getGuilds() {
  return ipcRenderer.sendSync('get-guilds')
}

function getChannels(guild_id) {
  return ipcRenderer.sendSync('get-channels', { guild_id: guild_id })
}

contextBridge.exposeInMainWorld('discord', { getGuilds, getChannels })
