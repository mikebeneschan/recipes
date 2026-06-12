// easter eggs for the search bar
// if you want a cookie, enter "secret cookie" into the search bar

export function eggQuery (qRaw) {
    let q = qRaw.toLowerCase()
    if(q=="mike" || q=="mike beneschan"){
        return "Hey, that's me!"
    }
    if (q=="michael beneschan"){
        return "Please just call me Mike."
    }
    if (q=="knock knock"){
        return "Who's there?"
    }
    if (q.includes("; select") || q.includes("; drop") || q.includes(";select") || q.includes(";drop")){
        return "are you trying to do SQL injection on my website??"
    }
    if (q=="up up down down left right left right b a start"){
        return "The Konami code?? Okay unc"
    }
    if (q=="secret cookie"){
        return "Congratulations on fidning the secret cookie! Here you go 🍪"
    }
    if (q.includes("yoghurt") || q.includes("aubergine") || q.includes("courgette")){
        return "Are you perchance British?"
    }
}