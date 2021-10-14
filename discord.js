function getAuthorizeURL(oauthConfig) {
  return `https://discord.com/api/oauth2/authorize?response_type=token&client_id=${oauthConfig.client_id}&scope=${encodeURI(oauthConfig.scope.join(' '))}`
}

module.exports = { getAuthorizeURL }
