import '/src/scass/main.scss'

document.addEventListener("DOMContentLoaded", () => {
    init();
})

function init() {
    showSidebar();
    hideSidebar(); 
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