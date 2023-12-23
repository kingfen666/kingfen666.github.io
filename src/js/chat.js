import conf from '/Myconfig.json'

function extracted() {
    let chatDiv = document.getElementById("history");
    chatDiv.scrollTop = chatDiv.scrollHeight;

}
window.onload = function() {
    extracted();
}
export default {
    data(){
        return{
            websocket: null,
            message: "",
            chatHistory:[{who:"another",message:"我是你的专属ai,你可以问我一些问题。"}]
        }
    },mounted() {
        document.getElementById("text").focus()
        this.websocket =new WebSocket("ws://localhost:8080/each");
        this.websocket.OPEN
        let that=this
        this.websocket.addEventListener("message",function (message){
            let parse = JSON.parse(message.data);
            that.chatHistory.push({who:"another",message:parse.message})
            setTimeout(function() {
                that.extracted()
            }, 0);
            new Audio(parse.path).play()
        })
    },
    methods:{
        extracted() {
            let chatDiv = document.getElementById("history");
            chatDiv.scrollTop=chatDiv.scrollHeight
        },
        send(){
            if (this.message!==""){
                this.chatHistory.push({who:"myself",message:this.message})
                let that=this
                setTimeout(function() {
                    that.extracted()
                }, 0);
                this.websocket.send(this.message)
            }
            this.message=""
        },
    }

}