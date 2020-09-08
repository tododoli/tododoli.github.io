import axios from "axios";

const instance = axios.create(
    {
        baseURL: "https://todo-list-4b27a.firebaseio.com/",
        withCredentials: false
    }
)
export const API = {
    fetchList: (id) => {
        return instance.get(`storage/${id}.json`).then(r=>r.data)
    },
    addTask: (id, text) => {
        return instance.post(`storage/${id}/items.json`, {text: text, done: false}).then(r=>r.data)
    },
    createList: (title, color) => {
        return instance.post('storage.json', JSON.stringify({name: title, color: color, items: []})).then(r=>r.data)
    },
    editTask: (listId, taskId, task) => {
        return instance.patch(`storage/${listId}/items/${taskId}.json`, {text: task.text, done: task.done}).then(r=>r.data)
    },
    deleteTask: (listId, taskId) => {
        return instance.delete(`storage/${listId}/items/${taskId}.json`).then(r=>r.data)
    },
    renameList: (listId, newName) => {
        return instance.patch(`storage/${listId}.json`, {name: newName}).then(r=>r.data)
    },
    createUser: () => {
        return instance.post(`pins.json`, {pins: {}}).then(r=>r.data)
    },
    fetchPins: (userId) => {
        return instance.get(`pins/${userId}.json`).then(r=>r.data)
    },
    setPins: (userId, pins) => {
        return instance.patch(`pins/${userId}.json`, {pins: pins}).then(r=>r.data)
    }

}
window.API = API;

