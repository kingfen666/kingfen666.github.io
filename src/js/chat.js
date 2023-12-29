import axios from "axios";

export default {
    data() {
        return {
            myself: null, friends: [],
            myImg: "docs/img.png",
            websocket: null,
            message: "",
            chatHistory: [],
            nowChat: ""
        }
    }, mounted() {
        let that = this
        let item = localStorage.getItem("user");
        this.myself = JSON.parse(item)
        axios({
            method:"POST",
            url: `http://localhost:8080/init/${this.myself.uid}`
        }).then(function (value){
            that.friends=value.data.friend
        })
        this.websocket = new WebSocket("ws://localhost:8080/each/" + item);
        this.websocket.OPEN

        this.websocket.addEventListener("message", function (message) {
            let parse = JSON.parse(message.data);
            that.chatHistory.push(parse)
            setTimeout(function () {
                that.extracted()
            }, 0);
        })
    }, methods: {
        extracted() {
            setTimeout(function () {
                let chatDiv = document.getElementById("history");
                chatDiv.scrollTop = chatDiv.scrollHeight
            }, 0);
        }, send() {
            if (this.message !== "") {
                this.chatHistory.push({who: this.myself.uid, message: this.message})
                this.extracted()

                this.websocket.send(JSON.stringify({
                    'Object': Math.max(this.myself.uid, this.nowChat.uid) + '&' + Math.min(this.myself.uid, this.nowChat.uid),
                    'who': this.myself.uid,
                    'message': this.message
                }))
            }
            this.message = ""
        }, readHistory(friend) {
            let parse = JSON.parse(friend.another);
            this.nowChat = parse
            let that = this
            axios({
                method: "POST", url: `http://localhost:8080/history/${that.myself.uid}/${parse.uid}`
            }).then(function (value) {
                that.chatHistory = value.data.list
            })
            this.extracted()
            //document.getElementById("text").focus()
        }, getWho(who) {
            return who === this.myself.uid ? "myself" : "another"
        }
    }

}