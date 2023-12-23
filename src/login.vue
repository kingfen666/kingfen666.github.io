<template>
    <div class="main" v-if="!newUser">
        <div style="width: 500px;height: 60px;display: flex;margin-left: 25%">
            <div :class="pwd_item" @click="password">密码登录</div>
            <div class="login-tab-line"></div>
            <div :class="sms_item" @click="mailCode">验证码登录</div>
        </div><!--登录方式切换-->
        <div class="login-pwd-wp" style="margin-top: 40px" v-if="pwd"><!--密码登录-->
            <form class="tab_form">
                <div class="form_item">
                    <div>账号</div>
                    <input v-model="input_username" autocomplete="on" maxlength="32" oninput="value=value.replace(/\s+/g, '')"  @input=" CanClick(false)" placeholder="请输入账号">
                </div>
                <div class="form__separator-line"></div><!--分割线-->
                <div class="form_item">
                    <div>密码</div>
                    <input type="password" v-model="input_password" autocomplete="on" maxlength="32" oninput="value=value.replace(/\s+/g, '')"   placeholder="请输入密码" @input=" CanClick(false)" >
                </div>

            </form>
            <div class="btn_wp" style="margin-left: 50px">
                <div class="btn_register" @click="toSMS">注册</div>
                <div :class="login_btn" @click="pwd_login">登录</div>
            </div>
        </div>
        <div class="login-sms-wp" style="margin-top: 40px" v-if="sms"><!--验证码登录-->
            <form class="tab_form">
                <div class="form_item">
                    <div>邮&nbsp;&nbsp;&nbsp;箱</div>
                    <input v-model="input_username" autocomplete="on" maxlength="32" oninput="value=value.replace(/\s+/g, '')" placeholder="请输入邮箱地址" @input="mailInput(); CanClick(true)">
                    <div class="login-sms-wp__vertical-line"></div>
                    <div :class="smsButton" @click="SendCode">{{ time }}</div>
                </div>
                <div class="form__separator-line"></div><!--分割线-->
                <div class="form_item">
                    <div>验证码</div>
                    <input  v-model="input_password" autocomplete="on" maxlength="8" oninput="value=value.replace(/[^0-9]/g, '')"  placeholder="请输入验证码" @input=" CanClick(true)">
                </div>
            </form>
            <div class="btn_wp" style="margin-left: 125px">
                <div :class="sms_btn" style="width: 250px;" @click="sms_login">登录/注册</div><!--btn_primary-->
            </div>
        </div>
    </div>
    <div class="main" v-if="newUser">
        <h1 style="text-align: center;font-size: 35px;font-weight: 25">注册</h1>
        <div class="login-pwd-wp" style="margin-top: 15px" ><!--注册账号-->
            <form class="tab_form" style="height: 135px;">
                <div class="form_item">
                    <div>账号</div>
                    <input v-model="input_username" autocomplete="on" maxlength="32" oninput="value=value.replace(/\s+/g, '')"  @input=" CanClick(false)" placeholder="请输入账号">
                </div>
                <div class="form__separator-line"></div><!--分割线-->
                <div class="form_item">
                    <div>密码</div>
                    <input type="password" v-model="input_password" autocomplete="on" maxlength="32" oninput="value=value.replace(/\s+/g, '')"   placeholder="请输入密码" @input=" CanClick(false)" >
                </div>
                <div class="form__separator-line"></div>
                <div class="form_item">
                    <div>昵称</div>
                    <input  v-model="input_name" autocomplete="on" maxlength="32" oninput="value=value.replace(/\s+/g, '')"   placeholder="请输入昵称" @input=" CanClick(false)" >
                </div>

            </form>
            <div class="btn_wp" style="margin-left: 50px;margin-top: 45px">
                <div :class="login_btn" style="width: 220px;margin-left: 85px" @click="logon">注册</div>
            </div>
        </div>
    </div>
    <div v-if="remind" style="color: #ffffff;height: 50px;width: 150px;background-color: rgba(14,13,13,0.4);text-align: center;position:fixed;top: 50%;margin-top: -25px;left:50%;margin-left:-75px;display: block">{{message}}</div>

</template>
<script src="./js/login.js"/>
