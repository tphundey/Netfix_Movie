import instance from "./instance";


const getAllUser = () => {
    return instance.get('/user')
}

const addUser = (user: any) => {
    return instance.post('/user', user)
}

export { getAllUser , addUser}