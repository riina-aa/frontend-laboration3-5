import '/src/scass/main.scss'
import Chart from 'chart.js/auto'

document.addEventListener("DOMContentLoaded", async () => {
    init();
})

function init() {
    showSidebar();
    hideSidebar();
    startHeart();
    startBounce();
    getData();
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

    new Chart(
        document.getElementById('stapeldiagram'),
        {
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
