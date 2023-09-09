const { app, BrowserWindow, protocol, ipcMain } = require("electron");
const url = require("url");
const path = require("path");

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "MediKids",
    width: 1500,
    height: 800,
    fullscreen: true,
    icon: "../global-assets/logos/MediKids_Colored-Isotype.png",
    autoHideMenuBar: true, // Eso oculta la toolbar
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
      devTools: false,
    },
  });

  // mainWindow.webContents.openDevTools();

  const startUrl = url.format({
    pathname: path.join(__dirname, "./app/build/index.html"),
    protocol: "file",
  });

  mainWindow.loadURL("https://medikids-firebase.web.app/login"); // Aquí se cambiará la URL para cuando se suba el proyecto a la nube
}

app.whenReady().then(createMainWindow);

ipcMain.on("submit:todoForm", async (event, args) => {
  const data = await TodoService.handleTodoFormSubmit(opt);
  mainWindow.webContents.send("task:added", { task: data });
});
