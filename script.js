/* =====================================================
   WeatherNow - Weather Application
   Built with HTML, CSS and JavaScript
   ===================================================== */


/* ================= API CONFIGURATION ================= */

/*
   Get your API key from OpenWeather.

   Replace the value below with your own API key.
*/

const API_KEY = "YOUR_API_KEY_HERE";

const API_URL =
    "https://api.openweathermap.org/data/2.5/weather";


/* ================= DOM ELEMENTS ================= */

const searchForm =
    document.getElementById("searchForm");

const cityInput =
    document.getElementById("cityInput");

const locationBtn =
    document.getElementById("locationBtn");

const loading =
    document.getElementById("loading");

const errorMessage =
    document.getElementById("errorMessage");

const errorText =
    document.getElementById("errorText");

const weatherCard =
    document.getElementById("weatherCard");

const emptyState =
    document.getElementById("emptyState");

const cityName =
    document.getElementById("cityName");

const dateElement =
    document.getElementById("date");

const weatherIcon =
    document.getElementById("weatherIcon");

const temperature =
    document.getElementById("temperature");

const weatherDescription =
    document.getElementById(
        "weatherDescription"
    );

const feelsLike =
    document.getElementById("feelsLike");

const humidity =
    document.getElementById("humidity");

const windSpeed =
    document.getElementById("windSpeed");

const pressure =
    document.getElementById("pressure");

const visibility =
    document.getElementById("visibility");

const sunrise =
    document.getElementById("sunrise");

const sunset =
    document.getElementById("sunset");


/* ================= WEATHER ICONS ================= */

const weatherIcons = {

    "01d": "☀️",
    "01n": "🌙",

    "02d": "🌤️",
    "02n": "☁️",

    "03d": "☁️",
    "03n": "☁️",

    "04d": "☁️",
    "04n": "☁️",

    "09d": "🌧️",
    "09n": "🌧️",

    "10d": "🌦️",
    "10n": "🌧️",

    "11d": "⛈️",
    "11n": "⛈️",

    "13d": "❄️",
    "13n": "❄️",

    "50d": "🌫️",
    "50n": "🌫️"

};


/* ================= FORM SUBMIT ================= */

searchForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const city =
            cityInput.value.trim();

        if (!city) {

            showError(
                "Please enter a city name."
            );

            return;

        }

        getWeatherByCity(city);

    }
);


/* ================= GET WEATHER BY CITY ================= */

async function getWeatherByCity(city) {

    if (
        API_KEY ===
        "YOUR_API_KEY_HERE"
    ) {

        showError(
            "Please add your OpenWeather API key in script.js before using the application."
        );

        return;

    }


    showLoading();


    try {

        const url =
            `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;


        const response =
            await fetch(url);


        if (!response.ok) {

            if (response.status === 404) {

                throw new Error(
                    "City not found. Please check the spelling and try again."
                );

            }


            if (response.status === 401) {

                throw new Error(
                    "Invalid API key. Please check your OpenWeather API key."
                );

            }


            throw new Error(
                "Unable to get weather information. Please try again."
            );

        }


        const data =
            await response.json();


        displayWeather(data);


    } catch (error) {

        showError(
            error.message
        );

    } finally {

        hideLoading();

    }

}


/* ================= DISPLAY WEATHER ================= */

function displayWeather(data) {

    hideError();


    /* City */

    cityName.textContent =
        `${data.name}, ${data.sys.country}`;


    /* Date */

    dateElement.textContent =
        formatDate(
            new Date()
        );


    /* Temperature */

    temperature.textContent =
        Math.round(
            data.main.temp
        );


    /* Description */

    weatherDescription.textContent =
        data.weather[0].description;


    /* Feels Like */

    feelsLike.textContent =
        Math.round(
            data.main.feels_like
        );


    /* Humidity */

    humidity.textContent =
        `${data.main.humidity}%`;


    /* Wind */

    windSpeed.textContent =
        `${data.wind.speed} m/s`;


    /* Pressure */

    pressure.textContent =
        `${data.main.pressure} hPa`;


    /* Visibility */

    if (data.visibility) {

        const visibilityKm =
            data.visibility / 1000;

        visibility.textContent =
            `${visibilityKm.toFixed(1)} km`;

    } else {

        visibility.textContent =
            "N/A";

    }


    /* Weather Icon */

    const iconCode =
        data.weather[0].icon;


    weatherIcon.textContent =
        weatherIcons[iconCode] || "🌤️";


    /* Sunrise */

    sunrise.textContent =
        formatTime(
            data.sys.sunrise,
            data.timezone
        );


    /* Sunset */

    sunset.textContent =
        formatTime(
            data.sys.sunset,
            data.timezone
        );


    /* Show card */

    weatherCard.classList.remove(
        "hidden"
    );


    emptyState.classList.add(
        "hidden"
    );

}


/* ================= FORMAT DATE ================= */

function formatDate(date) {

    return date.toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

}


/* ================= FORMAT TIME ================= */

function formatTime(
    timestamp,
    timezoneOffset
) {

    /*
       OpenWeather timestamps are Unix
       timestamps in UTC.

       Convert them according to the
       city's timezone offset.
    */

    const utcMilliseconds =
        timestamp * 1000;


    const date =
        new Date(
            utcMilliseconds
        );


    const localMilliseconds =
        utcMilliseconds +
        timezoneOffset * 1000;


    const localDate =
        new Date(
            localMilliseconds
        );


    return localDate.toLocaleTimeString(
        "en-IN",
        {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC"
        }
    );

}


/* ================= SHOW LOADING ================= */

function showLoading() {

    loading.classList.remove(
        "hidden"
    );

    weatherCard.classList.add(
        "hidden"
    );

    emptyState.classList.add(
        "hidden"
    );

    hideError();

}


/* ================= HIDE LOADING ================= */

function hideLoading() {

    loading.classList.add(
        "hidden"
    );

}


/* ================= SHOW ERROR ================= */

function showError(message) {

    errorText.textContent =
        message;

    errorMessage.classList.remove(
        "hidden"
    );

    weatherCard.classList.add(
        "hidden"
    );

    emptyState.classList.add(
        "hidden"
    );

}


/* ================= HIDE ERROR ================= */

function hideError() {

    errorMessage.classList.add(
        "hidden"
    );

}


/* ================= CURRENT LOCATION ================= */

locationBtn.addEventListener(
    "click",
    function () {

        if (
            API_KEY ===
            "YOUR_API_KEY_HERE"
        ) {

            showError(
                "Please add your OpenWeather API key in script.js first."
            );

            return;

        }


        if (!navigator.geolocation) {

            showError(
                "Geolocation is not supported by your browser."
            );

            return;

        }


        showLoading();


        navigator.geolocation.getCurrentPosition(

            function (position) {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;


                getWeatherByCoordinates(
                    latitude,
                    longitude
                );

            },

            function () {

                hideLoading();

                showError(
                    "Unable to access your location. Please allow location permission or search for a city manually."
                );

            }

        );

    }
);


/* ================= WEATHER BY COORDINATES ================= */

async function getWeatherByCoordinates(
    latitude,
    longitude
) {

    try {

        const url =
            `${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Unable to get weather for your current location."
            );

        }


        const data =
            await response.json();


        displayWeather(data);


    } catch (error) {

        showError(
            error.message
        );

    } finally {

        hideLoading();

    }

}


/* ================= ENTER KEY ================= */

cityInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter"
        ) {

            searchForm.requestSubmit();

        }

    }
);