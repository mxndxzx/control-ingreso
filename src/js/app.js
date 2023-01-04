import Data from './db.js';

// === Variables
let rawData, database;

// Functions
const painter = (object) => {
    let input = document.querySelector('.input');
    Object.entries(object).forEach(value => {
        input.innerHTML += `<li>${value[0]}: ${value[1]}</li>`
    });
    input.innerHTML += `<p>-------------------------</p>`
};

// === Event listeners
// Pistol scanner listener (keydown and 'enter' events)
document.addEventListener('keydown', (e) => {
    console.log(e);
    if(!window.hasOwnProperty('scan')) {
        window.scan = [];
    };

    if(window.scan.length > 0 && (e.timeStamp - window.scan.slice(-1)[0].timeStamp) > 100) {
        window.scan = []
    };

    if(e.key === 'Enter' && window.scan.length > 0) {
        let data = window.scan.reduce( (scan, entry) => {
            return scan + entry.key;
        }, '');
        window.scan = [];
        return document.dispatchEvent(new CustomEvent('scanComplete', {detail: data}));
    };

    if(e.location == 0 && e.key !== 'CapsLock') {
        let data = JSON.parse(JSON.stringify(e, ['key', 'timeStamp']));
        data.timeStampDiff = window.scan.length > 0 ? data.timestamp - window.scan.slice(-1)[0].timestamp : 0;
        window.scan.push(data);
    };
});

// Listener for custom scanner event
document.addEventListener('scanComplete', (e) => {
    rawData = e.detail.replace(/&/g, '/').split('²');
    database = new Data (...rawData);
    painter(database);
});