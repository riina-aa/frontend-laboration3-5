import '/src/scass/main.scss'
import Chart from 'chart.js/auto'

document.addEventListener("DOMContentLoaded", async () => {
    init();
})

let map = L.map('map').setView([59.32938, 18.06871], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function init() {
    showSidebar();
    hideSidebar();
    startHeart();
    startBounce();
    getData();
    const searchPlaceBtn = document.querySelector("#searchPlaceBtn");

    if (!searchPlaceBtn) return;

    searchPlaceBtn.addEventListener("click", () => {
        fetchCordinates();
    });
}

function showSidebar() {
    const menuLi = document.querySelector("#open-menu-li")
    const sidebar = document.querySelector(".side-menu")

    menuLi.addEventListener("click", () => {
        sidebar.style.display = "flex"
    });
}

function hideSidebar() {
    const menuLi = document.querySelector("#close-menu-li")
    const sidebar = document.querySelector(".side-menu")

    menuLi.addEventListener("click", () => {
        sidebar.style.display = "none"
    });
}

function startHeart() {
    const loveBtn = document.querySelector("#love-btn");
    const heart = document.querySelector(".heart")

    if (!loveBtn || !heart) return;

    loveBtn.addEventListener("click", () => {
        heart.classList.toggle("animate");
    })
}

function startBounce() {
    const textbox = document.querySelector(".best-test")
    const bars = document.querySelectorAll(".bar")

    if (!textbox || bars.length === 0) return;

    textbox.addEventListener("mouseenter", () => {
        bars.forEach(bar => {
            bar.classList.toggle("bar-animation");
        });
    });
}

/**
 * Hämtar ett fetch-anrop och lagrar informationen i en global variabel. Som sedan anropar en ny funktion med variabeln som argument.
 * 
 * 
 */

let antagningData = [];

async function getData() {
    const url = "https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json"

    try {
        const response = await fetch(url);
        antagningData = await response.json();

        filterData(antagningData);

    } catch (error) {
        console.error("Felmeddelande:" + error);
    }
}

function filterData(data) {

    let kurser = data.filter(kurs => kurs.type === "Kurs");
    let program = data.filter(program => program.type === "Program");

    kurser.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    program.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

    let toppKurser = kurser.slice(0, 6);
    let toppProgram = program.slice(0, 5);

    displayKursData(toppKurser);
    displayProgramData(toppProgram);
}


function displayKursData(kurs) {

    const canvas = document.getElementById("stapeldiagram");
    if (!canvas) return;

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: kurs.map(k => k.name),
            datasets: [{
                label: 'Totalt antal sökande:',
                data: kurs.map(k => k.applicantsTotal),
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(255, 159, 64)',
                    'rgba(255, 205, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(54, 162, 235)',
                    'rgba(153, 102, 255)',
                    'rgba(201, 203, 207)'
                ]
            }
            ]
        }
    }
    );
};

function displayProgramData(program) {

    const canvas = document.getElementById("stapeldiagram");
    if (!canvas) return;

    new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: program.map(p => p.name),
            datasets: [{
                label: 'Totalt antal sökande:',
                data: program.map(p => p.applicantsTotal),
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(255, 159, 64)',
                    'rgba(255, 205, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(54, 162, 235)',
                ]
            }
            ]
        }
    }
    );

    if (!cirkeldiagram === 0) return;
};


async function fetchCordinates() {

    let url = "https://geocoding-api.open-meteo.com/v1/search?";
    let searchPlace = document.querySelector("#search-place").value;

    try {
        const response = await fetch(url + `name=${searchPlace}&count=1&language=en&format=json`);
        let data = await response.json();

        console.log(data);

        let latitude = data.results[0].latitude
        let longitude = data.results[0].longitude
        let name = data.results[0].name

        displayPlace(latitude, longitude, name)

    } catch (error) {
        console.error("Felmeddelande:" + error);
    }
}

function displayPlace(latitude, longitude, name) {

map.setView([latitude, longitude], 13);

let marker = L.marker([latitude, longitude]).addTo(map);

marker.bindPopup(`${name}`).openPopup();

}


