<template>
    <div>

        <el-col>
            <el-button type="primary" @click="drawer = true">上传文件</el-button>
<!--            <el-button @click="submit_group_set();submit_vtb_set">提交</el-button>-->
            <el-button @click="get_list()">刷新</el-button>
        </el-col>

        <el-table :data="default_voice_list">
            <el-table-column prop="id" label="ID" width="60px"></el-table-column>
            <el-table-column prop="name" label="name"></el-table-column>
            <el-table-column label="vtuber">
                <template slot-scope="scope">
                    <el-select size="mini"
                               v-model="form.vtb[scope.row.id]"
                               :placeholder="scope.row.vtuber"
                               @change="submit_vtb_set($event, scope.row.id)">
                        <el-option
                                v-for="item in vtb_list"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="分组">
                <template slot-scope="scope">
                    <el-select size="mini"
                               v-model="form.group[scope.row.id]"
                               placeholder="default"
                               @change="submit_group_set($event, scope.row.id)">
                        <el-option
                                v-for="item in group_list[scope.row.vtuber]"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="其他操作" width="250px">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="playAudio(scope.$index)">播放</el-button>
                    <el-button size="mini" type="primary" @click="add_group_method(scope.row.vtuber)">添加分组</el-button>
                    <el-button size="mini" type="danger" @click="delete_item(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

<!--        上传-->
        <el-drawer ref="UploadDraw" title="批量上传" destroy-on-close :visible.sync="drawer" direction="btt" size="80%">
            <batch_-upload @closed="upload_draw_closed"></batch_-upload>
        </el-drawer>
<!--        添加分组-->
        <el-drawer ref="addGroupDraw" title="批量上传" destroy-on-close :visible.sync="add_group_draw" direction="btt" size="80%">
            <add_group :vtb="sel_vtb" @add-group-done="$refs.addGroupDraw.closeDrawer();update_group()"></add_group>
        </el-drawer>

<!--        音频-->
        <audio ref="audioMod"></audio>

    </div>
</template>

<script>
    import Batch_Upload from "../../components/Batch_Upload";
    import add_group from "../../components/group_manage/add_group";
    import {net_get, get_vtb, change_voice, delete_voice} from "../../network";

    export default {
        name: "upload_manager",
        data() {
            return {
                default_voice_list: [],
                group_list: {},
                vtb_list: [],
                form: {
                    group: [],
                    vtb: []
                },
                drawer: false,
                add_group_draw: false,
                sel_vtb: ''
            }
        },
        methods: {
            submit_group_set(group, idx) {
                let formData = new FormData()
                formData.append('aim', idx)
                formData.append('group', group)
                change_voice(formData).then(resp => {
                    if(resp.code === 403) {
                        this.$message.error(resp.data.message)
                        return
                    }
                    this.$message.success(resp.data.message)
                    this.get_list()
                })
            },
            submit_vtb_set(vtb, idx) {
                let formData = new FormData()
                formData.append('aim', idx)
                formData.append('vtb', vtb)
                change_voice(formData).then(resp => {
                    if(resp.code === 403) {
                        this.$message.error(resp.data.message)
                        return
                    }
                    this.$message.success(resp.data.message)
                    this.get_list()
                })
            },
            get_list() {
                net_get('/get-default-voice').then(resp => {
                    if(resp.code === 403) {
                        this.$message.error(resp.data.message)
                        return
                    }
                    this.default_voice_list = resp.data.data
                })
            },
            update_vtb_list() {
                get_vtb().then(resp => {
                    if (resp.code === 403){
                        this.$message.error(resp.data.message)
                        return
                    }
                    this.vtb_list = resp.data.list
                })
            },
            update_group() {
                net_get('/get-all-group').then(resp => {
                    if (resp.code === 403) {
                        this.$message.error(resp.data.message)
                        return
                    }
                    this.group_list = resp.data.data
                })
            },add_group_method(vtb) {
              this.sel_vtb = vtb
                this.add_group_draw = true
            },
            delete_item(vid) {
                let formData = {
                    'id': vid
                }
                delete_voice(formData).then(rep => {
                    this.$message({
                        message: '已删除',
                        type: 'success'
                    });
                    this.get_list()
                })
            },
            upload_draw_closed() {
                this.get_list()
                this.$refs.UploadDraw.closeDrawer()
            },
            playAudio(idx) {
                console.log(this.default_voice_list[idx])
                this.$refs.audioMod.setAttribute('src', this.default_voice_list[idx].url)
                this.$refs.audioMod.play()
            }
        },
        components: {
            Batch_Upload,
            add_group
        },
        mounted() {
            this.get_list()
            this.update_vtb_list()
            this.update_group()
        }
    }
</script>

<style scoped>

</style>