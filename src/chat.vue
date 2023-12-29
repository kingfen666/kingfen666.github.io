<template>
    <div style="display: flex;">
        <div style="height:725px;width: 20%;display:flex;">
            <div style="height: 100%;width: 20%;margin-left: -5px;margin-top: -12px;">
                <img :src="myImg" style="margin-top: 15px;margin-left: 5px;height: 45px;width: 45px;">
            </div>
            <div style="height: 100%;width: 80%;margin-top: 4px;overflow-y: scroll">
                <div style="height: 45px;width: 100%;background-color: white;display: flex;align-items: center;justify-content: center;">好友({{friends.length}})</div>
                <div class="friend" v-for="i in friends" style="height: 45px;width: 100%;background-color: #e1e1e1;display: flex;align-items: center;border-bottom-style: solid;border-bottom-width: 1px;border-bottom-color: #c9ccd0" @click="readHistory(i)">
                    <img :src="myImg" style="height: 45px;width: 45px;">
                    <div style="margin-left: 15px">{{JSON.parse(i.another).usersname}}</div>
                </div>
            </div>
        </div>
        <div style="height:100%;width:80%" v-if="nowChat!==''">
            <div style="background-color: #e3e5e7;height: 45px;display: flex;justify-content: center;flex-direction: column;margin-top: -10px"><div  style="font-size: 25px;margin-left: 15px">{{nowChat.usersname}}</div></div>
            <div id="history" style="position:fixed;height: 75%;width: 79.5%;overflow-y: scroll">
                <div v-for="i in chatHistory" :class="getWho(i.who)">
                    <div v-if="getWho(i.who)==='another'" style="width: 30px;"><img></div>
                    <div class="chat">
                        <div style="margin: 7px;">
                            <div v-for="q in i.message.split('\n')">
                                {{ q }}
                            </div>
                        </div>
                    </div>
                    <div v-if="getWho(i.who)==='myself'" style="width: 30px;"><img :src="myImg"></div>
                </div>
            </div>
            <!--聊天部分-->
            <div
                style="width: 79.5%;height: 18%;position: fixed;bottom: 0;border-top: rgba(213,213,213,0.5);border-top-style: solid;border-width: 2px">
                <textarea id="text" v-model="message" @input=""></textarea>
                <button>
                    <div style="color:#21e731;font-size: 15px" @click="send">发送</div>
                </button>
            </div>
            <!--消息发生部分-->
        </div>
    </div>
</template>
<script src="./js/chat.js"/>