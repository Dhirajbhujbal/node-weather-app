console.log('Client side javascript file is loaded')

fetch('https://jsonplaceholder.typicode.com/todos/1').then( res => res.json() ).then( (res) => {
    console.log(JSON.stringify(res));
})

// AIzaSyCARy7b9s8sJElX4ql2nt-U-rLr14kYOEI

setTimeout( () => {
    const btnId = document.getElementById('searchId');
    const forecastInfo1 = document.querySelector('#forecastInfo1');
    const forecastInfo2 = document.querySelector('#forecastInfo2');

    btnId.addEventListener('click', (e) => {
        const searchValue = document.getElementsByClassName('inputBox')[0].value
        forecastInfo1.textContent = 'Loading.......';
        fetch(`http://localhost:3000/weather?address=${searchValue}`).then((res) => {
            return res.json();
        }).then((res) => {
            if(res.error) {
                forecastInfo1.textContent = res.error;
            } else {
                forecastInfo1.textContent = res.foreCastData;
                forecastInfo2.textContent = res.locationName;
                // console.log(res)
            }  
        })
    })
},3000)

