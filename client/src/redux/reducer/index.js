import { FILTER_BREEDS_BY_TEMPERAMENT, GET_ALL_BREEDS, GET_ALL_TEMPERAMENTS, GET_BREED_BY_NAME, SORT_BY_DB_FIRST, SORT_BY_NAME, SORT_BY_WEIGHT } from "../actions"


const initialState = {
    breeds: [],
    breedsFilter: [],
    temperaments: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BREEDS:
            return {
                ...state,
                breeds: action.payload,
            }
        case GET_BREED_BY_NAME:
            return {
                ...state,
                breeds: action.payload,
            }
        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case FILTER_BREEDS_BY_TEMPERAMENT:
            return {
                ...state,
                breedsFilter: state.breeds.filter(breed => typeof breed.id === 'string').filter(breed => breed.temperaments.map(temp => temp.name).includes(action.payload)).concat(state.breeds.filter(breed => breed.temperament && breed.temperament.includes(action.payload)))
            }
        case SORT_BY_NAME:
            return {
                ...state,
                breeds: action.payload === 'asc' ? state.breeds.slice(0).sort((a, b) => a.name.localeCompare(b.name)) : state.breeds.slice(0).sort((a, b) => b.name.localeCompare(a.name))
            }
        case SORT_BY_WEIGHT:
            return {
                ...state,
                breeds: action.payload === 'asc' ? state.breeds.slice(0).sort((a, b) => a.minWeight - b.minWeight) : state.breeds.slice(0).sort((a, b) => b.minWeight - a.minWeight)
            }
        case SORT_BY_DB_FIRST:
            return {
                ...state,
                breeds: state.breeds.filter(breed => typeof breed.id === 'string').concat(state.breeds.filter(breed => typeof breed.id === 'number'))
            }
        default:
            return state;
    }
}

export default rootReducer;