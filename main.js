// access html elements
const form = document.querySelector("form");
const userInp = document.querySelector("#user-input");
const container = document.querySelector(".container");

// 
async function githubData() {
    try {
        // use await because it takes time to get data from the server
        let responseGitHub = await fetch(`https://api.github.com/users/${userInp.value}/repos`);

        // parse data received from server
        let convertedData = await responseGitHub.json();
        console.log(convertedData);

        // traverse repos
        for (let i = 0; i < convertedData.length; i++) {
            console.log(convertedData[i].name);

            let repoName = convertedData[i].name;
            let description = convertedData[i].description;

            // add all repos name to webpage 
            let p = document.createElement("p");
            p.innerHTML = repoName;
            container.appendChild(p);

            let span = document.createElement("span");
            span.innerHTML = description;
            p.appendChild(span);
        }

    }
    catch (err) {
        console.log(err);
    }
}

form.addEventListener("submit", (e) => {
    // stop page refreshing
    e.preventDefault();

    // check for the user input
    if (userInp.value.trim() === "") {
        alert("Please enter the user name");
    } else {
        // call githubdata function
        githubData();
    }
});
