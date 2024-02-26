const userTab = document.querySelector("[data-userWeather]")
const searchTab= document.querySelector("[data-searchWeather]")
const userContainer = document.querySelector(".weather-container")
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoCont = document.querySelector(".user-info-container");


// initially variable need?
let oldTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current-tab");
function switchTab(newTab){
  if(newTab != oldTab){
    oldTab.classList.remove("current-tab");
    oldTab = newTab;
    oldTab.classList.add("current-tab");


    if(!searchForm.classList.contains("active")){
      // kya search form wala container is invisible if yes then make it visible

      userInfoCont.classList.remove("active");
      grantAccessContainer.classList.remove("active");
      searchForm.classList.add("active");


    }
    else{
      // main phle search vale tab pr tha, ab ur weathr tb visible krna h
      searchForm.classList.remove("active");
      userInfoCont.classList.remove("active");
      // ab main your weather tab m aagya huu,toh weather bhi display karna padega,so let's check local storage first

      getfromSessionStorage();     
    }
  }
}
// ek kaam ontime
userTab.addEventListener("click",()=>{
  // passed clicked tab as input element
  switchTab(userTab);
});
searchTab.addEventListener("click",()=>{
  // pass clicked tab as input parameter
  switchTab(searchTab);

});
// check if coordinates are already present in session storage

function getfromSessionStorage(){
  const localCoordinates = sessionStorage.getItem("user-coordinates");

if(!localCoordinates){
  // agar local coordinates nahi mile
  grantAccessContainer.classList.add("active");

}
else{
  const coordinates = JSON.parse(localCoordinates);
  fetchUserWeatherInfo(coordinates);
}
}
async function fetchUserWeatherInfo(coordinates){
  const {lat, lon} = coordinates;
  // make grant container invisible
  grantAccessContainer.classList.remove("active");
  // make loader visible
  loadingScreen.classList.add("active");

  // api call

  try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const data = await response.json();

      loadingScreen.classList.remove("active");
      userInfoCont.classList.add("active");
      renderWeatherInfo(data);
  }
  catch(err){
    loadingScreen.classList.remove("active");
    // HW

  }

}
function renderWeatherInfo(weatherInfo){
  // firstly fetch data
  const cityName = document.querySelector("[data-cityName]");
  const countryIcon = document.querySelector("[data-countryIcon]");
  const desc = document.querySelector("[data-weatherDesc]");
  const weatherIcon = document.querySelector("[data-weatherIcon]");
  const temp = document.querySelector("[data-temp]");
  const windspeed = document.querySelector("[data-windspeed]");
  const humidity = document.querySelector("[data-humidity]");
  const cloudiness = document.querySelector("[data-cloudiness]");

  console.log(weatherInfo);
  // fetch vales from weather object and put it in UI elements;
  cityName.innerText = weatherInfo?.name;
  countryIcon.src =`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
desc.innerText = weatherInfo?.weather?.[0]?.description;
weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.main?.temp} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;


}
function getLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition);

    }
    else{
      // hw show an alert for no geoloc support
    }

}
function showPosition(position){
  const userCoordinates = {
  lat: position.corrds.latitude,
  lon: position.coords.longitude,
  }
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);


}
const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation)
const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  let cityName = searchInput.value;

  if(cityName === ""){
    return;
  }
  else
    fetchSearchWeatherInfo(cityName);
});

async function fetchSearchWeatherInfo(city){
  loadingScreen.classList.add("active");
  userInfoCont.classList.remove("active");
  grantAccessContainer.classList.remove("active");
  try{

  const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      loadingScreen.classList.remove("active");
      userInfoCont.classList.add("active");
      renderWeatherInfo(data);

  }
  catch(err){
      // hw



  }

}
// console.log("hello jee babar");
// const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
// function renderwea(data){
//     let newPara =  document.createElement('p');
//     newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`
//     document.body.appendChild(newPara);
// }
// async function fetchWeatherDetails(){
//   try{
//     let city  = "goa";
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

//     const data =  await response.json();
//     console.log("Weather data ->", data);
//     renderwea(data);
//   }
   
   
//    catch(err){

//    }


    
// }
// async function getCustomWear(){
//     try{
//     let latitude = 15.6333;
//     let longitude = 18.3333;
//     let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
//     let data = await result.json();
//     console.log(data);}
//     catch(err){
//         console.log("Error Found " + err);

//     }
// }
// function switchTab(clickedTab){
//   apiErrorContainer.classList.remove("active");
//   if(clickedTab!==currentTab){
//     currentTab = clickedTab;
//     currentTab.classList.add("current-tab");
//     if
//   }


