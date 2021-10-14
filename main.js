const { app, BrowserWindow, ipcMain } = require('electron')
const config = require('./config/discord')
const discord = require('./discord')

let access_token = null

function createAuthenticationWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadURL(discord.getAuthorizeURL({ client_id: config.client_id, scope: ['guilds', 'messages.read']}))
  win.webContents.on('will-navigate', function(event, url) {
    if (!/localhost/.test(url)) {
      return
    }

    const parameters = url.split('#').pop().split('&').
            map((val) => { return val.split('=')}).
            reduce((results, current) => {
              results[current[0]] = current[1]
              return results
            }, {})

    access_token = parameters['access_token']

    win.close()
  })
}

ipcMain.on('get-access-token', function(event, args) {

})

app.whenReady().then(() => {
  createAuthenticationWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length == 0) createAuthenticationWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()

  console.log(access_token)
})
