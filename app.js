const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const inputSearch = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const buttonSearch = document.querySelector("#searchButton");
const buttonClear = document.querySelector("#clearButton");
const photoListWrapper = document.querySelector(".photoList-wrapper");

runEventListener();

function runEventListener() {
    form.addEventListener("submit", search);
    buttonClear.addEventListener("click", clear);

}

function clear() {
    inputSearch.value = "";
    //Array.from(photoListWrapper.children).forEach((child) => child.remove());
    photoListWrapper.innerHTML = "";
}

function search(e) {
    const value = inputSearch.value.trim();

    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: "GET",
        headers: {
            Authorization: "Client-ID wtfcNLQ0JOLrSyM7jYAQEARQ5TQGZeLt79MnlqRvBrk"
        }
    })
        .then((rest) => rest.json())
        .then((data) => {

            Array.from(data.results).forEach(photo => {
                //console.log(photo.urls.small)
                addImageToUI(photo.urls.small);

            });

        })
        .catch((err) => console.log(err));

    photoListWrapper.innerHTML = "";
    e.preventDefault();


}

function addImageToUI(url) {
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.height = '400';
    img.width = '400';

    div.appendChild(img);
    photoListWrapper.appendChild(div);

}

