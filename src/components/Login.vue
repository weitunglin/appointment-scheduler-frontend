<template>
  <div class="login">
    <el-card>
      <h2>{{ $t('login') }}</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.prevent="userLogin"
      >
        <el-form-item prop="studentID">
          <el-input
            v-model="model.studentID"
            :placeholder="$t('studentID')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
          >{{ $t('login') }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "login",
  props: {
    login: Boolean
  },
  emits: ['update:login', 'update:credentials'],
  data() {
    return {
      model: {
        studentID: "",
      },
      loading: false,
      rules: {
        studentID: [
          {
            required: true,
            message: this.$t("studentIDRequired"),
            trigger: "blur"
          },
          {
            validator(_, value, callback) {
              const reg = /^[0-9]{9}$/
              if (reg.test(value)) {
                callback()
              } else {
                callback(new Error("學號須為9位數字")
              }
            },
            trigger: "blur"
          }
        ]
      }
    }
  },
  methods: {
      async userLogin() {
        let valid = await this.$refs.form.validate()
        if (!valid) {
          return
        }
        this.loading = true
        try {
          const res = await this.axios.request({
            url: '/login',
            method: 'POST',
            data: {
              studentID: this.model.studentID
            }
          })
          console.log(res)
          this.$message.success('登入成功')
          localStorage.setItem('cred', JSON.stringify(res.data))
          this.$emit('update:login', true)
          this.$emit('update:credentials', res.data)
        } catch (err) {
          if (err.response.data) {
            this.$message.error(`${err.response.data.error}`)
          } else {
            this.$message.error('出現錯誤，請稍候再試')
          }
          this.$emit('update:login', false)
          console.error(err.response)
        } finally {
          this.model.studentID = ''
          this.loading = false
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  width: 290px;
}
</style>
<style lang="scss">
$teal: rgb(0, 124, 137);
.el-button--primary {
  background: $teal;
  border-color: $teal;

  &:hover,
  &.active,
  &:focus {
    background: lighten($teal, 7);
    border-color: lighten($teal, 7);
  }
}
.login .el-input__inner:hover {
  border-color: $teal;
}
.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;

}

.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}
h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
a {
  color: $teal;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: lighten($teal, 7);
  }
}
.login .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}
</style>
