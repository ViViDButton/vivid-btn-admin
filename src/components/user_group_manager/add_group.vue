<template>
    <div  style="padding: 0 20px">
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="组名" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="权限">
<!--                <el-checkbox-group v-model="form.permission_list">-->
<!--                    <el-checkbox v-for="item in permission_list"-->
<!--                                 :label="item.permission_name"-->
<!--                                 :key="item.permission_name">{{ item.permission_name }}</el-checkbox>-->
<!--                </el-checkbox-group>-->
                <el-transfer style="width: 100%" :data="permission_list" v-model="form.permission_list"></el-transfer>
            </el-form-item>
            <el-form-item prop="submit">
                <el-button type="primary" @click="submitForm">添加</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {add_user, get_permission_list, net_post} from "../../network";

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
                    group_name: '',
                    permission_list: []
                },
                rules: {
                    name: [
                        {required: true, message: '请输入组名', trigger: 'change'}
                    ]
                },
                permission_list: []
            }
        },
        methods: {
            submitForm() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        //提交
                        let formData = new FormData()
                        formData.append('name', this.form.name)
                        formData.append('permission', this.form.permission_list)
                        net_post('/add-permission-group', formData).then(resp => {
                            if (resp.data.code === 403){
                                this.$message.error(resp.data.message)
                                return
                            }
                            this.$message.success(resp.data.message)
                            this.$emit('add-user-group-done')
                        })
                    } else {
                        return false;
                    }
                });
            },
            load_permission_list() {
                get_permission_list().then(resp => {
                    console.log(resp.data)
                    let list = resp.data.data
                    list.forEach(item => {
                        this.permission_list.push({
                            label: item.permission_codename,
                            key: item.permission_id,
                            disabled: false
                        })
                    })
                })
            }
        },
        mounted() {
            this.load_permission_list()
        }
    }
</script>

<style scoped>

</style>