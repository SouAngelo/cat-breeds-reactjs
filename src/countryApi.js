import axios from 'axios'

const countryApi = axios.create({
    baseURL: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1'
})

export default countryApi
