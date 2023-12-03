const WeatherApp=class{
    constructor(apiKey, resultBlockSelector) {
        this.apiKey=apiKey;
        this.resultBlockSelector=document.querySelector(resultBlockSelector);
        this.currentWeatherLink=`https://api.openweathermap.org/data/2.5/weather?q={query}&appid=${apiKey}&units=metric`;
        this.forecastLink=`https://api.openweathermap.org/data/2.5/forecast?q={query}&appid=${apiKey}&units=metric`;
        this.createWeather=undefined;
        this.forecast=undefined;
    }
    getCurrentWeather(query){
        let url=this.currentWeatherLink.replace("{query}",query);
        let req=new XMLHttpRequest();
        req.open("GET", url,true);
        req.addEventListener("load",()=>{
           console.log(JSON.parse(req.responseText));
           this.drawWeather();
           
        });

        req.send();
    }
    getForecast(query){
        let url=this.forecastLink.replace("{query}", query);
        fetch(url)
            .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            console.log(data)
            this.forecast=data.list;
            this.drawWeather();
        });
    }
    getWeather(query){
        this.getCurrentWeather(query);
        this.getForecast(query);
    }
    drawWeather(query){
        this.resultBlockSelector.innerHTML='';
        if(this.currentWeather) {
            const date=new Date(this.currentWeather.dt *1000);
            const weatherBlock = this.createWeatherBlock(
                `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString("pl-PL")}`,
                this.currentWeather.main.temp,
                this.currentWeather.main.feels_like,
                this.currentWeather.weather[0].icon,
                this.currentWeather.weather[0].description
            );
            this.resultBlockSelector.appendChild(weatherBlock);
        }
        if(this.forecast){
            for(let i=0;i<this.forecast.length;i++){
                let weather=this.forecast[i];

                const date=new Date(weather.dt *1000);
                const weatherBlock = this.createWeatherBlock(
                    `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString("pl-PL")}`,
                    weather.main.temp,
                    weather.main.feels_like,
                    weather.weather[0].icon,
                    weather.weather[0].description
                );
                this.resultBlockSelector.appendChild(weatherBlock);
            }
        }
    }
    createWeatherBlock(dateString,temperature,feelsLikeTemprearure,iconName,description){
        const weatherBlock=document.createElement("div");
        weatherBlock.className="weather-block";


        const dateBlock=document.createElement("div");
        dateBlock.className="weather-date";
        dateBlock.innerText=dateString;
        weatherBlock.appendChild(dateBlock);

        const temperatureBlock=document.createElement("div");
        temperatureBlock.className="weather-temperature";
        temperatureBlock.innerText=`${temperature} °C`;
        weatherBlock.appendChild(temperatureBlock);

        const temperatureFeelBlock=document.createElement("div");
        temperatureFeelBlock.className="weather-temperature-feels-like";
        temperatureFeelBlock.innerText=`Feels: ${feelsLikeTemprearure} °C`;
        weatherBlock.appendChild(temperatureFeelBlock);

        const iconBlock=document.createElement("img");
        iconBlock.className="weather-icon";
        iconBlock.src=`https://openweathermap.org/img/wn/${iconName}@2x.png`;
        weatherBlock.appendChild(iconBlock);

        const descriptionBlock=document.createElement("div");
        descriptionBlock.className="weather-description";
        descriptionBlock.innerText=description;
        weatherBlock.appendChild(descriptionBlock);

        return weatherBlock;
    }
}
document.weatherApp=new WeatherApp("7ded80d91f2b280ec979100cc8bbba94","#weather-result-container")

document.querySelector("#checkButton").addEventListener("click",function (){
    const query=document.querySelector("#locationInput").value;
    document.weatherApp.getWeather(query);
})