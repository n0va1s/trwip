import axios from 'axios'

export default {
  async uploadDisposable (image) {
    let data = new window.FormData()
    let config = {
      method: 'POST'
    }
    data.append('file', image)
    return axios.post('/api/image-upload',
      data,
      config
    )
  },
  async getImage (imageName) {
    return axios.get('/uploads/' + imageName)
  }
}
