console.log("main.js from public loaded")

const tagArray = []
let response = ""
let searchQuery = ""

const params = new URLSearchParams(window.location.search)
const urlTags = params.get('tags')
const initialQuery = params.get('q')

const resultCont = document.getElementById("resultCont")
const searchInput = document.getElementById('searchinputBig')
const tagList = document.querySelectorAll(".tag")


if (initialQuery) {
    searchInput.value = initialQuery
    searchCall(initialQuery)
}

if (urlTags) {
    tagArray.push(urlTags)
    const tup = document.querySelector(".tag-"+urlTags)
    tup.classList.toggle("get-to-the-top")
    tup.classList.toggle("inactive")
    console.log(tup)
}
tagCall()

// event listeners
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

        const activeQuery = searchInput.value.trim()
        if (activeQuery) {
            searchCall(activeQuery)
        } else {
            tagCall()
        }
    })  

    
});

document.getElementById('searchformBig').onsubmit = function() {
    let q = searchInput.value;
    if (q){
        console.log(q)
        searchCall(q)
    } else {
        renderAll()
    }
    return false;
}


// functions
async function tagCall() {
    // change response to show all recipes if there are no tags selected
    if(tagArray.length===0 && !initialQuery){
        renderAll()
    } else {
        response = await fetch ("/recipe-index/tagFind", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: tagArray,
            }),
        })
    }

    if (response.ok) {
        console.log("successful api call")
        let data = await response.json()
        console.log(data)
        document.querySelector("#tagPostCont").innerHTML = data.html;

        if(resultCont){
            const tagArrayString = tagArray.join(", ")
            if(tagArray.length>0){
                resultCont.innerHTML=`Showing results with tags <div style="border-radius:5px; color: var(--base-color); background-color: var(--background-recipe-color); padding-left: 4px; padding-right: 4px;">${tagArrayString}</div> (${data.count})`
            } else {
                resultCont.innerHTML="Recipes:"
            }
        }            
    } else console.log("idk man it didn't work")
} 

async function searchCall(query) {
    response = await fetch ("/recipe-index/search", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: query,
            tags: tagArray,
        }),        
    })

    if (response.ok) {
        console.log("successful search call")
        let data = await response.json()
        console.log(data)
        document.querySelector("#tagPostCont").innerHTML = data.html;

        if(resultCont){
            let tagMsg = tagArray.length > 0 ? ` with tags <div style="border-radius:5px; color: var(--base-color); background-color: var(--background-recipe-color); padding-left: 4px; padding-right: 4px;">${tagArray.join(", ")}</div>` : ""
            resultCont.innerHTML=`Showing results for <div style="border-radius:5px; color: var(--base-color); background-color: var(--background-recipe-color); padding-left: 4px; padding-right: 4px;">\"${query}\"</div>${tagMsg} (${data.count})`
        }            
    } else console.log("idk man it didn't work")
}

async function renderAll() {
    response = await fetch ("/recipe-index/renderAllPosts", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        console.log("successful api call")
        let data = await response.json()
        console.log(data)
        document.querySelector("#tagPostCont").innerHTML = data.html;

        if(resultCont){
            const tagArrayString = tagArray.join(", ")
            if(tagArray.length>0){
                resultCont.innerHTML=`Showing results with tags <div style="border-radius:5px; color: var(--base-color); background-color: var(--background-recipe-color); padding-left: 4px; padding-right: 4px;">${tagArrayString}</div> (${data.count})`
            } else {
                resultCont.innerHTML="Recipes:"
            }
        }            
    } else console.log("idk man it didn't work")

}
