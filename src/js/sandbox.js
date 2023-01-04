class Data {
    constructor (tramite,apellido,nombre,sexo,dni,ejemplar,nacimiento,emision,cuil) {
        this.tramite = tramite;
        this.apellido = apellido;
        this.nombre = nombre;
        this.sexo = sexo;
        this.dni = dni;
        this.ejemplar = ejemplar;
        this.nacimiento = nacimiento;
        this.emision = emision;
        this.cuil = cuil;
    };
};

let data, parse;

// Author: Neel Bhanushali <neal.bhanushali@gmail.com>
document.addEventListener('keydown', (e) => {
// add scan property to window if it does not exist
if(!window.hasOwnProperty('scan')) {
    window.scan = [];
};

// if key stroke appears after 100 ms, empty scan array
if(window.scan.length > 0 && (e.timeStamp - window.scan.slice(-1)[0].timeStamp) > 100) {
    window.scan = [];
};

// if key store is enter and scan array contains keystrokes
// dispatch `scanComplete` with keystrokes in detail property
// empty scan array after dispatching event
if(e.key === "Enter" && window.scan.length > 0) {
    let scannedString = window.scan.reduce((scannedString, entry) => {
        return scannedString + entry.key
    }, "");
    window.scan = [];
    return document.dispatchEvent(new CustomEvent('scanComplete', {detail: scannedString}));
};

// do not listen to shift event, since key for next keystroke already contains a capital letter
// or to be specific the letter that appears when that key is pressed with shift key
if(e.location == 0) {
    // push `key`, `timeStamp` and calculated `timeStampDiff` to scan array
    let data = JSON.parse(JSON.stringify(e, ['key', 'timeStamp']));
    data.timeStampDiff = window.scan.length > 0 ? data.timeStamp - window.scan.slice(-1)[0].timeStamp : 0;
    window.scan.push(data);
};
});
// listen to `scanComplete` event on document
// document.addEventListener('scanComplete', (e) => {
//     data = e.detail.replace(/&/g, "/");
//     parse = data.split("²");
//     console.log(parse);
// });

document.addEventListener('scanComplete', (e) => {
    data = e.detail.replace(/&/g, "/");
    parse = data.split("²");
    console.log(parse);
    paint(parse);
});

const paint = (array) => {
    let input = document.querySelector('.input');
    array.forEach(e => {
        input.innerHTML += `<li>${e}</li>`
    });
    const obj = [
        new Data (1,2,3,4,5,6,7,8,9),
    ];
    console.log(obj[0].nombre);
};
