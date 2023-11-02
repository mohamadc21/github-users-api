const apiUrl = 'https://api.github.com/users/';
const form = document.forms[0];
const searchInput = document.getElementById("search");


function createUserCard(user) {
    if(user.location === null) {
        user.location = 'No Location';
    }
    if(user.name === null) {
        user.name = '';
    }
    let container = `
    <div class="container">
        <div class="profile">
            <img src="${user.avatar_url}">
        </div>
        <div class="content">
            <h2 class="userlogin">${user.login}</h2>
            <h5 class="username">${user.name}</h5>
            <p class="bio">bio: ${user.bio}</p>
            <div class="follower-container">
                <p class="followers"><b>${user.followers}</b>  Followers</p>
                <p class="following"><b>${user.following}</b> Following</p>
            </div>
            <p class="location">Location: ${user.location}</p>
        </div>
    </div>
`
    if(user.login === undefined) {
        document.getElementById("main").innerHTML = "<h2 style='margin-top: 2rem'>no user found</h2>";
    } else {
        document.getElementById("main").innerHTML = container;
    }
}

async function getUser(userSearch) {
    try {
        let resp = await fetch(apiUrl + userSearch);
        let respData = await resp.json();
        createUserCard(respData);
    } catch(err) {
        document.getElementById("main").innerHTML = `<h2 style='margin-top: 2rem'>${err.message}</h2>`;
        console.log(err);
    }
    searchInput.value = '';
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    getUser(searchInput.value);
});
