import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
      films: [],
      favorites: [],
      currentPage: 1
    }
  },

  mutations: {
    login(state) {
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = false
    },
    setFilms(state, films) {
      state.films = films
    },
    setFavoriteFilms(state, favorites) {
      state.favorites = favorites
    },
    setCurrentPageOnReboot(state, page) {
      state.currentPage = page
    },
    toggleFavorite(state, film) {
      const index = state.favorites.findIndex(f => f.kinoId === film.kinoId)
      if (index === -1) {
        state.favorites.push(film)
      } else {
        state.favorites.splice(index, 1)
      }
    },
    clearFavoritesList(state) {
      state.favorites = []
    }
  },

  actions: {
    async fetchFilmsList({ commit, state }, query = '') {
      try {
        const apiKey = '8c8e1a50-6322-4135-8875-5d40a5420d86'
        let apiEndpoint = `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=${state.currentPage}`

        if (query) {
          apiEndpoint = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${query}`
        }

        const { data } = await axios.get(apiEndpoint, {
          headers: {
            Accept: 'application/json',
            'X-API-KEY': apiKey
          }
        })

        commit('setFilms', data.items || data.films)
      } catch (error) {
        console.error('Ошибка:', error)
      }
    },

    async fetchFavoriteFilmsList({ commit }) {
      try {
        const { data } = await axios.get('https://1028066ef1030290.mokky.dev/favorites')
        commit('setFavoriteFilms', data)
      } catch (error) {
        console.error('Ошибка при получении избранных фильмов:', error)
      }
    },

    async toggleFavoriteFilm({ commit, state }, film) {
      try {
        const existingFilm = state.favorites.find(f => f.kinoId === film.kinoId)
        if (!existingFilm) {
          await axios.post('https://1028066ef1030290.mokky.dev/favorites', film)
        } else {
          await axios.delete(`https://1028066ef1030290.mokky.dev/favorites/${existingFilm.id}`)
        }
        commit('toggleFavorite', film)
      } catch (error) {
        console.error('Ошибка при обновлении избранного:', error)
      }
    },

    async deleteAllFavoritesList({ commit }) {
      try {
        await axios.patch('https://1028066ef1030290.mokky.dev/favorites', [])
        commit('clearFavoritesList')
      } catch (error) {
        console.error('Ошибка при удалении всех избранных фильмов:', error)
      }
    },

    async checkAuthState({ commit }) {
      const savedIsLoggedIn = localStorage.getItem('isLoggedIn')
      if (savedIsLoggedIn === 'true') {
        commit('login')
      }
    }
  },

  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn
    },
    films(state) {
      return state.films
    },
    favorites(state) {
      return state.favorites
    }
  }
})

export default store