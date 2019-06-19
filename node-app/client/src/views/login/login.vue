<template>
  <div>
    <div class="content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="ruleForm">
        <h2 class="title">后台管理系统</h2>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="请输入密码"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox label="记住密码" name="type" v-model= "type" ></el-checkbox>
        </el-form-item>

        <el-form-item style="margin-bottom:10px;">
          <el-button
            type="primary"
            style="width:100%;"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { isWscnEmail } from "@/utils/validate";
export default {
  name: "login",
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!isWscnEmail(value)) {
        callback(new Error("请输入正确邮箱地址"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        email: ""
      },
      rules: {
        password: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, max: 30, message: "长度在6到30之间", trigger: "blur" }
        ],
        email: [{ validator: validateEmail, trigger: "blur" }]
      },
      loading: false,
      type: false // 是否记住密码
    };
  },
  created(){
    const users = localStorage.getItem('users');
    if(users){
      this.ruleForm = JSON.parse(users) ;
      this.type = true;
    }
    console.log(this.type)
  },
  methods: {
    handleLogin(formName) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          //  假设成功以后
          this.$store
            .dispatch("login", this.ruleForm)
            .then(res => {
              this.$message({
                message: "登录成功！",
                type: "success"
              });
              this.remberPaaword();
              this.$router.push("/");
            })
            .catch(err => {
              console.log(err);
            });
          // this.$router.push("/");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },

       // 记住密码
    remberPaaword() {
      if(this.type){
       return  localStorage.setItem('users',JSON.stringify(this.ruleForm))
      }
      localStorage.removeItem('users')
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>