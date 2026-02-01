console.log("darkmode.js loaded")
let darkmode = localStorage.getItem('darkmode')
const switcher = document.getElementById('dm-switcher')
const subheader = document.getElementById("subheader")

const enableDarkMode = () => {
    let gerald = document.getElementById("catimgcont")
    darkmode = localStorage.getItem('darkmode')
    document.body.classList.add("dark-mode")
    if (subheader) {
        subheader.classList.add("dark-mode")
        subheader.innerHTML = "This is the homepage (now in dark mode) 🌙"
    }
    if (gerald) {
        gerald.classList.add("dark-mode")
        gerald.innerHTML = "<img id=\"gerald\" src = \"/images/catnothingheredarkmode.png\" style = \"height: 350px; width: auto; text-align: center;\" alt=\"crude drawing of a cat saying the following: Nothing here! Wow, dark mode! \">"
    }
    localStorage.setItem('darkmode', 'true')

}

const disableDarkMode = () => {
    const gerald = document.getElementById("catimgcont")
    darkmode = localStorage.getItem('darkmode')
    document.body.classList.remove("dark-mode")
    localStorage.setItem('darkmode', null)
    if (subheader) {
        subheader.classList.remove("dark-mode")
        subheader.innerHTML = "This is the homepage"
    }
    if (gerald) {
        gerald.classList.remove("dark-mode")
        gerald.innerHTML = "<img id=\"gerald\" src = \"/images/catnothinghere.png\" style = \"height: 350px; width: auto; text-align: center;\" alt=\"crude drawing of a cat saying the following: Nothing here! \">"
    }
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

    // if(document.getElementById("subheader")){
    //   document.getElementById("subheader").classList.toggle("dark-mode")
    //   var subh = document.getElementById("subheader")
    //   if (subh.classList.contains("dark-mode")) {subh.innerHTML = "This is the homepage (now in dark mode) 🌙"}
    //   else {subh.innerHTML = "This is the homepage"}
    // }
})

if (darkmode==="true"){
    enableDarkMode()
}