console.log("loadmore.js loaded")

let postNumber = 5
let response = ""

const loadMore = document.querySelector("#loadMore")
loadMore.addEventListener("click", async () => {
    postNumber += 5;

    console.log("PostNumber = "+ postNumber)

    
    response = await fetch ("http://localhost:3000/posts", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: postNumber,
        }),
    })
    if (response.ok) {
        console.log("successful api call")
        let data = await response.json()
        console.log(typeof(data))
        document.querySelector("#main-cont").innerHTML = data.html;
    }
    else console.log("idk man it didn't work")
})