const { contextBridge, ipcRenderer } = require('electron');
const os = require('os');
const Mousetrap = require('mousetrap');

// Un test
contextBridge.exposeInMainWorld('electron', {
    homeDir: () => os.homedir(),
    hostname: () => os.hostname(),
    osVersion: () => os.version(),
    arch: () => os.arch(),
});

// Para más tarde
contextBridge.exposeInMainWorld('ipcRenderer', {
    on: (channel, func) =>
        ipcRenderer.on(channel, (event, ...args) => func(...args)),
    send: (channel, data) => ipcRenderer.send(channel, data),
});

// Bloquea el atajo Ctrl+R
Mousetrap.bind('ctrl+r', (e) => {
    e.preventDefault();
});