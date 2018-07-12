import axios from 'axios'

export default class RestService {

    create(data, endpoint) {
        return axios.post(endpoint, data).then(res => res.data)
    }

    sendForm(data, endpoint) {
        return axios.post(endpoint, data).then(res => res.data)
    }
}
