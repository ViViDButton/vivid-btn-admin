<template>
    <div>
        <el-form :inline="true">
            <el-form-item label="Vtuber:">
                <el-select v-model="sel.vtb" @change="update_table">
                    <el-option
                            v-for="item in vtb_list"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <el-button :disabled="is_active" @click="draw_is_open=true" type="primary">添加分组</el-button>

        <el-table :data="group_list">
            <el-table-column
                    prop="id"
                    label="ID">
            </el-table-column>
            <el-table-column prop="name" label="分组名"></el-table-column>
            <el-table-column prop="click_count" label="分组点击次数"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="delete_item(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-drawer destroy-on-close ref="addGroupDraw" title="添加分组" :visible.sync="draw_is_open" direction="btt" size="80%">
            <add_group :vtb="sel.vtb" @add-group-done="$refs.addGroupDraw.closeDrawer();update_table()"></add_group>
        </el-drawer>
    </div>
</template>

<script>
    import {get_vtb, get_group, delete_group} from "../network";
    import add_group from "../components/group_manage/add_group";

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
        computed: {
          is_active() {
              return this.sel.vtb === ''
          }
        },
        methods: {
            update_vtb_list() {
                get_vtb().then(resp => {
                    this.vtb_list = resp.data.list
                })
            },
            update_table() {
                let formData = {
                    'vtb-name': this.sel.vtb
                }
                get_group(formData).then(resp => {
                    this.group_list = resp.data.groups
                })
            },
            delete_item(uid) {
                delete_group(uid).then(resp => {
                    if (resp.data.code === 403){
                        this.$message.error(resp.data.message)
                        return
                    }
                    this.$message.success(resp.data.message)
                    this.update_table()
                })
            }
        },
        mounted() {
            this.update_vtb_list()
        },
        components: {
            add_group
        }
    }
</script>

<style scoped>

</style>