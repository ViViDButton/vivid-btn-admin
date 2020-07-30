<template>
    <div  style="padding: 0 20px">

        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="Vtuber" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Bilibili-UID" prop="bid">
                <el-input v-model="form.bid" type="number"></el-input>
            </el-form-item>
            <el-form-item label="Youtube-id" prop="yid">
                <el-input v-model="form.yid"></el-input>
            </el-form-item>
            <el-form-item prop="submit">
                <el-button type="primary" @click="submitForm">添加</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {add_vtb} from "../../network";

    export default {
        name: "add_group",
        data() {
            return {
                form: {
                    name: '',
                    bid: '',
                    yid: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入Vtuber名字', trigger: 'change'}
                    ]
                }
            }
        },
        methods: {
            submitForm() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        //提交
                        let t = this.form
                        if (t.bid.trim() === '')
                            t.bid = '0'
                        add_vtb(t.name, t.bid.toString(), t.yid).then(resp => {
                            if(resp.data.code === 403){
                                this.$message.error(resp.data.message)
                                return
                            }
                            this.$message.success("操作成功")
                            this.$emit('add-vtb-done')
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