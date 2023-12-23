<template>
    <div style="display: flex">
        <div style="height: 100%;width: 20%;">
            <div>

            </div>
        </div>
        <div style="height: 100%;width: 80%">
            <div style="background-color: #e3e5e7;height: 45px;display: flex;justify-content: center;flex-direction: column;"><div  style="font-size: 25px;margin-left: 15px">AI助手</div></div>
            <div id="history" style="position:fixed;height: 73%;width: 79.5%;overflow-y: scroll">
                <div v-for="i in chatHistory" :class="i.who">
                    <div v-if="i.who==='another'" style="width: 30px;"><img></div>
                    <div class="chat">
                        <div style="margin: 7px;">
                            <div v-for="q in i.message.split('\n')">
                                {{ q }}
                            </div>
                        </div>
                    </div>
                    <div v-if="i.who==='myself'" style="width: 30px;"><img></div>
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