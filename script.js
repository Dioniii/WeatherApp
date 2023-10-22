let weather = {
    apiKey: "2fa73590fd8b5a4c6e68098ad5625395",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("Denver");

document.getElementById('changeBackground').addEventListener('click', function () {
    const userInput = document.getElementById('searchInput').value;
    const backgroundElement = document.getElementById('backgroundElement');

    // Assuming you have a function or logic to generate the background URL based on user input
    const newBackgroundUrl = generateBackgroundUrl(userInput);

    // Update the background image URL
    backgroundElement.style.backgroundImage = `url(${newBackgroundUrl})`;

    // Optionally, you can add error handling in case the URL is invalid
    if (!newBackgroundUrl) {
        alert('Invalid search or unable to load image.');
        return;
    }
});
function generateBackgroundUrl(userInput) {
    // You can replace this logic with your own, such as fetching images from an API or using a predefined set of images.
    // For example, using a placeholder API like Unsplash:
    return `https://source.unsplash.com/1600x900/?${userInput}`;
}

function generateBackgroundUrl(userInput) {
    const desiredWidth = 1920;
    const desiredHeight = 900;

    // Use a placeholder API like Unsplash to fetch images
    // You can replace this with your preferred image source or search logic
    const apiUrl = `https://source.unsplash.com/${desiredWidth}x${desiredHeight}/?${userInput}`;

    // Create an Image object to load and check the image dimensions
    const img = new Image();
    img.src = apiUrl;

    return new Promise((resolve, reject) => {
        img.onload = function () {
            if (img.width === desiredWidth && img.height === desiredHeight) {
                resolve(apiUrl);
            } else {
                reject('Image does not match the desired dimensions.');
            }
        };

        img.onerror = function () {
            reject('Image could not be loaded.');
        };
    });
}

document.getElementById('changeBackground').addEventListener('click', function () {
    const userInput = document.getElementById('searchInput').value;
    const backgroundElement = document.getElementById('backgroundElement');

    generateBackgroundUrl(userInput)
        .then((newBackgroundUrl) => {
            // Update the background image URL
            backgroundElement.style.backgroundImage = `url(${newBackgroundUrl})`;
        })
        .catch((error) => {
            alert(error);
        });
});

