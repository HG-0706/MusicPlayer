(function ($, root) {
    function MusicPlayer(dom) {
        this.wrap = dom;
        this.dataList = [];
        this.indexObj = null;
        this.rotateTimer = null;
        this.curIndex = null;
    }
    MusicPlayer.prototype = {
        init() {
            this.getDom(),
                this.getData("../mock/data.json")
        },
        getDom() {
            this.controlList = document.querySelectorAll(".control li");
            this.record = document.querySelector(".songImg img");
        },
        getData(url) {
            var _this = this;
            $.ajax({
                url: url,
                method: "get",
                success: function (data) {
                    _this.dataList = data;
                    _this.listPlay();
                    _this.indexObj = new player.indexControl(data.length);
                    _this.loadMusic(_this.indexObj.index);
                    _this.musicControl();
                },
                error: function () {
                    alert("请求数据失败");
                }
            })
        },
        loadMusic(index) {
            player.render(this.dataList[index]);
            player.music.load(this.dataList[index].audio);
            if (player.music.status == "play") {
                player.music.play();
                this.imgRotate(0);
                this.controlList[2].className = "playing"
            }
            this.list.changeSelect(index);
            this.curIndex = index;
        },
        musicControl() {
            var _this = this;
            this.controlList[1].addEventListener("touchend", function () {
                player.music.status = "play";
                _this.loadMusic(_this.indexObj.prev());
            })
            this.controlList[3].addEventListener("touchend", function () {
                player.music.status = "play";
                _this.loadMusic(_this.indexObj.next());
            })
            this.controlList[2].addEventListener("touchend", function () {
                if (player.music.status == "play") {
                    player.music.stop();
                    this.className = "";
                    _this.imgStop();
                } else {
                    player.music.play();
                    this.className = "playing";
                    var deg = _this.record.dataset.rotate;
                    _this.imgRotate(deg || 0);
                }
            })
        },
        imgRotate(deg) {
            var _this = this;
            clearInterval(this.rotateTimer);
            this.rotateTimer = setInterval(function () {
                deg = (+deg + 0.2) % 360;
                _this.record.style.transform = 'rotate(' + deg + 'deg)';
                _this.record.dataset.rotate = deg;
            }, 1000 / 60)
        },
        imgStop() {
            clearInterval(this.rotateTimer)
        },
        listPlay() {
            var _this = this;
            this.list = player.listControl(this.dataList, this.wrap);


            this.controlList[4].addEventListener("touchend",function(){
                _this.list.slideUp();
            })


            this.list.musicList.forEach(function(item,index){
                item.addEventListener("touchend",function(){
                    if(_this.curIndex == index){
                        return;
                    }
                    player.music.status = "play";
                    _this.indexObj.index = index;// indexControl中的index要更新
                    _this.loadMusic(index);
                    _this.list.slideDown();
                })
            })
        },
        process(){

        }
    };

    var musicPlayer = new MusicPlayer(document.getElementById("wrap"));
    musicPlayer.init();

})(window.Zepto, window.player)