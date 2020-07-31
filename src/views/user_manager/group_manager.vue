<template>
    <div>
        <el-button @click="draw_is_open = true">添加权限组</el-button>

        <el-table :default-sort = "{prop: 'group_id', order: 'ascending'}" :data="group_list">
            <el-table-column sortable prop="group_id" label="ID"></el-table-column>
            <el-table-column prop="group_name" label="权限组名"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini">编辑</el-button>
                    <el-button size="mini" type="danger" @click="delete_item(scope.row.group_id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-drawer destroy-on-close ref="addUserGroupDraw" title="添加用户" :visible.sync="draw_is_open" direction="btt" size="80%">
            <add_group @add-user-group-done="$refs.addUserGroupDraw.closeDrawer();get_list()"></add_group>
        </el-drawer>
    </div>
</template>

<script>
    import {get_group_list, net_post} from "../../network";
    import add_group from "../../components/user_group_manager/add_group";

    export default {
        name: "group_manager",
        data() {
            return {
                group_list: [],
                draw_is_open: false
            }
        },
        components: {
            add_group
        },
        methods: {
            get_list() {
                get_group_list().then(response => {
                    this.group_list = response.data.data
                })
            },
            delete_item(id) {
                let formData = new FormData()
                formData.append('id', id)
                net_post('/delete-permission-group', formData).then(resp => {
                    if (resp.data.code === 403) {
                        this.$message.error(resp.data.message)
                        return
                    }
                    this.$message.success(resp.data.message)
                    this.get_list()
                })
            }
        },
        mounted() {
            this.get_list()
        }

    }
</script>

<style scoped>

</style>