let sitePokemonList // list of all pokemons
let pokemonInfoBox //main container

// https://pokeapi.co/api/v2/pokemon-species/{}/ -> Pokemon Species
// https://pokeapi.co/api/v2/pokemon/{}/ -> Pokemon Info
// https://pokeapi.co/api/v2/generation/{}/ -> Era

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
}

const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const prepareDOMElements = () => {
    sitePokemonList = document.querySelector(".poke-list__ul")
    pokemonInfoBox = document.querySelector(".main-info")
}

const prepareDOMEvents = () => {
    fetchPokemonList(1)
        .then((data) => {
            createPokemonList(data)
        })
        .catch((error) => {
            createErrorView(error)
        })
}

/**
 * fetch list of pokemons from i-th generation
 * @param {*} generationID
 * @returns
 */
const fetchPokemonList = async (generationID) => {
    const response = await fetch(`https://pokeapi.co/api/v2/generation/${generationID}/`)
    const responseJSON = await response.json()
    return responseJSON.pokemon_species
}
/**
 * Fetch pokemon name
 * @param {*} pokemonName
 * @returns pokemon's data
 */
const fetchSinglePokemonData = async (pokemonName) => {
    const responseData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    const responseDataJSON = await responseData.json()
    const responseDescription = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`)
    const responseDescriptionJSON = await responseDescription.json()
    let tempText = responseDescriptionJSON.flavor_text_entries
    const resultData = [responseDataJSON.name, responseDataJSON.sprites.front_default, responseDataJSON.types, tempText[getRandomInt(tempText.length)]]
    return resultData
}

/**
 * Checks if data is correct
 * @param {*} pokemonData
 * @returns true/false
 */
const checkPokemonData = (pokemonData) => {
    if (pokemonData.length !== 4) {
        return false
    }
    if (
        pokemonData[0] === "" ||
        pokemonData[0] === undefined ||
        pokemonData[1] === "" ||
        pokemonData[1] === undefined ||
        pokemonData[2] === "" ||
        pokemonData[2] === undefined ||
        pokemonData[3] === "" ||
        pokemonData[3] === undefined
    ) {
        return false
    }
    return true
}
/**
 * Create single pokemon view
 * @param {*} pokemonData
 * @returns
 */
const createSinglePokemonView = (pokemonData) => {
    if (!checkPokemonData(pokemonData)) {
        createErrorView("data")
        return
    }
    pokemonInfoBox.innerHTML = ""
    // h1
    console.log(pokemonData)
    const mainHeading = document.createElement("h1")
    mainHeading.classList.add("main-info__heading")
    mainHeading.innerText = pokemonData[0]
    // img
    const mainImg = document.createElement("img")
    mainImg.classList.add("main-info__img")
    mainImg.alt = `${pokemonData[0]} picture`
    mainImg.src = pokemonData[1]
    // ul
    const mainList = document.createElement("ul")
    mainList.classList.add("main-info__ul")
    // li
    pokemonData[2].forEach((elem) => {
        let newLi = document.createElement("li")
        newLi.classList.add("main-info__li")
        newLi.innerText = elem.type.name
        mainList.appendChild(newLi)
    })
    // p
    const mainP = document.createElement("p")
    mainP.classList.add("main-info__description")
    mainP.innerText = pokemonData[3].flavor_text

    pokemonInfoBox.appendChild(mainHeading)
    pokemonInfoBox.appendChild(mainImg)
    pokemonInfoBox.appendChild(mainList)
    pokemonInfoBox.appendChild(mainP)
}
/**
 * Create error view
 * @param {*} error
 */
const createErrorView = (error) => {
    pokemonInfoBox.innerHTML = ""
    const mainHeading = document.createElement("h1")
    mainHeading.classList.add("main-info__heading", "main-info__heading--error")

    console.log("Error")
    if (error === "data") {
        mainHeading.innerText = "missing data"
    } else {
        mainHeading.innerText = "connection error"
    }
    pokemonInfoBox.appendChild(mainHeading)
}

/**
 * Create view of single pokemon
 * @param {*} pokemonName
 */
const getSinglePokemonView = (pokemonName) => {
    let singlePokemonData = fetchSinglePokemonData(pokemonName)
    singlePokemonData
        .then((data) => {
            createSinglePokemonView(data)
        })
        .catch((error) => {
            createErrorView(error)
        })
}
/**
 * Create list of all pokemons
 * @param {*} pokemonList
 */
const createPokemonList = (pokemonList) => {
    // console.log(pokemonList.length)
    pokemonList.forEach((pokemon) => {
        const newLi = document.createElement("li")
        newLi.classList.add("poke-list__pokemon")
        const newBttn = document.createElement("button")
        newBttn.classList.add("poke-list__button")
        newBttn.innerText = pokemon.name
        // newBttn.addEventListener("click", () => getSinglePokemonView(newBttn.innerText))
        newBttn.addEventListener("click", () => getSinglePokemonView(pokemon.name))
        newLi.appendChild(newBttn)
        sitePokemonList.appendChild(newLi)
    })
}

document.addEventListener("DOMContentLoaded", main)
