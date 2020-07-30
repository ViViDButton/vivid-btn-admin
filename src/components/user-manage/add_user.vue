<template>
    <div  style="padding: 0 20px">
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="用户名" prop="user_name">
                <el-input v-model="form.user_name"></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-col :span="1">姓:</el-col>
                <el-col :span="11">
                    <el-form-item prop="date1">
                        <el-input v-model="form.first_name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">名:</el-col>
                <el-col :span="11">
                    <el-form-item prop="date2">
                        <el-input v-model="form.last_name"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input v-model="form.pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirm_pwd">
                <el-input v-model="form.confirm_pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input v-model="form.email" type="email"></el-input>
            </el-form-item>
            <el-form-item label="超级管理员" prop="is_super">
                <el-checkbox v-model="form.is_super"></el-checkbox>
            </el-form-item>
            <el-form-item prop="submit">
                <el-button type="primary" @click="submitForm">添加</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {add_user} from "../../network";

    export default {
        name: "add_user",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.confirm_pwd !== '') {
                        this.$refs.form.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.pwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    user_name: '',
                    first_name: '',
                    last_name: '',
                    email: '',
                    pwd: '',
                    confirm_pwd: '',
                    is_super: false
                },
                rules: {
                    user_name: [
                        {required: true, message: '请输入用户名', trigger: 'change'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'change'}
                    ],
                    pwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    confirm_pwd: [
                        { validator: validatePass2, trigger: 'blur' }
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
                        add_user(t.user_name, t.pwd, t.email, t.first_name, t.last_name, t.is_super).then(resp => {
                            console.log(resp.data)
                            this.$message.success("操作成功")
                            this.$emit('add-user-done')
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