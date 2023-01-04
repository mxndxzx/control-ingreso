import Data from './db.js';

// === Variables
let rawData, database;

// === Event listeners
// Pistol scanner listener (keydown and 'enter' events)
document.addEventListener('keydown', (e) => {
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

    if(e.location == 0) {
        let data = JSON.parse(JSON.stringify(e, ['key', 'timeStamp']));
        data.timeStampDiff = window.scan.length > 0 ? data.timestamp - window.scan.slice(-1)[0].timestamp : 0;
        window.scan.push(data);
    };
});

// Listener for custom scanner event
document.addEventListener('scanComplete', (e) => {
    rawData = e.detail.replace(/&/, '/').split('²');
    database = new Data (...rawData);
    document.querySelector('.input').innerHTML += `<li>${database.tramite}</li>` 
});