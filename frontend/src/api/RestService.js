import axios from 'axios'

export default class RestService {
    findAll(params, endpoint) {
        return axios.get(endpoint, params).then(res => res.data)
    }

    create(data, endpoint) {
        return axios.post(endpoint, data).then(res => res.data)
    }

    sendForm(data, endpoint, options) {
    	console.log('sended data ',data)
        return axios.post(endpoint, data, options).then(res => res.data)
    }

    update(data, endpoint) {
        return axios.put(endpoint, data).then(res => res.data)
    }

    delete(data, endpoint) {
        console.log('data: ', data)
        return axios.delete(endpoint, {
            data: data
        }).then(res => res.data)
    }
}
