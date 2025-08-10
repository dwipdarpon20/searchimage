let form = document.querySelector("form");
let input = document.querySelector("input");
let parent = document.querySelector(".cardHolder");
let moreBtn = document.querySelector(".moreBtn");
let clrBtn = document.querySelector(".clear");

let page = 1;
let apiKey = "gQD4WXPxsvGit68LWbBIpdXyvAtuOysTDoy-RSJ8Xxc";
let keyword ;

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    parent.innerHTML ="";
    keyword = input.value;
    input.value = "";
    if (keyword != ""){
        // do something call getImage
        getImage(keyword);
    }else {
        printError("Enter any valid key");
    }
})

async function getImage (keyword){
    let url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${apiKey}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        let results = data.results;
        console.log(results);
        
        results.map((result)=>{
            let newCard = document.createElement("div");
            newCard.classList.add("card");
            // now child img 
            let img = document.createElement("img");
            img.src = result.urls.small;

            // now description
            let desc = document.createElement("p");
            desc.textContent = result.description;

            // now appending all the child

            newCard.appendChild(img);
            newCard.appendChild(desc);

            parent.appendChild(newCard);
        });
    }catch (error){
        printError(error);
    }
}

function printError (message){
    
}

moreBtn.addEventListener("click", function (){
    page+= 1;
    getImage(keyword);
})

clrBtn.addEventListener("click", function(){
    parent.innerHTML="";
})