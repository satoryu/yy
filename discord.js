const { BrowserWindow } = require('electron')
const config = require('./config/discord')
const path = require('path')

let access_token = null

function getAuthorizeURL(oauthConfig) {
  return `https://discord.com/api/oauth2/authorize?response_type=token&client_id=${oauthConfig.client_id}&scope=${encodeURI(oauthConfig.scope.join(' '))}`
}

function createAuthenticationWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadURL(getAuthorizeURL({ client_id: config.client_id, scope: ['guilds', 'messages.read']}))
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
    createChanelSelectWindow()

    win.close()
  })
}

function createChanelSelectWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./chanel_select.html')
}

module.exports = { getAuthorizeURL, createAuthenticationWindow }
