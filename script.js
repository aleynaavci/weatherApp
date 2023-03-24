function showTime() {
    let date = new Date();
    let day = date.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let hour = date.getHours();
    hour = hour < 10 ? "0" + hour : hour;
    let minute = date.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;
    let second = date.getSeconds();
    second = second < 10 ? "0" + second : second;
    let current = hour + ":" + minute + ":" + second;
    document.getElementById("text-h").innerHTML = current;
    document.getElementById("text-d").innerHTML = days[day];
}
setInterval("showTime()", 1000);


const search = document.querySelector('.box button');

search.addEventListener('click', () => {
    const APIKey = 'da708678ef309d3932ecc06bb0ddb678';
    const city = document.querySelector('.box input').value;


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.cod === "404") {
                alert("Geçerli lokasyon giriniz.")
            }

            const container = document.querySelector('.container');
            const weather = document.querySelector('.weather');
            const details = document.querySelector('.details')
            const image = document.querySelector('.weather img');
            const temperature = document.querySelector('.weather .temperature');
            const condition = document.querySelector('.weather .condition');
            const humidity = document.querySelector('.details .humidity span');
            const pressure = document.querySelector('.details .pressure span');
            const wind = document.querySelector('.details .wind span');
            const date = document.querySelector('.date');
            const divider = document.querySelector('.divider');
            const divider1 = document.querySelector('.divider1');

            switch (data.weather[0].main) {
                case 'Clear':
                    image.src = './css/icons/sun/26.png';
                    break;

                case 'Rain':
                    image.src = './css/icons/rain/39.png';
                    break;

                case 'Snow':
                    image.src = './css/icons/rain/39.png';
                    break;

                case 'Clouds':
                    image.src = './css/icons/sun/27.png';
                    break;

                default:
                    image.src = '';
            }

            document.getElementById("temperature").innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
            console.log(data.weather);
            condition.innerHTML = `${data.weather[0].description}`;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;
            pressure.innerHTML = `${data.main.pressure}hPa`;

            weather.style.display = '';
            details.style.display = '';
            date.style.display = '';
            weather.classList.add('fadeIn');
            divider.classList.add('fadeIn');
            details.classList.add('fadeIn');
            divider1.classList.add('fadeIn');
            date.classList.add('fadeIn');
            container.style.height = '500px';
        })
        .catch(err => console.log(err));

});