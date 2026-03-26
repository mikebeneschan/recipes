console.log("main.js from public loaded")

const tagArray = []
let response = ""

const params = new URLSearchParams(window.location.search)
const urlTags = params.get('tags')

const resultCont = document.getElementById("resultCont")


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

        // change response to show all recipes if there are no tags selected
        if(tagArray.length===0){
            response = await fetch ("/recipe-index/renderAllPosts", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })        
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
            console.log(typeof data)
            console.log(data.length)
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


    })  

    
});


async function tagCall() {

    // change response to show all recipes if there are no tags selected
    if(tagArray.length===0){
        response = await fetch ("/recipe-index/renderAllPosts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })        
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