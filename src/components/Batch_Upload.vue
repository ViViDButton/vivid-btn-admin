<template>
    <div style="padding: 20px">
        <el-form ref="form" :model="form">
            <el-form-item label="Vtuber">
                <el-select v-model="form.vtb">
                    <el-option v-for="item in vtb_list" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="定义为下一版本">
                <el-checkbox v-model="form.next_ver"></el-checkbox>
            </el-form-item>
            <el-form-item label="文件">
                <el-upload
                        class="upload-demo"
                        drag
                        action="http://127.0.0.1:8000/batch-upload"
                        multiple
                        :auto-upload="false"
                        :data="{'vtuber': form.vtb}"
                        ref="upload"
                        with-credentials>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit_upload()">开始上传</el-button>
                <el-button type="danger" @click="emit_close()">关闭</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {get_vtb, net_post} from "../network";

    export default {
        name: "Batch_Upload",
        data() {
            return {
                form: {
                    vtb: '',
                    next_ver: true
                },
                vtb_list: [],
            }
        },
        methods: {
            submit_upload() {
                if (this.form.next_ver) {
                    let fd = new FormData()
                    fd.append('vtb', this.form.vtb)
                    net_post('/next-ver', fd)
                }
                this.$refs.upload.submit()
            },
            emit_close() {
                this.$emit('closed')
            },
            update_list() {
                get_vtb().then(resp => {
                    if (resp.data.code === 403) {
                        return
                    }
                    this.vtb_list = resp.data.list
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