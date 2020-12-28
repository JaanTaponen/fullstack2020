import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async (id) => {
    const current = await axios.get(`${baseUrl}/${id}`)
    const updated = current.data
    updated['votes'] += 1
    const response = await axios.put(`${baseUrl}/${id}`, updated)
    //console.log(response)
    return response.data
}


export default { getAll, createNew, update }