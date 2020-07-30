<template>
    <div>

        <el-button type="primary" @click="draw_is_open = true">添加Vtuber</el-button>

        <el-table :data="vtb_list">
            <el-table-column label="ID" type="index"></el-table-column>
            <el-table-column label="名字" prop="name"></el-table-column>
            <el-table-column label="Bilibili-UID" prop="bili-id"></el-table-column>
            <el-table-column label="youtube-ID" prop="youtube-id"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="delete_vtb_(scope.row.name)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-drawer destroy-on-close ref="addVtbDraw" title="添加分组" :visible.sync="draw_is_open" direction="btt" size="80%">
            <add_vtb :vtb="sel.vtb" @add-vtb-done="$refs.addVtbDraw.closeDrawer();update_vtb_list()"></add_vtb>
        </el-drawer>
    </div>
</template>

<script>
    import {get_vtb, delete_vtb} from "../network";
    import add_vtb from "../components/vtb_manage/add_vtb";

    export default {
        name: "vtuberManage",
        data() {
            return {
                sel: {
                    vtb: ''
                },
                vtb_list: [],
                group_list: [],
                draw_is_open: false
            }
        },
        methods: {
            update_vtb_list() {
                get_vtb().then(resp => {
                    this.vtb_list = resp.data.list
                })
            },
            delete_vtb_(name) {
                delete_vtb(name).then(resp => {
                    if (resp.data.code === 403){
                        this.$message.error(resp.data.message)
                        return
                    }
                    this.$message.success(resp.data.message)
                    this.update_vtb_list()
                })
            }
        },
        mounted() {
            this.update_vtb_list()
        },
        components: {
            add_vtb
        }
    }
</script>

<style scoped>

</style>