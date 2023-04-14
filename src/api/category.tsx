import instance from "./instance";
import { ICategory } from "../types/category";

const AddCategory = (category: ICategory) => {
    return instance.post('/category', category)
}
const getAllCategory = () => {
    return instance.get('/category')
}
const getOneCategory = (id: number) => {
    return instance.get('/category/' + id)
}
const deleteCategory = (id: number) => {
    return instance.delete('/category/' + id)
}
const updateCategory = (categori: ICategory) => {
    return instance.put('/category/' + categori.id, categori)
}

export { AddCategory, getAllCategory, getOneCategory, deleteCategory, updateCategory }