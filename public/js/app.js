const weatherForm = document.querySelector('form')
const address  = document.querySelector('.input_value');
const url = ''
const msg1 = document.querySelector('#message1');
const msg2 = document.querySelector('#message2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(address.value);
    const location = address.value;
    msg1.textContent = 'Loading...';
    msg2.textContent = '';

        fetch(`http://localhost:3000/weather?address=${location}`)
        .then(response=>{

            response.json().then(data=>{
                if(data.error){
                    console.log(data.error)
                    msg1.textContent = data.error;
                }
                msg1.textContent = data.location;
                msg2.textContent = `Temperature in ${location} is ${data.temperature} but feels like ${data.feelslike}`
                console.log(data.location);
            })
        })
    
    
    
})
