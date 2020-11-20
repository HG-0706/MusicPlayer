(function(root){
    function listControl(data,wrap){
        // <div class="list">
        //     <dl>
        //         <dt>播放列表</dt>
        //         <dd>丑八怪</dd>
        //         <dd>丑八怪</dd>
        //         <dd>丑八怪</dd>
        //         <dd>丑八怪</dd>
        //     </dl>
        //     <div class="close">关闭</div>
        // </div>
        var list = document.createElement("div"),
        dl = document.createElement("dl"),
        dt = document.createElement("dt"),
        close = document.createElement("div"),
        musicList = [];

        list.className = "list";
        dt.innerHTML = "播放列表";
        close.className = "close";
        close.innerHTML = "关闭";
        dl.appendChild(dt);
        data.forEach(function(ele,index){
            var dd = document.createElement("dd");
            dd.innerHTML = ele.song;
            dd.addEventListener("touchend",function(){
                changeSelect(index);
            })
            dl.appendChild(dd);
            musicList.push(dd);
        })
        list.appendChild(dl);
        list.appendChild(close);
        wrap.appendChild(list);

        close.addEventListener('touchend',slideDown);
        changeSelect(0);
        var disY = list.offsetHeight;

        list.style.transform = 'translateY('+ disY +'px)';

        function slideUp(){
            list.style.transition = ".2s";
            list.style.transform = 'translateY('+ 0 +'px)';
        }

        function slideDown(){
            list.style.transition = ".2s";
            list.style.transform = 'translateY('+ disY +'px)';
        }

        function changeSelect(index){
            for (let i = 0; i < musicList.length; i++) {
                    musicList[i].className = '';                
            }
            musicList[index].className = 'active';
        }
        return {
            dom:list,
            musicList:musicList,
            slideDown:slideDown,
            slideUp:slideUp,
            changeSelect:changeSelect
        }
    }

    root.listControl = listControl;
})(window.player || (window.player = {}))