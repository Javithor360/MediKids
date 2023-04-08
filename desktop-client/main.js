const { app, BrowserWindow, protocol, ipcMain } = require("electron");
const url = require("url");
const path = require("path");

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "MediKids",
    width: 1500,
    height: 800,
    icon: "./app/src/assets/logos/imagotipo.png",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.webContents.openDevTools();

  const startUrl = url.format({
    pathname: path.join(__dirname, "./app/build/index.html"),
    protocol: "file",
  });

  mainWindow.loadURL("http://localhost:5000");
}

app.whenReady().then(createMainWindow);

ipcMain.on("submit:todoForm", async (event, args) => {
  const data = await TodoService.handleTodoFormSubmit(opt);
  mainWindow.webContents.send("task:added", { task: data });
});
