let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.querySelector("submit").addEventListener("submit", submitNewToy);


//my defining/DOM functions
function submitNewToy(sub) {
  sub.preventDefault()
 let toyObj = {
   name:sub.target.name.value,
   image: sub.target.image.value,
   likes: 0 
 }
 insertToyCard(toyObj)
 createNewToy(toyObj)

}

function insertToyCard(toys) {
  let card = document.createElement("div")
  card.className = 'card'
  card.innerHTML = '\
  <h2>${toys.name}</h2> \
    <img src="${toys.image}" class="toy-avatar" /> \
    <p>${toys.likes} Likes</p> \
    <button class="like-btn" id="${toys.id}">Like ❤️</button> \
  '
 card.querySelector(".like-btn").addEventListener("click", function() {
    toys.likes += 1
    card.querySelector("p").textContent = toys.likes
    updateLikeCount(toys)
 })
 
  document.querySelector("like-btn").appendChild(card);
}
//my fetch functions

function getToys () {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => data.forEach(toy => addToy(toy)));
}

function createNewToy(toyObj) {
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(toyObj)
    })
}

function updateLikeCount(toyObj) {
  fetch("http://localhost:3000/toys/${toyObj.id}", {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
}

function init (){
getToys();
createNewToy(toyObj);

}
init();