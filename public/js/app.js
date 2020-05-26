
// fetch('https://jsonplaceholder.typicode.com/todos/1').then( res => res.json() ).then( (res) => {
//     console.log(JSON.stringify(res));
// })


setTimeout( () => {
    const btnId = document.getElementById('searchId');
    const forecastInfo1 = document.querySelector('#forecastInfo1');
    const forecastInfo2 = document.querySelector('#forecastInfo2');
    const rportCardHeader = document.querySelector('#rportCardHeader');
    const imageid = document.querySelector('#imageId');
    const cityName = document.querySelector('.cityName');
    

    btnId.addEventListener('click', (e) => {
        const searchValue = document.getElementsByClassName('inputBox')[0].value
        forecastInfo1.textContent = 'Loading.......';
        forecastInfo2.textContent = '';
        imageid.style.display = 'none';
        cityName.textContent = '';
        fetch(`/weather?address=${searchValue}`).then((res) => {
            return res.json();
        }).then((res) => {
            if(res.error) {
                forecastInfo1.textContent = res.error;
                rportCardHeader.style.display = 'none';
                forecastInfo2.textContent = '';
                cityName.textContent = '';
                imageid.style.display = 'none';
            } else {
                console.log('weatherStatusIcon    ----', res.weatherStatusIcon)
                rportCardHeader.style.display = 'block';
                forecastInfo1.textContent = res.foreCastWeatherSummary;
                forecastInfo2.textContent = res.locationName;
                cityName.textContent = searchValue;
                imageid.style.display = 'block';
                imageid.src = res.weatherStatusIcon;
                
            }  
        })
    })
},3000)

