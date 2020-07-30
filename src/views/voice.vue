<template>
    <div>
        <el-form :inline="true">
            <el-form-item label="Vtuber:">
                <el-select v-model="sel.vtb" @change="change_vtb">
                    <el-option v-for="item in vtb" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分组:">
                <el-select v-model="sel.group" @change="update_table">
                    <el-option v-for="item in vtb_group" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <el-button :disabled="addIsDisabled" type="primary" @click="drawer = true">添加语音</el-button>
        <el-button @click="update_table">刷新</el-button>

        <el-table :data="table" style="width: 100%">
            <el-table-column prop="data_id" label="ID"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="click_count" label="点击计数"></el-table-column>
            <el-table-column prop="update" label="更新时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            type="primary"
                            size="mini"
                            @click="playAudio(scope.$index)">播放</el-button>
                    <el-button
                            size="mini"
                            @click="">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="delete_item(scope.row)">删除</el-button>
                </template>
            </el-table-column>
<!--            data_id name path count update-->
        </el-table>

        <el-drawer
                ref="addVoiceDraw"
                title="添加语音"
                :visible.sync="drawer"
                show-close
                append-to-body
                :size="'80%'"
                :destroy-on-close="true"
                :direction="'btt'">
            <edit-item :vtb="sel.vtb" :group="sel.group" @push-done="add_done"></edit-item>
        </el-drawer>

        <audio ref="audioMod"></audio>
    </div>
</template>

<script>
    import {get_voice, get_group, delete_voice, get_vtb} from "../network";
    import EditItem from "../components/UploadFile/EditItem";

    export default {
        name: "test",
        components: {
            EditItem
        },
        data() {
            return {
                drawer: false,
                data: {},
                sel: {
                    vtb: '',
                    group: ''
                },
                table: [],
                vtb: [],
                vtb_group: []
            }
        },
        mounted() {
            this.update_table()
            get_vtb().then(resp => {
                    this.vtb = resp.data.list
                })
        },
        computed: {
            addIsDisabled() {
                return this.sel.group==='' || this.sel.vtb===''
            }
        },
        methods: {
            delete_item(r) {
                let formData = {
                    'id': r.data_id
                }
                delete_voice(formData).then(rep => {
                    this.$message({
                        message: '已删除',
                        type: 'success'
                    });
                    this.update_table()
                }).catch(() => {
                    this.$message.error('删除失败');
                })
            },
            update_table() {
                let formData = {
                    'vtb-name': this.sel.vtb,
                    'group': this.sel.group
                }
               get_voice(formData).then(resp => {
                       console.log(resp)
                        this.table = resp.data.voicelist
                    })
            },
            change_vtb() {
                this.sel.group = ''
                if (this.sel.vtb === '')
                    return
                let formData = {
                    'vtb-name': this.sel.vtb
                }
                get_group(formData).then(resp => {
                    this.vtb_group = resp.data.groups
                }).catch(err => {

                })
                this.update_table()
            },
            add_done() {
                this.$refs.addVoiceDraw.closeDrawer()
                this.update_table()
            },
            playAudio(idx) {
                console.log(this.table[idx])
                this.$refs.audioMod.setAttribute('src', this.table[idx].path)
                this.$refs.audioMod.play()
            }
        }
    }
</script>

<style scoped>
</style>