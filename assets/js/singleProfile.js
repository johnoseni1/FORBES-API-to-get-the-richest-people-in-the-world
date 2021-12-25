// GET MAIN HTML ELEMENT
const mainTag = document.querySelector('.app-main');

// FUNCTION THAT POPULATE THE PROFILE TO THE UI
const displaySingleUserProfile = (profile) =>{
    // CHANGE THE SEARCH BUTTON TO RETURN BACK
    if(document.querySelector('.single-profile-wrapper')){
        // CHECK IF THE USER IS ON THE SINGLE PROFILE PAGE
        document.querySelector('.right').style.display = "none"
    }else{
        // REMOVE THE EVENTLISTENER ON THE SEARCH BUTTON
        document.querySelector('#search-opener').removeEventListener("click", openSearchModal);
        // CHANGE THE LABEL AND ICON OF THE SEARCH BUTTON AND SET AS HOME BUTTON
        document.querySelector('#search-opener').innerHTML = `<button onclick="window.location.reload()"><i class="fas fa-hand-point-left"></i> Back</button>`
    }
    // GET/DESTRCUTURE THE VALUES FROM PROFILE
    const {
        rank, 
        personName, 
        source, 
        archivedWorth, 
        abouts, 
        bios, 
        industries, 
        gender,
        squareImage  } = profile[0];
    // PROFILE LAYOUT TEMPLATE
    // <li><span>Location: </span>${location}</li>
    // <img src="./assets/img/placeholder.png" alt="">
    let profileHTML = `
        <section class="single-profile-wrapper">
            <section class="section-1">
                <div class="profile__image">
                    <img src="${squareImage}" alt="">
                </div>
                <div class="profile__details">
                    <ul>
                    <li><span>Name: </span> <span class="label">${personName}</span></li>
                        <li><span>Rank: </span> <span class="label">${rank}</span></li>
                        <li><span>Archived Worth: </span> <span class="label">${archivedWorth}</span></li>
                        <li><span>Gender: </span> <span class="label">${gender}</span></li>
                        <li>
                            <span>
                            ${industries.length <= 1 ? "Industry" : "Industries"}: 
                            </span>
                            <span class="label">${industries && industries.map((industry)=>industry)}</span>
                        </li>
                    </ul>
                </div>
            </section>
            <section class="section-2">
                <ul>
                    <li><span>About: </span>${abouts ? abouts.map((about)=>about) : "Not Available"}</li>
                </ul>
                <ul>
                    <li><span>Bios: </span>${bios ? bios.map((bio)=>bio) : "Not Available"}</li>
                </ul>
                <li class="source"><span class="source-lead">Source: </span>${source}
                <strong class="developer source">Created by <a href="https://linktr.ee/johnoseni" target="_blank">John Oseni</strong>
                </li>
            </section>
        </section>
    `
    // SET THE WHOLE USER PROFILE TO THE CONTENT OF THE MAIN HTML ELEMENT
    mainTag.innerHTML = profileHTML
}


const showProfile = (userPosition) =>{
    const viewBtn = document.querySelector(`.btn_${userPosition}`);
    viewBtn.innerHTML = (`<i class="fas fa-spinner fa-pulse"></i>`);
    // console.log(this.userPosition);
    // console.log(userPosition);
    // FETCH THE USERS FROM THE ENDPOINT
    fetchData()
    .then((response)=>{
        // FILTER THE RESPONSE TO GET THE SEARCHED NAME
        const findUser = response.filter((person)=>person.position === userPosition)
        // POPULATE THE SEARCH RESULT TO THE UI
        console.log(findUser);
        displaySingleUserProfile(findUser)
    })
}



