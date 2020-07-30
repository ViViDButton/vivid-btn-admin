<template>
    <div>
        <el-button type="primary" @click="draw_is_open = true">
            添加用户
        </el-button>

        <el-table :data="user_list">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="用户名"></el-table-column>
            <el-table-column prop="first_name" label="姓"></el-table-column>
            <el-table-column prop="last_name" label="名"></el-table-column>
            <el-table-column prop="email" label="E-mail"></el-table-column>
            <el-table-column
                    prop="is_super"
                    label="管理员等级"
                    width="100"
                    filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.is_super?'primary':'success'"
                            disable-transitions>{{scope.row.is_super?'超级管理员':'管理员'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="is_active"
                    label="状态"
                    width="100"
                    filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.is_active ? 'primary' : 'danger'"
                            disable-transitions>{{scope.row.is_active? '活动的':'已禁用'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="250px">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="">编辑</el-button>
                    <el-button
                            size="mini"
                            :type="scope.row.is_active? 'danger':'primary'"
                            @click="change_status(scope.row.id)">{{ scope.row.is_active? '禁用':'启用' }}</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="delete_user(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-drawer destroy-on-close ref="addUserDraw" title="添加用户" :visible.sync="draw_is_open" direction="btt" size="80%">
            <add_user @add-user-done="$refs.addUserDraw.closeDrawer();update_list()"></add_user>
        </el-drawer>
    </div>
</template>

<script>
    import {list_user, change_user_status, delete_user} from "../network";
    import add_user from "../components/user-manage/add_user";

    export default {
        name: "user_manager",
        data() {
            return {
                user_list: [],
                draw_is_open: false
            }
        },
        components: {
          add_user
        },
        methods: {
            update_list() {
                list_user().then(resp => {
                    if (resp.data.code === 403)
                        this.$message.error(resp.data.message)
                    else
                        this.user_list = resp.data.list
                })
            },
            change_status(uid) {
                change_user_status(uid).then(resp => {
                    if(resp.data.code === 403)
                        this.$message.error(resp.data.message)
                    else
                        this.update_list()
                })
            },
            delete_user(uid) {
                delete_user(uid).then(resp => {
                    if(resp.data.code === 403)
                        this.$message.error(resp.data.message)
                    else
                        this.update_list()
                })
            }
        },
        mounted() {
            this.update_list()
        }
    }
</script>

<style scoped>

</style>