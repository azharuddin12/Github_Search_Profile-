let userInput = document.getElementById("userInput");

const fetchData = () => {
  if (userInput.value.trim() === "") {
    error.innerText = `Invalid Input`;
  } else {
    card.innerHTML = `<img class="loader" src="./assets/imgs/mona-loading-dark.gif"/>`;
    fetch(`https://api.github.com/users/${userInput.value}`)
      .then((response) => response.json())
      .then((data) => {
        cardData(data);
        console.log(data);
      })
      .catch((error) => {
        card.innerHTML = "";
        console.log(error.message);
        card.innerHTML = `${error.message}`;
      });
  }
};

userInput.addEventListener("keyup", (e) => {
  e.key === "Enter" ? fetchData() : null;
});

let card = document.querySelector(".card-wrapper");
let error = document.querySelector(".error");

function cardData(data) {
  error.innerText = ``;
  userInput.value = "";
  const {
    avatar_url,
    bio,
    name,
    login,
    followers,
    following,
    location,
    html_url,
  } = data;

  card.innerHTML = `
<div class="card">
<img src="${avatar_url}">
${name ? `<h2 class="name">${name}</h2>` : ""}
<p class="userName">${login}</p>
${bio ? `<p class="bio">${bio}` : ""}
  <div class="inner">
    <div class="follow">
      <div class="follower">
        <i class="fa fa-users"></i>
        <p>${followers} followers</p>
      </div>
      <p>${following} following</p>
  </div>${
    location
      ? `<div class="location">
                  <i class="fa fa-location-dot"></i>
                  <p>${location}</p>
              </div>`
      : ""
  }
  </div>
    <a href="${html_url}" target="_blank">Follow</a>
  </div>`;
}
