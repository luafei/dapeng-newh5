<template>
  <div class="login">
    <div class="connect">
      <div class="connectLogin">
        <h2 class="title">智慧大鹏管理服务指挥平台</h2>
      </div>
      <van-form validate-first ref="loginForm">
        <van-cell-group class="account">
          <van-field
            v-model="username"
            placeholder="请输入登录账号"
            name="username"
            maxlength="16"
            :rules="[{ required: true, message: '请输入登录账号' }]"
          />
          <van-field
            v-model="password"
            name="password"
            placeholder="请输入密码"
            maxlength="16"
            :rules="[
              {
                validator: validatorPassWord,
                required: true,
                message: '密码不少于8位数,包含数字、大小写英文字母、特殊字符',
              },
            ]"
            type="password"
          />
          <van-field
            v-model="code"
            placeholder="请输入验证码"
            validate-trigger="onblur"
            name="code"
            maxlength="6"
            type="text"
          >
            <!-- :rules="[{ required: true, message: '请输入验证码' },{ validator:validatorCode, message: '验证码错误' }]" -->
            <template #extra>
              <div class="connectImg" @click="getIdentifyCode">
                <img :src="identifyCode" width="100%" height="100%" alt />
                <!-- <code-indentify :identifyCode="identifyCode" :contentWidth="95" :contentHeight="36"></code-indentify> -->
              </div>
            </template>
          </van-field>
        </van-cell-group>
      </van-form>
      <div class="loginBor">
        <div class="submitBtn">
          <van-button
            round
            block
            type="info"
            :loading="loading"
            native-type="submit"
            @click="toSubmit"
          >
            登陆
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { isValidPassword } from "@/utils/validate.js";

export default {
  data() {
    return {
      tel: "",
      text: "",
      digit: "",
      username: "", //admin Dapeng2020
      password: "",
      code: "",
      codeImage: "",
      loading: false,
      identifyCode: "",
      timeStamps: 0
    };
  },
  beforeCreate() {},
  created() {
    console.log(11, process.env.VUE_APP_BASE_API);
    this.getIdentifyCode();
  },
  mounted() {},
  methods: {
    validatorName() {
      return true;
    },
    validatorPassWord(val) {
      return isValidPassword(val);
    },
    validatorCode(val) {
      const inputCode = val.toLowerCase();
      const identifyCode = this.identifyCode.toLowerCase();
      if (inputCode === identifyCode) {
        return true;
      } else {
        this.getIdentifyCode();
        return false;
      }
    },
    async realToServer() {
      const postData = {
        username: this.username,
        password: this.password,
        code: this.code,
        flag: this.timeStamps
      };
      try {
        this.loading = true;
        this.$store
          .dispatch("LoginByUsername", postData)
          .then(() => {
            this.loading = false;
            this.$router.push({ path: "/home" });
          })
          .catch(() => {
            this.loading = false;
            this.getIdentifyCode();
          });
      } catch (err) {
        console.log(err);
      }
    },
    toSubmit() {
      this.$refs.loginForm
        .validate("username")
        .then(() => {
          this.$refs.loginForm
            .validate("password")
            .then(() => {
              this.$refs.loginForm
                .validate("code")
                .then(() => {
                  this.realToServer();
                })
                .catch((data) => {
                  console.log(data);
                });
            })
            .catch((data) => {
              console.log(data);
            });
        })
        .catch((data) => {
          console.log(data);
        });
    },
    async getIdentifyCode() {
      // this.identifyCode = generateCode(4)
      this.timeStamps = new Date().getTime();
      let postData = {
        flag: this.timeStamps
      };
      const res = await this.$store.dispatch("GetPicCode", postData);
      this.identifyCode =
        "data:image/png;base64," +
        btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
    }
  }
};
</script>
<style lang="scss" scope>
.login {
  width: 100%;
  min-height: 667px;
  height: 100%;
  background: url("../../assets/images/login-bg.png");
  background-size: cover;
  &:-webkit-autofill {
    // box-shadow: 0 0 0px 1000px $loginBg inset !important;
    -webkit-text-fill-color: #fff !important;
    /*通过延时渲染背景色变相去除背景颜色*/
    transition: background-color 5000s ease-in-out 0s !important;
  }
}
.connect {
  width: 100%;
  padding-top: 100px;
  .connectLogin {
    height: 50px;
    padding-bottom: 50px;
    .title {
      width: 100%;
      color: #ffffff;
      display: inline-block;
      font-size: 28px;
      text-align: center;
    }
  }
}
.loginBor {
  height: 55px;
  padding-top: 40px;
  .submitBtn {
    .van-button {
      margin: 0 auto;
      width: 311px;
      height: 50px;
      font-size: 18px;
      font-weight: 500;
      color: #555555;
      line-height: 50px;
      background-color: #fff;
      border-color: #fff;
    }
  }
}
.account {
  width: 310px;
  margin: 0 auto;
  background-color: transparent;
  &::after {
    border-top-width: 0px;
  }
  .van-field {
    font-size: 15px;
    line-height: 40px;
    background-color: transparent;
    input {
      color: #ffffff;
    }
    input::placeholder {
      color: #ffffff;
    }
    &::after {
      left: 0;
      right: 0;
    }
    .van-field__error-message {
      font-size: 14px;
      line-height: 16px;
    }
  }
  .connectImg {
    width: 95px;
    height: 36px;
    background: wheat;
    margin-top: 5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.van-notify {
  padding: 15px 0;
  font-size: 14px;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-transition-delay: 111111s;
  -webkit-transition: color 11111s ease-out, background-color 111111s ease-out;
}
</style>
