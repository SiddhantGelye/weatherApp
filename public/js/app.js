const weatherForm = document.querySelector('form')
const address  = document.querySelector('.input_value');
const url = ''
const msg1 = document.querySelector('#message1');
const msg2 = document.querySelector('#message2');
const day = document.querySelector('#day');
const cloud = document.querySelector('#cloud');
const humidity = document.querySelector('#humidity');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(address.value);
    const location = address.value;
    msg1.textContent = 'Loading...';
    msg2.textContent = '';
    day.textContent='';
    cloud.textContent='';
    humidity.textContent='';

        fetch(`/weather?address=${location}`)
        .then(response=>{

            response.json().then(data=>{
                console.log(data);
                if(data.error){
                    console.log(data.error)
                    msg1.textContent = data.error;
                }
                msg1.textContent = data.location;
                msg2.textContent = `Temperature in ${location} is ${data.temperature} but feels like ${data.feelslike}`
                {
                    if(data.daystatus==="yes"){
                        day.textContent = `It is day here`;
                    }
                    else{
                        day.textContent='It is night here';
                    }
                }
                cloud.textContent=`Clouds Cover is ${data.cloudcover}`;
                humidity.textContent = `Humidity is - ${data.humidity}`;    
            })
        })
})
