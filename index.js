const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const {app, BrowserWindow, ipcMain} = electron;

let mainWindow;

app.on('ready', () => {
	console.log("App is ready");
	mainWindow = new BrowserWindow({});
	mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (event, path) => {
	console.log("event Recieved");
	ffmpeg.ffprobe(path, (err, metadata) => {
		console.log("metadata");
		console.log(metadata);
		console.log("Video duration is "+metadata.format.duration);
		mainWindow.webContents.send(
			'video:metadata',
			metadata.format.duration
		);
	});

});