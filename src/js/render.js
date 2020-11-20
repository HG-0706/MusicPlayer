(function(root){

    function renderImg(src){
        // console.log(src)
        root.blurImg(src);
        var img = document.querySelector(".songImg img");
        img.src = src;
    }

    function renderInfo(info){
        var infoChildren = document.querySelector(".songInfo").children;
        infoChildren[0].innerHTML = info.song;
        infoChildren[1].innerHTML = info.singer;
        infoChildren[2].innerHTML = info.album;
    }

    function renderIsLike(isLike){
        var lis =document.querySelectorAll(".control li");
        lis[0].className = isLike?"liking":"";
    }

    
    // function renderTime(duration){
    //     var totalTime = document.getElementsByClassName("totalTime");
    //     totalTime.innerHTML = duration/60;
    // }
    root.render = function(data){
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
        // renderTime(data.duration)
    };
})(window.player || (window.player = {}))