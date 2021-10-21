const { BrowserWindow, ipcMain } = require('electron')
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

    console.log(parameters['expires_in'])

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

const axios = require('axios').default

ipcMain.on('get-guilds', async function(event) {
  const response = await axios.get('https://discord.com/api/users/@me/guilds',
    {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
  event.returnValue = response.data
  return
})

ipcMain.on('get-channels', async function(event, args) {
  try {
    const response = await axios.get(`https://discord.com/api/guilds/${args.guild_id}/channels`,
      {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      })
    event.returnValue = response.data
    return
  } catch(err) {
    console.error(err)
    return
  }
})

module.exports = { getAuthorizeURL, createAuthenticationWindow }
