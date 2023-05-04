const dataJson = {};

const modalBtn = document.querySelector('.main__form--modal');
const clearBtn = document.querySelector('.main__form--clear');
const submitBtn = document.querySelector('#finalSubmit');



modalBtn.addEventListener("click", () => {
    const user_name = document.querySelector('.main__form--name').value;
    const user_surname = document.querySelector('.main__form--surname').value;
    const user_id = document.querySelector('.main__form--userId').value;
    const type = document.querySelector('.main__form--regType').value;
    const area = document.querySelector('.main__form--area').value;
    const description = document.querySelector('.main__form--desc').value;

    if (area && type && user_id) {
        document.querySelector('.form__msg').style.display = 'none';

        const submitModal = new bootstrap.Modal(document.getElementById('submitModal'), )
        submitModal.toggle()

        submitBtn.addEventListener("click", () => {
            const dataJson = {
                user_name: user_name,
                user_surname: user_surname,
                user_id: user_id,
                type: type,
                area: area,
                description: description,
                scan_logon: 'LP2076'
            };

            async function createUser() {
                await fetch(`http://localhost:3001/api/v1/users`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "Accept": "application/json" },
                    mode: "cors",
                    body: JSON.stringify(dataJson)
                })
                
                .then(data => {
                    data.json().then(json => {
                        console.log(json);
                    });

                    
                })
            
                .catch(err => {console.log('Error::' + err)})
            };

            createUser();
        });
    } else {
        document.querySelector('.form__msg').style.display = 'block';
    };

    document.querySelector('#submitModalLabel').innerHTML = type;

    
    console.log(dataJson);
});

clearBtn.addEventListener("click", () => {
    document.querySelector('.main__form > form').reset();
});