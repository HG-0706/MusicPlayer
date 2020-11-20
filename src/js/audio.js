(function(root){
    function AudioManage(){
        this.audio = new Audio();
        this.status = "pause";
    }
    AudioManage.prototype = {
        //加载音频
        load(src){
            this.audio.src = src;//设置音频路径
            // console.log(src);
            this.audio.load();
        },
        
        play(){
            this.audio.play();
            this.status = "play"
        },
        stop(){
            this.audio.pause();
            this.status = 'pause';
        },
        end(fn){
            this.audio.ended = fn;
        },
        playTo(time){
            this.audio.currentTime = time;
        }
    }

    root.music = new AudioManage(); //暴露接口
})(window.player || (window.player = {}))