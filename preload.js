const { contextBridge } = require('electron')

const dummyGuilds = [
  { name: 'ホワイエ', id: 1 },
  { name: '分散アジャイルを考える会', id: 2 },
  { name: '製造業アジャイル', id: 3 }
]

function getGuilds() {
  return dummyGuilds
}

contextBridge.exposeInMainWorld('discord', { getGuilds })
