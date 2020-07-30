<template>
    <div  style="padding: 0 20px">

        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="Vtuber">
                {{ vtb }}
            </el-form-item>
            <el-form-item label="分组名" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="zh(中文)" prop="zh">
                <el-input v-model="form.zh"></el-input>
            </el-form-item>
            <el-form-item label="ja(日文)" prop="ja">
                <el-input v-model="form.ja"></el-input>
            </el-form-item>
            <el-form-item label="en(英文)" prop="en">
                <el-input v-model="form.en"></el-input>
            </el-form-item>
            <el-form-item prop="submit">
                <el-button type="primary" @click="submitForm">添加</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {add_group} from "../../network";

    export default {
        name: "add_group",
        props: {
          vtb: ''
        },
        data() {
            return {
                form: {
                    name: '',
                    zh: '',
                    ja: '',
                    en: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入分组名', trigger: 'change'}
                    ],
                    zh: [
                        {required: true, message: '请输入中文名', trigger: 'change'}
                    ],
                }
            }
        },
        methods: {
            submitForm() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        //提交
                        let t = this.form
                        add_group(this.vtb, t.name, t.zh, t.ja, t.en).then(resp => {
                            if(resp.data.code === 403){
                                this.$message.error(resp.data.message)
                                return
                            }
                            this.$message.success("操作成功")
                            this.$emit('add-group-done')
                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>