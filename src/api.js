import qs from 'qs'
import axios from 'axios'

class API {
  constructor () {
    this.apiUrl = 'https://compromis.net/espai/expenses/'
    this.servicesUrl = 'https://services.compromis.net/api/'
  }

  submit (data) {
    return this._call('post', 'submit', data)
  }

  uploadFile (destination, data) {
    return this._call('post', 'fileupload/' + destination, data, true)
  }

  _call (method, path, params, services) {
    const data = method === 'post' && !services ? qs.stringify(params) : params
    const headers = method === 'post' && !services ? { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } : { 'Content-Type': 'multipart/form-data' }
    const baseUrl = services ? this.servicesUrl : this.apiUrl

    return new Promise((resolve, reject) => {
      axios({
        method,
        url: baseUrl + path,
        data,
        headers
      }).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        if (error.response) {
          reject(error.response.data)
        } else {
          const error = { errors: { general: 'Error del servidor. Intenta-ho més tard o contacta amb web@compromis.net' } }
          reject(error)
          alert('Error del servidor. Intenta-ho més tard o contacta amb web@compromis.net')
        }
      })
    })
  }
}

export default new API()