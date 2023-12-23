import axios from "axios";
import Conf from "../../Myconfig.json"


export default {
    data() {
        return {
            mail: "",
            code: "",
            input_name: "",
            sms_btn: "btn_primary disable",
            newUser: false,
            pwd_item: "login-tab-item active-tab",
            sms_item: "login-tab-item",
            pwd: true,
            sms: false,
            smsButton: "login-sms-send disable",
            input_password: "",
            input_username: "",
            time: "请输入验证码",
            remind: false,
            message: "",
            login_btn: "btn_primary disable"
        }
    }, methods: {
        password() {/*密码登录*/
            if (this.pwd_item === "login-tab-item" && this.sms_item === "login-tab-item active-tab") {
                let temp = this.sms_item
                this.sms_item = this.pwd_item
                this.pwd_item = temp
                this.sms = false
                this.pwd = true
                this.input_password = ""
                this.input_username = ""
            }
        },
        mailCode() {/*验证码登录*/
            if (this.sms_item === "login-tab-item" && this.pwd_item === "login-tab-item active-tab") {
                let temp = this.sms_item
                this.sms_item = this.pwd_item
                this.pwd_item = temp
                /*替换切换按钮方法*/
                this.sms = true
                this.pwd = false
                this.input_password = ""
                this.input_username = ""
            }
        },
        mailInput() {
            let a = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+/
            if (a.test(this.input_username)) {
                this.smsButton = "login-sms-send clickable"
            } else {
                this.smsButton = "login-sms-send mdisable"
            }
        },
        SendCode() {
            this.pop("发送成功，有限期15分钟")
            this.smsButton = "login-sms-send mdisable"
            let nowTime = 60;
            let temp = this
            let data = this
            axios.get(`http://${Conf.address}/mail?address=${this.input_username}`).then((function (a) {
                if (a.data.toString() === "false") {
                    data.pop("请不要频繁发生验证码")
                }
            }))

            let a = setInterval(function () {
                if (nowTime === 0) {
                    temp.smsButton = "login-sms-send clickable"
                    temp.time = "请输入验证码"
                    clearInterval(a)
                } else {
                    temp.time = nowTime + "s"
                    nowTime--
                }
            }, 1000)
        },
        toSMS() {
            this.mailCode()
            this.pop("请通过邮箱获取验证码以注册")
        },
        pop(infor) {
            let data = this
            data.message = infor
            data.remind = true
            setTimeout(function () {
                data.remind = false
            }, 3000)
        },
        pwd_login() {
            /*密码登录*/
            if (this.input_username !== "" && /^(?=.*[a-zA-Z])[.a-zA-Z_0-9]{6,16}$/g.test(this.input_password)) {
                let data = this
                axios(
                    {
                        method: 'POST',
                        url: `http://${Conf.address}/pwdLogin?username=${this.input_username}&password=${this.input_password}`
                    }).then(function (a) {

                    if (a.data === "") {
                        data.pop("账号或密码错误")
                    } else {
                        console.log(a.data);
                        console.log(JSON.stringify(a.data))
                        sessionStorage.setItem("user", JSON.stringify(a.data))
                        data.input_password = "";
                        data.input_username = ""
                        location.href = `http://${Conf.src}/chat.html`
                    }
                })
            }
        }, sms_login() {
            if (/[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+/.test(this.input_username) && /[0-9]{8}/.test(this.input_password)) {
                let that=this;
                axios(
                    {
                        method: 'POST',
                        url: `http://${Conf.address}/smsLogin?username=${this.input_username}&password=${this.input_password}`
                    }).then(function (a) {
                        if (a.data==="error"){
                            that.pop("验证码错误")
                        }else if (a.data==="notExists"){
                            that.newUser=true
                            that.mail=that.input_username
                            that.code=that.input_password
                            that.input_password=""
                            that.input_username=""
                        }else {
                            console.log(a.data)
                        }
                })

            }
        }, CanClick(sms) {
            if (sms) {
                if (/[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+/.test(this.input_username) && /[0-9]{8}/.test(this.input_password)) {
                    this.sms_btn = "btn_primary"
                } else {
                    this.sms_btn = "btn_primary disable"
                }
            } else {
                if (this.input_username !== "" && /^(?=.*[a-zA-Z])[a-zA-Z_0-9]{6,16}$/g.test(this.input_password)) {
                    if (this.newUser) {
                        if (this.input_name !== ""&&/^(?=.*[a-zA-Z])[a-zA-Z_0-9]{6,16}$/g.test(this.input_username)) {
                            this.login_btn = "btn_primary"
                        }
                    } else {
                        this.login_btn = "btn_primary"
                    }
                } else {
                    this.login_btn = "btn_primary disable"
                }
            }
        },
        logon(){
            axios(
                {
                    method: 'POST',
                    url: `http://${Conf.address}/newUser?username=${this.input_username}&password=${this.input_password}&mail=${this.mail}&code=${this.code}&name=${this.input_name}`
                }).then(function (a) {

            })
        }
    }


}