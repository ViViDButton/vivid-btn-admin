import da from "element-ui/src/locale/lang/da";
import {Form} from "element-ui";
import sr from "element-ui/src/locale/lang/sr";

const axios = require('axios')


const server = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 2000,
    withCredentials: true
})

// 获取
export function get_voice(params) {
    return server.get('/get-voice', {
        params
    })
}

export function get_vtb() {
    return server.get('/get-vtb')
}

export function get_group(params) {
    return server.get('/get-group', {params})
}

// 添加

export function add_voice(formData) {
    return server.post('/add-voice', formData)
}

export function add_group(vtb, name, zh, ja, en) {
    let formData = new FormData()
    formData.append('vtb-name', vtb)
    formData.append('name', name)
    formData.append('zh', zh)
    formData.append('ja', ja)
    formData.append('en', en)
    return server.post('/add-group', formData)
}

export function add_vtb(name, bid, yid) {
    let formData = new FormData()
    formData.append('name', name)
    formData.append('bili-id', bid)
    formData.append('youtube-id', yid)
    return server.post('/add-vtuber', formData)
}

//修改

//删除

export function delete_voice(params) {
    return server.get('/del-voice', {params})
}

export function delete_vtb(name) {
    return server.get('/del-vtb', {
        params: {
            'name': name
        }
    })
}

export function delete_group(uid) {
    return server.get('/del-group', {
        params: {
            'id': uid
        }
    })
}

// 鉴权

export function login_status() {
    return server.get('/get-login-status', {
        withCredentials:true
    })
}

export function user_login(formData) {
    return server.post('/user-login', formData, {
        withCredentials:true
    })
}

export function user_logout() {
    return server.post('/user-logout')
}


// 用户操作

export function list_user() {
    return server.post('/list-user')
}

export function change_user_status(uid='') {
    let formData = new FormData()
    formData.append('id', uid)
    return server.post('/change-user-status',formData)
}

export function delete_user(uid='') {
    let formData = new FormData()
    formData.append('id', uid)
    return server.post('/delete-user',formData)
}

export function add_user(user_name, pwd, email, fn, ln, is_super) {
    let super_user = 'false'
    if (is_super)
        super_user = 'true'
    let formData = new FormData()
    formData.append('user_name', user_name)
    formData.append('first_name', fn)
    formData.append('last_name', ln)
    formData.append('email', email)
    formData.append('pwd', pwd)
    formData.append('super', super_user)
    return server.post('/add-user', formData)
}

// 权限管理
export function get_group_list() {
    return server.get('/get-group-list')
}
