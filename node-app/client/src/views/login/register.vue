<template>
  <div>
    <div class="content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
        <h2 class="title">后台管理系统</h2>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入用户名" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="请输入密码"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            placeholder="请再次输入密码"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="管理员类型">
          <el-select v-model="ruleForm.identity" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-bottom:10px;">
          <el-button
            type="primary"
            style="width:100%;"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { isWscnEmail } from "@/utils/validate";
export default {
  name: "register",
  data() {
    const validateUser = (rule, value, callback) => {
      value = value.trim();
      if (value.length < 2) {
        callback(new Error("用户名不能少于2个字符"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
      } else if (this.ruleForm.checkPass !== "") {
        this.$refs.ruleForm.validateField("checkPass");
         callback();
      } else {
        callback();
      }
    };
    const validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else {
        if (value !== this.ruleForm.password) {
          callback(new Error("两次输入密码不一致!"));
        }
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (!isWscnEmail(value)) {
        callback(new Error("请输入正确邮箱地址"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "123456",
        name: "123",
        checkPass: "123456",
        email: "1@qq.com",
        identity: 1
      },
      rules: {
        name: [{ validator: validateUser, trigger: "blur", required: true }],
        password: [
          { validator: validatePass, trigger: "blur", required: true }
        ],
        email: [{ validator: validateEmail, trigger: "blur", required: true }],
        checkPass: [
          { validator: validateCheckPass, trigger: "blur", required: true }
        ]
      },
      loading: false,
      options: [
        {
          value: 0,
          label: "普通管理员"
        },
        {
          value: 1,
          label: "管理员"
        }
      ]
    };
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$refs.ruleForm.validate(valid => {
      // 在做校验的时候，一定要callback();否则不会执行
        if (valid) {
          this.$store.dispatch("register",this.ruleForm).then(res => {
              this.loading = false;
              this.$message({
                message: res.msg,
                type: "success"
              });
              this.$router.push("/login");
            })
            .catch(err => {
              this.loading = false;
              console.log(err);
            });
        } else {
          this.loading = false;
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>