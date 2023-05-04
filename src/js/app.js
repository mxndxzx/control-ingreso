const painter = (object) => {
    let input = document.querySelector('.input');
    Object.entries(object).forEach(value => {
        input.innerHTML += `<li>${value[0]}: ${value[1]}</li>`
    });
    input.innerHTML += `<p>-------------------------</p>`
};

// class Calls {
//     async getUser(userId) {
//         await fetch(`http://localhost:3001/api/v1/users/${userId}`, {
//             method: "GET",
//             headers: { "Content-Type": "application/json", "Accept": "application/json" },
//             mode: "cors",
//         })
        
//         .then(data => {
//             console.log(data)
//         })

//         .catch(
//             console.log(err)
//         );
//     };
// };

async function getUser(userId) {
    await fetch(`http://localhost:3001/api/v1/users/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        mode: "cors",
    })
    
    .then(data => {
        data.json().then(json => {
            console.log(json)
        });
    })

    .catch(err => {console.log('Error::' + err)})
};

// getUser(43600475);

// async function data() {
//     await fetch('http://localhost:3001/api/v1/users/43600475', init)
//     .then(data => {
//         if (data.ok) {
//             data.json().then(json => {
//                 console.log(json);
//             });
//         };
//     })
    
//     .catch(err => console.log('ERROR::'+ err))
// }

// data();