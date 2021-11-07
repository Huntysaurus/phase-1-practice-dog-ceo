console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function(){

    let dogUL = document.querySelector("#dog-breeds")


    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(res => res.json())
    .then(handleImageAppending)

    fetch("https://dog.ceo/api/breeds/list/all")
    .then(res => res.json())
    .then(res => {
        let dogBreedsArr = Object.keys(res.message)
        dogBreedsArr.forEach((breed) => {
            dogUL.innerHTML += `<li data-info="breed">${breed}</li>`
        })
    })

    dogUL.addEventListener("click", function(e){
        if (e.target.dataset.info === "breed") {
            e.target.style.color = "pink"
        }
    })

    let dogSelect = document.getElementById('breed-dropdown')
    dogSelect.addEventListener('change', (e) => {
        fetch("https://dog.ceo/api/breeds/list/all")
        .then(res => res.json())
        .then(res => {
                let dogBreedsArr = Object.keys(res.message)

                let filteredArray = dogBreedsArr.filter(breed => {
                    return breed.startsWith(e.target.value)
                })

                dogUL.innerHTML = ""

                filteredArray.forEach((breed) => {
                    dogUL.innerHTML += `<li data-info="breed">${breed}</li>`

            })
        })
    })

    //DOMContentLoaded
})

function handleImageAppending(jsonObject){
    let dogImageContainer = document.getElementById('dog-image-container')
    let arrOfDogURLs = jsonObject.message
    arrOfDogURLs.forEach(url => {
        dogImageContainer.innerHTML += makeImageTagString(url)
    })
}

function makeImageTagString(url){
    return `<img src="${url}"/>`
}
