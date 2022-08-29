require('dotenv').config();
const {
    REACT_APP_YOUR_API_KEY
} = process.env;

export const GET_ALL_BREEDS = 'GET_ALL_BREEDS'
export const GET_BREED_BY_NAME = 'GET_BREED_BY_NAME'
export const GET_ALL_TEMPERAMENTS = 'GET_ALL_TEMPERAMENTS'
export const FILTER_BREEDS_BY_TEMPERAMENT = 'FILTER_BREEDS_BY_TEMPERAMENT'
// export const FILTER_BREEDS_BY_API_DB = 'FILTER_BREEDS_BY_API_DB'
// export const GET_ALL_BREEDS_FROM_DB = 'GET_ALL_BREEDS_FROM_DB'
// export const GET_ALL_BREEDS_FROM_API = 'GET_ALL_BREEDS_FROM_API'
export const SORT_BY_NAME = 'SORT_BY_NAME'
export const SORT_BY_WEIGHT = 'SORT_BY_WEIGHT'
export const SORT_BY_DB_FIRST = 'SORT_BY_DB_FIRST'

function mapFromApi(array) {
    return array.map(breed => ({
        id: breed.id ? breed.id : '',
        name: breed.name ? breed.name : '',
        minHeight: breed.height.metric ? parseFloat(breed.height.metric.split(' ')[0]) : '',
        maxHeight: breed.height.metric ? parseFloat(breed.height.metric.split(' ').slice(-1)[0]) : '',
        minWeight: breed.weight.metric ? parseFloat(breed.weight.metric.split(' ')[0]) : '',
        maxWeight: breed.weight.metric ? parseFloat(breed.weight.metric.split(' ').slice(-1)[0]) : '',
        startLifeSpan: breed.life_span ? parseInt(breed.life_span.split(' ')[0]) : '',
        endLifeSpan: breed.life_span ? parseInt(breed.life_span.includes('-') ? breed.life_span.split(' ')[2] : breed.life_span.split(' ')[0]) : '',
        image: breed.image ? breed.image.url : '',
        temperament: breed.temperament
    }))
}

export const getAllBreeds = (apiDb) => {
    if (apiDb === 'API') {
        return function (dispatch) {
            return fetch(`https://api.thedogapi.com/v1/breeds?api_key=${REACT_APP_YOUR_API_KEY}`).then(res => res.json()).then(res => { dispatch({ type: GET_ALL_BREEDS, payload: mapFromApi(res) }) }).catch(err => console.log(err))
        }
    }
    else if (apiDb === 'DB') {
        return function (dispatch) {
            return fetch(`http://localhost:3001/dogs`).then(res => res.json()).then(res => { dispatch({ type: GET_ALL_BREEDS, payload: res }) }).catch(err => console.log(err))
        }
    }
    return function (dispatch) {
        let db = [];
        return fetch(`http://localhost:3001/dogs`).then(res => res.json()).then(res => db = res).catch(err => console.log(err)).finally(() => fetch(`https://api.thedogapi.com/v1/breeds?api_key=${REACT_APP_YOUR_API_KEY}`).then(res => res.json()).then(res => { dispatch({ type: GET_ALL_BREEDS, payload: db.concat(mapFromApi(res)) }) }).catch(err => console.log(err)))
    }
}

export const getBreedsByName = (name, apiDb) => {
    // if (apiDb === 'API') {
    //     return function (dispatch) {
    //         return fetch(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${REACT_APP_YOUR_API_KEY}`).then(res => res.json()).then(res => { dispatch({ type: GET_ALL_BREEDS, payload: mapFromApi(res) }) }).catch(err => console.log(err))
    //     }
    // }
    if (apiDb === 'API') {
        return function (dispatch) {
            return fetch(`https://api.thedogapi.com/v1/breeds?api_key=${REACT_APP_YOUR_API_KEY}`).then(res => res.json()).then(res => { dispatch({ type: GET_ALL_BREEDS, payload: mapFromApi(res).filter(breed => breed.name.toLowerCase().includes(name)) }) }).catch(err => console.log(err))
        }
    }
    else if (apiDb === 'DB') {
        return function (dispatch) {
            return fetch(`http://localhost:3001/dogs/name?name=${name}`).then(res => res.json()).then(res => { dispatch({ type: GET_ALL_BREEDS, payload: res }) }).catch(err => console.log(err))
        }
    }
    return function (dispatch) {
        let db = [];
        return fetch(`http://localhost:3001/dogs/name?name=${name}`).then(res => res.json()).then(res => db = res).catch(err => console.log(err)).finally(() => fetch(`https://api.thedogapi.com/v1/breeds?api_key=${REACT_APP_YOUR_API_KEY}`).then(res => res.json()).then(res => { dispatch({ type: GET_BREED_BY_NAME, payload: db.concat(mapFromApi(res).filter(breed => breed.name.toLowerCase().includes(name))) }) }).catch(err => console.log(err)))
    }
}

export const getAllTemperaments = () => {
    return function (dispatch) {
        return fetch(`http://localhost:3001/temperaments`).then(res => res.json()).then(res => { dispatch({ type: GET_ALL_TEMPERAMENTS, payload: res }) })
    }
}

export const filterBreedsByTemperament = (temperament) => {
    return {
        type: FILTER_BREEDS_BY_TEMPERAMENT,
        payload: temperament
    }
}

export const sort = (value, ascDes) => {
    if (value === 'name') {
        return {
            type: SORT_BY_NAME,
            payload: ascDes
        }
    }
    if (value === 'weight') {
        return {
            type: SORT_BY_WEIGHT,
            payload: ascDes
        }
    }
    return {
        type: SORT_BY_DB_FIRST
    }
}

// export const filterBreedsByApiDb = (apiDb) => {
//     return {
//         type: FILTER_BREEDS_BY_API_DB,
//         payload: apiDb
//     }
// }

// export const getAllBreedsFromDB = () => {
//     return function (dispatch) {
//         return fetch(`http://localhost:3001/dogs`).then(res => res.json()).then(res => { dispatch({ type: GET_ALL_BREEDS_FROM_DB, payload: res }) }).catch(err => console.log(err))
//     }
// }

// export const getAllBreedsFromAPI = () => {
//     return function (dispatch) {
//         return fetch(`https://api.thedogapi.com/v1/breeds?api_key=${REACT_APP_YOUR_API_KEY}`).then(res => res.json()).then(res => { dispatch({ type: GET_ALL_BREEDS_FROM_API, payload: res }) }).catch(err => console.log(err))
//     }
// }