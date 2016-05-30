/**
 * Created by Administrator on 2016/5/31.
 */
window.onload=function() {
    var oBtn = document.getElementById('gameBtn');
    var oDiv1=document.getElementById('div1');
    oBtn.onclick = function () {
        this.style.display = 'none';
        Game.init('div1');//游戏开始
    }

    var width=document.documentElement.clientWidth;
    var height=document.documentElement.clientHeight;
    var main=document.getElementById('div1');
    if(width/height>5/7){
        width=height/7*5;
    }else{
        height=width*7/5;
    }
    main.style.width=width+'px';
    main.style.height=height+'px';
};

window.onresize=function(){
    var width=document.documentElement.clientWidth;
    var height=document.documentElement.clientHeight;
    var main=document.getElementById('div1');
    if(width/height>5/7){
        width=height/7*5;
    }else{
        height=width*7/5;
    }
    main.style.width=width+'px';
    main.style.height=height+'px';
}

var Game= {

    oEnemy: {//敌人的数据
        e1: {style: 'enemy1', score: 1}
    },

    gk: [  //管卡的数据
        {
            iSpeedX: 3

        },
        {
            iSpeedX: -6

        },
        {
            iSpeedX:6

        },
        {
            iSpeedX:- 5

        },
        {
            iSpeedX:8

        },
        {
            iSpeedX:-6

        },
        {
            iSpeedX:-8

        },
        {
            iSpeedX:8

        },
        {
            iSpeedX:6

        },
        {
            iSpeedX:-10

        },
        {
            iSpeedX: 4

        },
        {
            iSpeedX: -6

        },
        {
            iSpeedX:5

        },
        {
            iSpeedX:- 7

        },
        {
            iSpeedX:9

        },
        {
            iSpeedX:-6

        },
        {
            iSpeedX:4

        },
        {
            iSpeedX:-8

        },
        {
            iSpeedX:6

        },
        {
            iSpeedX:-10

        },

    ],



    init: function (id) {//初始化
        this.oParent = document.getElementById(id);
        this.creatjf();//积分
        this.creatEnemy(0);//敌人
        this.creatfsw();//发射物
    },
    creatjf: function () {//积分的创建
        var oS = document.createElement('div');
        oS.id = 'score';
        oS.innerHTML = '积分：<span>0</span>';
        this.oParent.appendChild(oS);

        this.oSNum = oS.getElementsByTagName('span')[0];//让span能够操作
    },
    creatEnemy: function (iNow) { //敌人的创建

        var This=this;
        var gk = this.gk[iNow];
        document.title = '第' + (iNow+1) + '关';

        function sJs(){
            var str=Math.ceil(Math.random()*16777215).toString(16);
            while(str.length<6){
                str='0'+str;
            }
            return str;
        }

        var oDive1 = document.createElement('div');
        oDive1.id = 'enemy1';
        oDive1.style.background = '#' + sJs();
        this.oParent.appendChild(oDive1);
        this.oDive1 = oDive1;//让oDive1变成对象的属性
        oDive1.style.left = (this.oParent.offsetWidth - oDive1.offsetWidth) / 2 + 'px';
        oDive1.style.top = (this.oParent.offsetHeight - oDive1.offsetHeight) / 3 + 'px';

        this.runEnemy(gk);//让gk传参传过来
    },
    runEnemy: function (gk) {//让敌人移动
        var This = this;
        var L = 0;
        var R = this.oParent.offsetWidth - this.oDive1.offsetWidth;
        this.oDive1.timer1 = setInterval(function () {
            if (This.oDive1.offsetLeft > R) {
                gk.iSpeedX *= -1;
            }
            else if (This.oDive1.offsetLeft < L) {
                gk.iSpeedX *= -1;
            }
            This.oDive1.style.left = This.oDive1.offsetLeft + gk.iSpeedX + 'px';
        }, 30)
    },
    creatfsw: function () {//创建发射物
        var oDivf2 = document.createElement('div');
        oDivf2.id = 'fsw';
        this.oParent.appendChild(oDivf2);
        oDivf2.style.left = (this.oParent.offsetWidth - oDivf2.offsetWidth) / 2 + 'px';
        oDivf2.style.top = this.oParent.offsetHeight - oDivf2.offsetHeight * 6 + 'px';
        this.bindfsw(oDivf2);
    },
    bindfsw: function (oDivf2) {//发射发射物
        var This=this;

        oDivf2.timer1=setInterval(function(){
            if(This.oSNum.innerHTML%10>5){
                oDivf2.style.top=oDivf2.offsetTop+1+'px';
                if(oDivf2.offsetTop>This.oParent.clientHeight-oDivf2.offsetHeight){
                    alert('游戏结束!'+'游戏积分'+This.oSNum.innerHTML%10);
                    window.location.reload();
                }}
        },30)

        This.oParent.addEventListener("click", function () {
            oDivf2.timer = setInterval(function () {
                clearInterval(oDivf2.timer1);
                oDivf2.style.top = oDivf2.offsetTop - 25 + 'px';
                if (oDivf2.offsetTop < 0) {
                    clearInterval(oDivf2.timer);
                    This.oParent.removeChild(oDivf2);

                    var i= 0,max=0;
                    var aDiv=[];
                    for(i=0;i<20;i++){
                        var oDivx=document.createElement('div');
                        oDivx.id='yh1';
                        oDivx.style.left=This.oParent.offsetWidth/2+'px';

                        This.oParent.appendChild(oDivx);
                        aDiv.push(oDivx);

                        oDivx.speedX=Math.random()*30-20;
                        oDivx.speedY=Math.random()*30-20;
                    }
                    var newTimer=setInterval(function(){
                        var count=0;
                        for(i=0,max=aDiv.length;i<max;i++) {
                            if (!aDiv[i])continue;
                            aDiv[i].style.left = aDiv[i].offsetLeft + aDiv[i].speedX + 'px';
                            aDiv[i].style.top = aDiv[i].offsetTop + aDiv[i].speedY + 'px';
                            aDiv[i].speedY++;

                            if(aDiv[i].offsetLeft<0){
                                This.oParent.removeChild(aDiv[i]);
                                aDiv[i]=null;
                            }
                            else if(aDiv[i].offsetLeft>This.oParent.clientWidth||
                                aDiv[i].offsetTop>This.oParent.clientHeight){
                                This.oParent.removeChild(aDiv[i]);
                                aDiv[i]=null;
                            }
                            count++;
                        }
                        if(count==0){
                            clearInterval(newTimer);
                        }
                    },30)
                    if(This.pz(oDivf2,This.oParent.clientHeight)){
                        var tt=setTimeout(function(){
                            alert('游戏结束!'+'游戏积分'+This.oSNum.innerHTML%10);
                            window.location.reload();
                        },1000)
                    }
                }
                else if(This.pz(oDivf2,This.oDive1)){
                    clearInterval(oDivf2.timer);oDivf2.timer=null;
                    clearInterval(This.oDive1.timer1);This.oDive1.timer1=null;

                    This.oParent.removeChild(This.oDive1);

                    This.oSNum.innerHTML=parseInt(This.oSNum.innerHTML)+1;


                    var aDivf=[];
                    for(i=0;i<20;i++){
                        var oDivf=document.createElement('div');
                        oDivf.id='yh2';
                        oDivf.style.background=This.oDive1.style.background;
                        oDivf.style.left=This.oParent.offsetWidth/2+'px';
                        oDivf.style.top=This.oParent.offsetHeight/ 3+'px';


                        This.oParent.appendChild(oDivf);
                        aDivf.push(oDivf);

                        oDivf.speedX=Math.random()*30-20;
                        oDivf.speedY=Math.random()*30-20;
                    }
                    var newTimer1=setInterval(function(){
                        var count= 0,m=0;
                        for(i=0,m=aDivf.length;i<m;i++) {
                            if (!aDivf[i])continue;
                            aDivf[i].style.left = aDivf[i].offsetLeft + aDivf[i].speedX + 'px';
                            aDivf[i].style.top = aDivf[i].offsetTop + aDivf[i].speedY + 'px';
                            aDivf[i].speedY++;


                            if(aDivf[i].offsetLeft<0){
                                This.oParent.removeChild(aDivf[i]);
                                aDivf[i]=null;
                            }
                            else if(aDivf[i].offsetLeft>This.oParent.clientWidth||
                                aDivf[i].offsetTop>This.oParent.clientHeight){
                                This.oParent.removeChild(aDivf[i]);
                                aDivf[i]=null;
                            }
                            count++;
                        }
                        if(count==0){
                            clearInterval(newTimer1);
                        }

                    },30)


                    var fCount=0;
                    var flashBack=setInterval(function(){
                        if(fCount++%2){
                            This.oParent.style.background='#ccc';
                        }
                        else{
                            This.oParent.style.background="black";
                        }
                        if(fCount>2){
                            clearInterval(flashBack);
                        }
                    },30)
                    Game.creatEnemy(This.oSNum.innerHTML%10);
                    Game.runEnemy();
                    Game.creatfsw();
                    This.oParent.removeChild(oDivf2);

                }
            }, 30)

        },true);


    },
    pz:function(obj1,obj2){//碰撞检测
        var L1=obj1.offsetLeft;
        var R1=obj1.offsetLeft+obj1.offsetWidth;
        var T1=obj1.offsetTop;
        var B1=obj1.offsetTop+obj1.offsetHeight;

        var L2=obj2.offsetLeft;
        var R2=obj2.offsetLeft+obj2.offsetWidth;
        var T2=obj2.offsetTop;
        var B2=obj2.offsetTop+obj2.offsetHeight;

        if(R1<L2||L1>R2||B1<T2||T1>B2){
            return false;
        }
        else{
            return true;
        }
    }
};