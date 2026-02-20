import '/src/scass/main.scss'

document.addEventListener("DOMContentLoaded", () => {
    init();
})

function init() {
    showSidebar();
    hideSidebar();
    startHeart();
    startBounce();
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

    loveBtn.addEventListener("click", () => {
        heart.classList.toggle("animate");
    })
}

function startBounce() {
    const textbox = document.querySelector(".best-test")
    const bars = document.querySelectorAll(".bar")

    textbox.addEventListener("mouseenter", () => {
        bars.forEach(bar => {
            bar.classList.toggle("bar-animation");
        });
    });
}