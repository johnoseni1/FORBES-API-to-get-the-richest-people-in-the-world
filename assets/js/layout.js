// Access to DOM
const searchModal = document.getElementById('search-modal');
const searchButton = document.getElementById('search-opener');
const searchCloseIcon = document.getElementById('close-search-modal');
const hamburgerButton = document.getElementById('hamburger-btn');
const hamburger = document.getElementById('hamburger');
const navLinkWrapper = document.getElementById('nav-link-wrapper');

// Function that toggles the menu and set hamburger yellow background
const navbarToggle = () =>{
    if(navLinkWrapper.style.display === 'none'){
        navLinkWrapper.style.display = 'block';
        hamburger.style.background = '#ccc333';
        
    }else{
        navLinkWrapper.style.display = 'none';
        hamburger.style.background = '#ffffff';
    }
};

// Function to open search modal
const openSearchModal = () =>{
    searchModal.style.display = 'block';
}

// Function to close search modal
const closeSearchModal = () =>{
    if(searchModal.style.display === 'none'){
        searchModal.style.display = 'block';
    }else{
        searchModal.style.display = 'none'
    }
}

// EventListeners
hamburgerButton.addEventListener('click', navbarToggle);
searchButton.addEventListener('click', openSearchModal)
searchCloseIcon.addEventListener('click', closeSearchModal);


