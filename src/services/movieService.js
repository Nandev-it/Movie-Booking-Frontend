import api from './api'

export const getMovies = () => {
    return api.get('/movies')
}

export const getMovie = (id) => {
    return api.get(`/movies/${id}`)
}

export const createMovie = (data) => {
    return api.post('/movies', data)
}

export const updateMovie = (id, data) => {
    return api.put(`/movies/${id}`, data)
}

export const deleteMovie = (id) => {
    return api.delete(`/movies/${id}`)
}