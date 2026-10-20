const apiKey = "051ba7cc342c0f9e58bfc06720016417";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const resultContainer = document.getElementById("resultContainer");

const cityNameElem = document.getElementById("cityName");
const tempElem = document.getElementById("temp");
const conditionElem = document.getElementById("condition");
const adviceElem = document.getElementById("advice");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=tr&appid=${apiKey}`);
        if (!response.ok) throw new Error("Şehir bulunamadı!");
        
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        alert("Hata: Şehir bulunamadı veya API anahtarı henüz aktifleşmedi! (Yeni aldıysanız birkaç dakika sürebilir)");
    }
}

function updateUI(data) {
    const temp = Math.round(data.main.temp);
    const condition = data.weather[0].description;
    const cityName = data.name;

    cityNameElem.textContent = cityName;
    tempElem.textContent = temp;
    conditionElem.textContent = condition;

    let advice = "";
    if (temp < 5) {
        advice = "Hava buz gibi dostum! Montunu, bereni, atkını kuşanmadan dışarı adım atma. Kat kat giyin!";
    } else if (temp >= 5 && temp < 15) {
        advice = "Hava serin. Hafif bir kaban, deri ceket veya kalın bir hırka işini görür.";
    } else if (temp >= 15 && temp < 24) {
        advice = "Hava oldukça ideal! Üzerine şık bir tişört ve üstüne ince bir ceket alabilirsin.";
    } else {
        advice = "Ortalık yanıyor! Tişört, şort ve güneş gözlüğü kombinleme vakti. Bol su almayı unutma!";
    }

    if (condition.includes("yağmur") || condition.includes("sağanak") || condition.includes("kar")) {
        advice += " ⚠️ **Dikkat:** Yağış var, yanına kesinlikle şemsiye almalısın!";
    }

    adviceElem.textContent = advice;
    resultContainer.classList.remove("hidden");
}