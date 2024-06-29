//get location
const main =document.getElementById('main');
const successCallback = (position) => {
    console.log(position);
    
  var geolat = position.coords.latitude;
  console.log(geolat)
  let long =position.coords.longitude;
  console.log(long)
  let accuracy =  position.coords.accuracy;
  console.log(accuracy)
 


  async function getWeatherData(lat, long) {
    let API = `https://api.openweathermap.org/data/2.5/weather?lat=${geolat}&lon=${long}&appid=d90ffb0ba5bca0738145bcd6449a67b3`
    try {
        const response = await fetch(API);
        const data = await response.json();
       console.log(data)

        const weather = {
            city: data.name,
            temperature: (data.main.temp - 273.15).toFixed(2),
            temperaturemax: (data.main.temp_max - 273.15).toFixed(2),
            temperaturemin: (data.main.temp_min - 273.15).toFixed(2),
            temperaturefeelslike: (data.main.feels_like - 273.15).toFixed(2),
            description: data.weather[0].description,
            humidity:data.main.humidity,
            pressure:data.main.pressure,
            windspeed:data.wind.speed,
            visibility:data.visibility,
           
           date:data.dt,
            sunrise:data.sys.sunrise,
            sunset:data.sys.sunset,
            
          
            
           


          };
         
          
          console.log(new Date(data.sys.sunset*1000)); 

          console.log(new Date(data.dt*1000)); // minus 
  

 






         
          displaydata(weather);
        
    } catch (error) {
        console.error(error);
    }
    

}


getWeatherData(geolat,long);

   
    
 
  
  };
  
  const errorCallback = (error) => {
    console.log(error);
    alert("location is denied change in settings")
  };
  
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

  //getting weather data
  


 function displaydata(weatherInfo){

    newsunrisetime=(new Date(weatherInfo.sunrise*1000)); 
sunrisehours=newsunrisetime.getHours();
sunriseminutes=newsunrisetime.getMinutes();


newtime=(new Date(weatherInfo.date*1000)); 
newtimehours=newtime.getHours();
newtimeminutes=newtime.getMinutes();
let ampm;
if(newtimehours<=12){
    ampm='am'
}
else{
    ampm='pm'
}




newsunsettime=(new Date(weatherInfo.sunset*1000)); 
sunsethours=newsunsettime.getHours();
sunsetminutes=newsunsettime.getMinutes();
    
 
    const weatherDataElement = document.getElementById('weatherData');
    const html = `
    <div class="mainpage">
    <div class="leftdiv">
    <div class="top">

    <div> ${weatherInfo.city}</div>
   
    <div class="date">
   ${new Date(weatherInfo.date*1000)}
   </div>
   </div>

   <div class="temperature">
   <div>
   <img src="images (1).jpeg">
   </div>
   <div>${weatherInfo.temperature}°C
    </div>
    </div>
   
  <div class="top">
    <div>feels like ${weatherInfo. temperaturefeelslike}°C </div>
    <div> ${weatherInfo.description} </div>
</div>
    </div>
    <div class="rightdiv">
    <div class="a1">
   <div>
    <img class="rightimg" src="download.png">
    Humidity 
    </div>
    
    
    <div>${weatherInfo.humidity}%</div> </div>
    <div class="a1">
    <div>
    <img class="rightimg" src="download (1).png">
    Pressure
    </div>
    <div> ${weatherInfo.pressure} mb 
    </div></div>
    <div class="a1">
    <div> 
    <img class="rightimg" src="download (2).png">
    WindSpeed
    </div>
    <div>
    ${weatherInfo.windspeed}
    </div> </div>
    <div class="a1">
    <div>
    <img class="rightimg" src="download (3).png">
    Visibility
    </div>
    <div>
    ${weatherInfo.visibility}
    </div> </div>
  
   
    <div class="a1">
    <div>
    <img class="rightimg" src="download (4).png">
    Sunrise 
    </div>
    <div>
    ${sunrisehours+':'+sunriseminutes}
    </div>  </div>

    <div class="a1">
    <div>
    <img class="rightimg" src="download (5).png">
    Sunset
    </div>
    <div> ${sunsethours+':'+sunsetminutes} 
    </div></div>
    </div>
</div>
   

  `;
  weatherDataElement.innerHTML = html;

 }

 