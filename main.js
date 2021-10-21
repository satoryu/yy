const { app, BrowserWindow, ipcMain } = require('electron')
const discord = require('./discord')

app.whenReady().then(() => {
  discord.createAuthenticationWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length == 0) discord.createAuthenticationWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
