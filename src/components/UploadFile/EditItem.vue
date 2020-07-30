<template>
    <div style="max-height: 100px">
        <el-form :model="form" label-width="120px" :rules="rules" ref="form">
<!--            <el-form-item label="Vtuber" prop="vtb">-->
<!--                <el-select v-model="form.vtb" @change="change_vtb">-->
<!--                    <el-option v-for="item in vtb_list" :key="item" :label="item" :value="item"></el-option>-->
<!--                </el-select>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="语音分组" prop="group">-->
<!--                <el-select v-model="form.group">-->
<!--                    <el-option v-for="item in group_list" :key="item.name" :label="item.name" :value="item.name"></el-option>-->
<!--                </el-select>-->
<!--            </el-form-item>-->
            <el-form-item label="语音名称" prop="voice">
                <el-input v-model="form.voice"></el-input>
            </el-form-item>
            <el-form-item label="更新版本(测试)" prop="ver">
                <el-input v-model="form.ver"></el-input>
            </el-form-item>
            <el-form-item label="zh(中文)" prop="zh">
                <el-input v-model="form.zh"></el-input>
            </el-form-item>
            <el-form-item label="ja(日文)">
                <el-input v-model="form.ja"></el-input>
            </el-form-item>
            <el-form-item label="en(英文)">
                <el-input v-model="form.en"></el-input>
            </el-form-item>
            <el-form-item label="音频文件" prop="file">
                <el-upload
                        ref="upload"
                        class="upload-demo"
                        action=""
                        :http-request="upload"
                        drag
                        :limit="1"
                        :auto-upload="false">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button>关闭</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {get_voice, add_voice, get_vtb} from "../../network";

    export default {
        name: "EditItem",
        props: {
          vtb: String,
          group: String
        },
        data() {
          return {
              form: {
                  vtb: this.vtb,
                  group: this.group,
                  voice: '',
                  ver: '',
                  zh: '',
                  ja: '',
                  en: '',
                  file: '',
              },
              vtb_list: [],
              group_list: [],
              rules: {
                  vtb: [
                      { required: true, message: '请选择一位vtuber', trigger: 'change' }
                  ],
                  group: [
                      { required: true, message: '请选择一个分组', trigger: 'change' }
                  ],
                  voice: [
                      { required: true, message: '请填写名称', trigger:'change'}
                  ],
                  ver: [
                      { required: true, message: '请填写正确的版本号', trigger: 'change'}
                  ],
                  zh: [
                      { required: true, message: '请填写中文名', trigger: 'change'}
                  ]
              }
          }
        },
        mounted() {
            get_vtb().then(resp => {
                this.vtb_list = resp.data.list
            })
        },
        methods: {
            change_vtb() {
                this.form.group = ''
                if (this.form.vtb === '')
                    return
                let data = {
                    'vtb-name': this.form.vtb
                }
                get_voice(data).then(resp => {
                    this.group_list = resp.data.groups
                }).catch(err => {

                })
            },
            upload(e) {
                let formData = new FormData()
                formData.append('file', e.file)
                formData.append('vtb-name', this.form.vtb)
                formData.append('voice-name', this.form.voice)
                formData.append('group-name', this.form.group)
                formData.append('ver', this.form.ver)
                formData.append('zh', this.form.zh)
                formData.append('ja', this.form.ja)
                formData.append('en', this.form.en)

                add_voice(formData).then(resp => {
                    console.log(resp.data);
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.$emit('push-done')
                }).catch(err => {
                    this.$message.error('添加失败，请检查表单是否填写完整');
                })
            },
            submit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$refs.upload.submit()
                    }else {
                        return false
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>