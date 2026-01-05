console.log("main.js from public loaded")

const tagArray = [""]
let response = ""

const tagList = document.querySelectorAll(".tag")
tagList.forEach(e => {
    console.log(e) 
    e.addEventListener("click", async () => {
        console.log("Valid click")
        e.classList.toggle("inactive")
        e.classList.toggle("get-to-the-top");

        response = await fetch ("http://localhost:3000/tags/tagFind", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: tagArray,
            }),
        })

        if (response.ok) {console.log("successful api call")} else console.log("idk man it didn't work")
    }) 
});