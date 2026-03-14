console.log("main.js from public loaded")

const tagArray = []
let response = ""

const params = new URLSearchParams(window.location.search)
const urlTags = params.get('tags')

console.log(urlTags)
if (urlTags) {
    tagArray.push(urlTags)
    const tup = document.querySelector(".tag-"+urlTags)
    tup.classList.toggle("get-to-the-top")
    tup.classList.toggle("inactive")
    console.log(tup)
}
tagCall()

const tagList = document.querySelectorAll(".tag")
tagList.forEach(e => {
    e.addEventListener("click", async (obj) => {
        let txt = obj.target.textContent

        if(tagArray.includes(txt)){
            let i = tagArray.indexOf(txt);
            tagArray.splice(i,1)
        } else {
            tagArray.push(txt)
        }

        console.log("Valid click: "+ txt)
        e.classList.toggle("inactive")
        e.classList.toggle("get-to-the-top");

        response = await fetch ("/tags/tagFind", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: tagArray,
            }),
        })

        if (response.ok) {
            console.log("successful api call")
            let data = await response.json()
            console.log(data)
            document.querySelector("#tagPostCont").innerHTML = data.html;
        } else console.log("idk man it didn't work")

    })  

    
});

function showSpinner() {
    document.querySelector("#tagPostCont").innerHTML = '<div style="text-align:center"><h2>Loading... <span class="spinner">⌛</span></h2></div>';
}

async function tagCall() {
    response = await fetch ("/tags/tagFind", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: tagArray,
        }),
    })

    if (response.ok) {
        console.log("successful api call")
        let data = await response.json()
        console.log(data)
        document.querySelector("#tagPostCont").innerHTML = data.html;
    } else console.log("idk man it didn't work")
}