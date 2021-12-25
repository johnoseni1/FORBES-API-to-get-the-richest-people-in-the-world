// ACCESSING THE DOM
const board = document.getElementById('d__frame');
const loaderContainer = document.getElementById('loader-container');


// SHOW LOADER TO THE USER BEFORE DATA IS BEEN FETCHED
const loader=(callBack)=>{
    // SHOW SPINNER
    loaderContainer.innerHTML = (`<i class="fas fa-spinner fa-pulse"></i>`);
    // FETCH THE DATA
    callBack();
};



// FUNCTION TO GET THE LIST OF BILLIONNAIRES
const fetchData=()=>{
    // RETURN THE FETCH METHOD
    return fetch('https://forbes400.herokuapp.com/api/forbes400?limit=400')
    .then(response => response.json())
    .then(data =>{
        // POPULATET THE RESPONSE JSON DATA TO THE UI
        profileCard(data);
        // HIDE THE LOADER
        loaderContainer.style.display = 'none';
        // RETURN THE RESPONSE JSON DATA
        return data
    }) 
    .catch(err =>{
        // IF THERE IS AN ERROR, INFORM THE USER
        loaderContainer.innerHTML = (`
        <i class="fas fa-spinner fa-pulse"></i>
        <span class="errorMessage">
            Error fetching data...check your internet connection
        </span> `);
    })
};




// FUNCTION TO POPULATE THE USER RECORD TO THE UI (CARD)
function profileCard(data, isSearchResult) {
    // SHUFFLE THE IMAGE RADIUS
    var imageStyle = [],
    imageIndex = 0;
    imageStyle[0] = `zeroRadius`;
    imageStyle[1] = `circleRadius`;
    imageIndex = Math.floor(Math.random() * imageStyle.length);
    

    
    // TEMPORARY USER RECORD HOLDER
    let tempProfileHolder = '';
    // LOOP THROUGH THE LIST OF BILLIONAIRES
    for (index = 0; index < data.length; index++) {
        // src=${data[index].thumbnail === undefined ? data[index].squareImage : data[index].thumbnail} 
        const currentUserPosition= data[index].position;
        // CREATE A CARD FOR EACH BILLIONAIRES AND JOIN THEM TO THE TEMPORARY CARD
        tempProfileHolder += `
            <div class="profile-card  ${imageStyle[imageIndex]}">
                <img 
                    src=${data[index].thumbnail !== undefined ? data[index].squareImage : data[index].squareImage} 
                    alt="${data[index].person.name}" 
                    style="width:100%"
                    class="${isSearchResult ? 'activeResult' : imageStyle[imageIndex]}"
                >
                <div class="profile-info">
                    <h1>${data[index].person.name}</h1>
                    <p class="title">CEO & Founder, ${data[index].source}</p>
                </div>
                <div style="margin: 24px 0;">
                    <b>Rank</b> <i>${data[index].rank}</i>
                </div>
                <p><button onclick="showProfile(${currentUserPosition})" class="view-btn btn_${currentUserPosition}">View</button></p>
            </div>
        `
    }
    // POPULATE ALL GENERATED CARD TO THE BOARD ELEMENT
    board.innerHTML = tempProfileHolder;
}

// LISTEN FOR ENTER BUTTON

var searchByName = document.querySelector(".lookup__name");
searchByName.addEventListener("keyup", (event)=> {
    event.preventDefault()
    if(event.keyCode === 13){
        console.log('kkkkkkk');
        lookUpName()
        // document.querySelector(".searchForm").submit();
        return false
    }
    
})

// SEARCH FUNCTION
const lookUpName = () =>{
    // GET THE SEARCH NAME
    var searchByName = document.querySelector(".lookup__name").value;
    // GET THE RESPONSE MESSAGE ELEMENT
    const resultMessageHolder = document.querySelector("#result__message");
    // GET THE SEARCH-ICON
    const searchIcon = document.querySelector(".fa-search");
    // GET THE SEARCH WRAPPER
    const searchWrapper = document.getElementById('search-wrapper');
    // GET THE SEARCH HEADING
    const searchHeading = document.getElementById('search-heading');
    // ADD ACTIVE TO SEARCH ICON TO SHOW LOADING
    searchIcon.classList.add("active")
    // CHANGE THE BACKGROUND OF THE SEARCH MODAL TO WHITE
    searchWrapper.style.background = '#fff';
    // CHANGE THE COLOR OF THE SEARCH MODAL TO BLACK
    searchHeading.style.color = '#333';

    
    // FETCH THE USERS FROM THE ENDPOINT
    fetchData()
    .then((response)=>{
        // FILTER THE RESPONSE TO GET THE SEARCHED NAME
        const searchResult = response.filter((e)=>e.person.name.toLowerCase() === searchByName.toLowerCase())
        // CHECK IF THERE IS A RESULT
        if(searchResult.length >= 1){
            // NOTIFY THE USER THERE IS A RESULT
            resultMessageHolder.innerHTML = `Record Found for ${searchByName.toUpperCase()}`
            // POPULATE THE SEARCH RESULT TO THE UI
            profileCard(searchResult, isSearchResult=true)
            // REMOVE ACTIVE FROM SEARCH ICON TO SHOW DONE LOADING
            searchIcon.classList.remove("active")
            // CHANGE THE SEARCH MODAL BACKGROUND TO DEFAULT
            searchWrapper.style.background = '#181716';
            // CHANGE THE SEARCH HEADING COLOR TO DEFAULT
            searchHeading.style.color = '#fff';
            
            
            // CLOSE THE MODAL
            setTimeout(() => {
                closeSearchModal()
            }, 2000);
        }else{
            // REMOVE ACTIVE FROM SEARCH ICON TO SHOW DONE LOADING
            searchIcon.classList.remove("active")
            // CHANGE THE SEARCH MODAL BACKGROUND TO DEFAULT
            searchWrapper.style.background = '#181716';
            // CHANGE THE SEARCH HEADING COLOR TO DEFAULT
            searchHeading.style.color = '#fff';


            // IF NO RECORD IS FOUND, INFORM THE USER
            resultMessageHolder.innerHTML = `No Record Found for ${searchByName.toUpperCase()}`
        }
    })
    .catch((error)=>{
        console.log(error);
        // GET THE SEARCH INPUT
        var searchInput = document.querySelector(".lookup__name");
        // GET THE SEARCH ICON CONTAINER WITH THE RED BACKGROUND
        const searchIconWrapper = document.querySelector(".search-icon-wrapper");
        // ADD BORDER TO THE INPUT BOX TO MAKE  IT MORE VISIBLE
        searchInput.style.border = "1px solid #222";
        // ADD BORDER TO THE SEARCH BUTTON TO MAKE IT SAME HEIGHT WITH THE INPUT
        searchIconWrapper.style.border = "1px solid red";
        // ADD COLOR TO CLOSE ICON TO MAKE IT MORE VISIBLE
        searchCloseIcon.style.color = "#222";


        // IF ERROR OCCUR DURING FETCH, INFORM THE USER
        resultMessageHolder.innerHTML = (`
        <span class="errorMessage-dark">
            Unable to retrieve data...check your internet connection
            <i class="fas fa-spinner fa-pulse"></i>
        </span> `);
    })
}



// INVOKE THE LOADER AND PASS THE FETCH FUNCTION AS A CALLBACK
loader(fetchData)
