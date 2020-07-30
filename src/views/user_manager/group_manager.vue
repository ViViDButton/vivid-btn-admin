<template>
    <div>
        group_manager
        <el-table :default-sort = "{prop: 'group_id', order: 'ascending'}" :data="group_list">
            <el-table-column sortable prop="group_id" label="ID"></el-table-column>
            <el-table-column prop="group_name" label="权限组名"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini">编辑</el-button>
                    <el-button size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {get_group_list} from "../../network";

    export default {
        name: "group_manager",
        data() {
            return {
                group_list: []
            }
        },
        methods: {
            get_list() {
                get_group_list().then(response => {
                    this.group_list = response.data.data
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