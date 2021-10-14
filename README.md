# YY

YY, わいわい in Japanese, is a desktop application for Discord users to feel atmosphere in a channel on your desktop.

## Development

### Prerequisite

- client id of your Discord application

### Run the application in development

Before starting development, you must create a configuration file.

```sh
cp config/discord.js{.example,}
```

Open `config/discord.js` in your favorite text editor and put your application's client id to the file.

Now, you can launch the application:

```sh
npm install
npm start
```
