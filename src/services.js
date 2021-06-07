import axios from 'axios'

export const getUserList = async () => {
    const res = await axios.get('http://localhost:5000/user')
    return res.data
}

export const getSingleUser = async (id) => {
    const res = await axios.get(`http://localhost:5000/user/${id}`)
    return res.data
}

export const updateUser = async (id, data) => {
    const res = await axios.put(`http://localhost:5000/user/${id}`, data)
    return res
}

export const deleteUser = async (id) => {
    const res = await axios.delete(`http://localhost:5000/user/${id}`)
    return res
}

export const createUser = async (data) => {
    const res = await axios.post(`http://localhost:5000/user`, data)
    return res
}

export const authenticateUser = async (data) => {
    const res = await axios.post('http://localhost:5000/authenticate', data)
    return res
}