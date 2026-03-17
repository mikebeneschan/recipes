console.log("darkmode.js loaded")
let darkmode = localStorage.getItem('darkmode')
const switcher = document.getElementById('dm-switcher')
const subheader = document.getElementById("subheader")
const sun = document.getElementById("dm-svg-lm")
const moon = document.getElementById("dm-svg-dm")
const banner = document.getElementById("banner-cont")

const enableDarkMode = () => {
    let gerald = document.getElementById("catimgcont")
    darkmode = localStorage.getItem('darkmode')
    document.body.classList.add("dark-mode")
    if (subheader) {
        subheader.classList.add("dark-mode")
        subheader.innerHTML = "This is the homepage (now in dark mode) 🌙"
    }
    if (gerald) {
        // gerald.classList.add("dark-mode")
        gerald.innerHTML = "<img id=\"gerald\" src = \"/images/catnothingheredarkmode.png\" style = \"height: 350px; width: auto; text-align: center;\" alt=\"crude drawing of a cat saying the following: Nothing here! Wow, dark mode! \">"
    }
    if (banner) {
        // banner.classList.add("dark-mode")
        banner.innerHTML = `
            <img id="banner" class="banner" src = "/images/header-dm.png" style = "height:100px; z-index:2" alt="Mike B. Cooking">
            <img id="bannerAni" class="banner" src = "/images/header-dm-ani.gif" style = "height:100px; z-index:1; opacity:0" alt="Mike B. Cooking">
        `
    }
    bannerAnimation()

    localStorage.setItem('darkmode', 'true')

    sun.style.opacity="0"
    moon.style.opacity="1"

}

const disableDarkMode = () => {
    let gerald = document.getElementById("catimgcont")
    darkmode = localStorage.getItem('darkmode')
    document.body.classList.remove("dark-mode")
    if (subheader) {
        subheader.classList.remove("dark-mode")
        subheader.innerHTML = "This is the homepage"
    }
    if (gerald) {
        gerald.classList.remove("dark-mode")
        gerald.innerHTML = "<img id=\"gerald\" src = \"/images/catnothinghere.png\" style = \"height: 350px; width: auto; text-align: center;\" alt=\"crude drawing of a cat saying the following: Nothing here! \">"
    }
    if (banner) {
        // banner.classList.add("dark-mode")
        banner.innerHTML = `
            <img id="banner" class="banner" src = "/images/header-lm.png" style = "height:100px; z-index:2" alt="Mike B. Cooking">
            <img id="bannerAni" class="banner" src = "/images/header-lm-ani.gif" style = "height:100px; z-index:1; opacity:0" alt="Mike B. Cooking">
            
        `
    }

    bannerAnimation()

    localStorage.setItem('darkmode', null)

    sun.style.opacity="1"
    moon.style.opacity="0"
}

const bannerAnimation = () => {
    //banner animation script
    bannerStatic = document.getElementById("banner")
    bannerAni = document.getElementById("bannerAni")
    bannerStatic.addEventListener('mouseover', ()=> {
        bannerStatic.style.opacity="0"
        bannerAni.style.opacity="1"
    })
    bannerStatic.addEventListener('mouseleave', () => {
        bannerStatic.style.opacity="1"
        bannerAni.style.opacity="0"

    })
}

switcher.addEventListener('click', ()=> {
    console.log("before: "+darkmode)
    console.log('switch clicked darkmode.js')
    if (darkmode=="true"){
        disableDarkMode()
    } else {
        enableDarkMode()
    }
    darkmode = localStorage.getItem('darkmode')
    console.log("after: "+darkmode)

})



if (darkmode==="true"){
    switcher.checked = true;
    enableDarkMode()
}