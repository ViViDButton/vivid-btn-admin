<template>
    <div>
        <el-button type="primary" @click="$message.error('功能未开发')">手动建立词条</el-button>
        <el-button @click="get_list">刷新</el-button>
        <el-button @click="submit_translate">提交</el-button>

        <el-table :data="translate_list" :default-sort = "{prop: 'status', order: 'descending'}">
<!--            <el-table-column label="ID" prop="id"></el-table-column>-->
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="zh">
                <template slot-scope="scope">
                    <el-input size="mini"
                              :placeholder="scope.row.zh"
                              v-model="zh[scope.row.id]"
                              @change="append_log($event, scope.row.id, 'zh')"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="ja">
                <template slot-scope="scope">
                    <el-input size="mini"
                              :placeholder="scope.row.ja"
                              v-model="ja[scope.row.id]"
                              @change="append_log($event, scope.row.id, 'ja')"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="en">
                <template slot-scope="scope">
                    <el-input size="mini"
                              :placeholder="scope.row.en"
                              v-model="en[scope.row.id]"
                              @change="append_log($event, scope.row.id, 'en')"></el-input>
                </template>
            </el-table-column>
            <el-table-column sortable
                             column-key="status"
                             :filters="[{text: '正在翻译', value: 'translating'}, {text: '翻译完成', value: 'done'}, {text: '已废弃', value: 'close'}]"
                             :filter-method="filterHandler"
                             label="状态" prop="status"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="del_item(scope.row.id)">删除</el-button>
                    <el-button v-if="scope.row.status === 'done'"
                               size="mini"
                               type="primary"
                               @click="change_status(scope.row.id, 'translating')">转为未翻译</el-button>
                    <el-button v-if="scope.row.status === 'translating'"
                               size="mini"
                               @click="change_status(scope.row.id, 'done')">转为已翻译</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {net_get, net_post} from "../../network";

    export default {
        name: "translate_manager",
        data() {
            return {
                translate_list: [],
                zh: [],
                ja: [],
                en: [],
                change_log: []
            }
        },
        methods: {
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            submit_translate() {
                let formData = new FormData()
                formData.append('log', JSON.stringify({log: this.change_log}))
                net_post('/submit-translate-log', formData).then(resp => {
                    this.$message.success(resp.data.message)
                    this.change_log = []
                    this.zh = []
                    this.ja = []
                    this.en = []
                    this.get_list()
                })
            },
            append_log(value, id, lang) {
                this.change_log.push({
                    id: id,
                    value: value,
                    lang: lang
                })
            },
            get_list() {
                net_get('/get-translate-list').then(res => {
                    if (res.data.code === 403) {
                        return
                    }
                    this.translate_list = res.data.data
                })
            },
            change_status(id, status) {
                let formData = new FormData()
                formData.append('tid', id)
                formData.append('status', status)
                net_post('/change-translate-status', formData).then(res => {
                    this.get_list()
                })
            },
            del_item(tid) {
                this.$confirm('此操作将永久删除该翻译词条,可能会导致前端数据异常 , 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'error',
                        message: '该功能暂未启用'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        mounted() {
            this.get_list()
            this.$alert('翻译工作台现在正处于Beta1的版本,请在翻译后及时点击提交,待提交成功提示出现后,方可离开页面;页面刷新会导致翻译数据丢失!', '警告', {
                confirmButtonText: '我知道了',
                type: 'info'
            })
        }
    }
</script>

<style scoped>

</style>