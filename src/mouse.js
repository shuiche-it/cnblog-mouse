(function ($) {
    $.extend({
        shuicheMouse: (options) => {
            var silence = new Silence();
            silence.init(options);
        }
    });

    class Silence {
        constructor() {
            this.defaluts = {
                type: 1,
                color: false,
            };

            this.version = '0.0.1';
        }

        get cnblogs() {
            return {
                canvase: '#shuicheCanvase',
            };
        }

        /**
         * 初始化
         * @param {Object} options 全局配置选项
         */
        init(options) {
            if (options) {
                $.extend(true, this.defaluts, options);
            }
            //创建 canvas 标签
            var canvas=$("<canvas id='shuicheCanvas' style='position: fixed; left: 0px; top: 0px; z-index: 2147483647;pointer-events:none;'></canvas>");
            //var canvas=$("<canvas id='shuicheCanvas'></canvas>");
            $("body").append(canvas);

            let typeId = this.defaluts.type;

            if(typeId >=1 && typeId < 11){
                this.mouseType1(this.defaluts.type, this.defaluts.color);
            }
        }
        mouseType1(type, myColor) {
            var canvas = document.getElementById("shuicheCanvas");
            var ctx = canvas.getContext("2d");
            var body = $("body");
            var c = $("#shuicheCanvas");
            var x,y,w,h,cx,cy,l;
            var y = [];
            var b = {
                n:100,
                c:222,    //  颜色  如果是false 则是随机渐变颜色
                bc:'#fff',   //  背景颜色
                r:0.9,
                o:0.05,
                a:1,
                s:20,
            }
            var bx = 0,by = 0,vx = 0,vy = 0;
            var td = 0;
            var p = 0;
            var hs = 0;
            re();
            var color = Math.random()*360;
            var color2;

            if(myColor){
                color2 = myColor;
            }else{
                color2 = 'hsl('+color+',100%,80%)';
            }
            $(window).resize(function(){
                re();
            });
            var tp = type;
            //每一帧渲染都会执行此函数
            function begin(){
                if(tp == 1){
                    ctx.clearRect(0,0,w,h);
                    for(var i=0;i<y.length;i++){
                        ctx.globalAlpha = y[i].o;
                        ctx.fillStyle = color2;
                        ctx.beginPath();
                        ctx.arc(y[i].x,y[i].y,y[i].r,0,Math.PI*2);
                        ctx.closePath();
                        ctx.fill();
                        y[i].r+=b.r;
                        y[i].o-=b.o;
                        if(y[i].o<=0){
                            y.splice(i,1);
                            i--;
                        };
                    }
                }else if(tp == 2){
                    ctx.clearRect(0,0,w,h);
                    for(var i=0;i<y.length;i++){
                        ctx.globalAlpha = y[i].o;
                        ctx.fillStyle = color2;
                        ctx.beginPath();
                        y[i].r=10;
                        ctx.shadowBlur=20;
                        ctx.shadowColor=color2;
                        ctx.arc(y[i].x,y[i].y,y[i].r,0,Math.PI*2);
                        ctx.closePath();
                        ctx.fill();
                        ctx.shadowBlur=0;
                        y[i].o-=b.o;
                        y[i].v+=b.a;
                        y[i].y+=y[i].v;
                        if(y[i].y>=h+y[i].r || y[i].o<=0){
                            y.splice(i,1);
                            i--;
                        };
                    }
                }else if(tp == 3){
                    td+=5;
                    ctx.clearRect(0,0,w,h);
                    for(var i=0;i<y.length;i++){
                        ctx.globalAlpha = y[i].o;
                        ctx.fillStyle = color2;
                        ctx.beginPath();
                        ctx.shadowBlur=20;
                        ctx.shadowColor=color2;
                        y[i].r=(1-(y[i].y/h))*20;
                        ctx.arc(y[i].x,y[i].y,y[i].r,0,Math.PI*2);
                        ctx.closePath();
                        ctx.fill();
                        ctx.shadowBlur=0;
                        y[i].o=y[i].y/h;
                        y[i].v+=b.a;
                        y[i].y-=b.s;
                        y[i].x+=(Math.cos((y[i].y+td)/100)*10);
                        if(y[i].y<=0-y[i].r || y[i].o<=0){
                            y.splice(i,1);
                            i--;
                        };
                    }
                }else if(tp == 4){
                    ctx.clearRect(0,0,w,h);
                    for(var i=0;i<y.length;i++){
                        ctx.globalAlpha = y[i].o;
                        ctx.fillStyle = color2;
                        ctx.beginPath();
                        ctx.shadowBlur=20;
                        ctx.shadowColor=color2;
                        y[i].vx2 += (cx - y[i].wx)/1000;
                        y[i].vy2 += (cy - y[i].wy)/1000;
                        y[i].wx+=y[i].vx2;
                        y[i].wy+=y[i].vy2;
                        y[i].o-=b.o/2;
                        y[i].r=10;
                        ctx.arc(y[i].wx,y[i].wy,y[i].r,0,Math.PI*2);
                        ctx.closePath();
                        ctx.fill();
                        ctx.shadowBlur=0;
                        if(y[i].o<=0){
                            y.splice(i,1);
                            i--;
                        };
                    }
                }else if(tp == 5){
                    if(!b.c){
                        color+=.1;
                        color2 = 'hsl('+color+',100%,80%)';
                    }
                    ctx.clearRect(0,0,w,h);

                    p+=10;
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = color2;

                    ctx.shadowBlur=20;
                    ctx.shadowColor=color2;

                    ctx.beginPath();
                    ctx.arc(cx+50*Math.cos(p*Math.PI/180),cy+50*Math.sin(p*Math.PI/180),10,0,Math.PI*2);
                    ctx.closePath();
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(cx+50*Math.cos((p+180)*Math.PI/180),cy+50*Math.sin((p+180)*Math.PI/180),10,0,Math.PI*2);
                    ctx.closePath();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(cx+50*Math.cos((p+90)*Math.PI/180),cy+50*Math.sin((p+90)*Math.PI/180),10,0,Math.PI*2);
                    ctx.closePath();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(cx+50*Math.cos((p+270)*Math.PI/180),cy+50*Math.sin((p+270)*Math.PI/180),10,0,Math.PI*2);
                    ctx.closePath();
                    ctx.fill();
                    ctx.shadowBlur=0;
                }else if(tp == 6){
                    ctx.clearRect(0,0,w,h);
                    for(var i=0;i<y.length;i++){
                        ctx.globalAlpha = y[i].o;
                        ctx.strokeStyle = color2;
                        ctx.beginPath();
                        ctx.lineWidth = 2;
                        ctx.moveTo(y[i].x,y[i].y);
                        ctx.lineTo((y[i].wx+y[i].x)/2+Math.random()*20,(y[i].wy+y[i].y)/2+Math.random()*20);
                        ctx.lineTo(y[i].wx,y[i].wy);
                        ctx.closePath();
                        ctx.stroke();
                        y[i].o-=b.o;
                        if(y[i].o<=0){
                            y.splice(i,1);
                            i--;
                        };
                    }
                }else if(tp == 7){
                    ctx.clearRect(0,0,w,h);

                    if(y.length<b.n*2){
                        hs = Math.random()*2*Math.PI;
                        y.push({x:cx+((Math.random()-.5)*100*Math.cos(hs)),y:cy+((Math.random()-.5)*100*Math.cos(hs)),o:1,h:hs});
                    }
                    for(var i=0;i<y.length;i++){
                        ctx.globalAlpha = y[i].o;
                        ctx.fillStyle = color2;
                        ctx.beginPath();
                        y[i].x+=(cx-y[i].x)/10;
                        y[i].y+=(cy-y[i].y)/10;
                        ctx.arc(y[i].x,y[i].y,1,0,Math.PI*2);
                        ctx.closePath();
                        ctx.fill();
                        y[i].o-=b.o;
                        if(y[i].o<=0){
                            y[i].h = Math.random()*2*Math.PI;
                            y[i].x = cx+((Math.random()-.5)*100*Math.cos(y[i].h));
                            y[i].y = cy+((Math.random()-.5)*100*Math.sin(y[i].h));
                            y[i].o = 1;
                        };
                    }
                }else if(tp == 8){
                    ctx.clearRect(0,0,w,h);

                    ctx.fillStyle = color2;
                    if(cx%4 == 0){
                        cx+=1;
                    }else if(cx%4 == 2){
                        cx-=1
                    }
                    else if(cx%4 == 3){
                        cx-=2
                    }
                    if(cy%4 == 0){
                        cy+=1;
                    }else if(cy%4 == 2){
                        cy-=1
                    }
                    else if(cy%4 == 3){
                        cy-=2
                    }
                    for(var i=cx-60;i<cx+60;i+=4){
                        for(var j=cy-60;j<cy+60;j+=4){
                            if(Math.sqrt(Math.pow(cx-i,2)+Math.pow(cy-j,2))<=60){
                                ctx.globalAlpha = 1-(Math.sqrt(Math.pow(cx-i,2)+Math.pow(cy-j,2))/60);
                                if(Math.random()<.2){
                                    ctx.fillRect(i,j,3,3);
                                }
                            }
                        }
                    }
                }else if(tp == 9){
                    ctx.clearRect(0,0,w,h);
                    ctx.fillStyle = color2;
                    if(cx%4 == 0){
                        cx+=1;
                    }else if(cx%4 == 2){
                        cx-=1
                    }
                    else if(cx%4 == 3){
                        cx-=2
                    }
                    if(cy%4 == 0){
                        cy+=1;
                    }else if(cy%4 == 2){
                        cy-=1
                    }
                    else if(cy%4 == 3){
                        cy-=2
                    }
                    if(y.length<b.n){
                        y.push({x:cx,y:cy,xv:0,yv:0,o:1});
                    }
                    for(var i=0;i<y.length;i++){
                        if(y[i].xv==0 && y[i].yv==0){
                            if(Math.random()<.5){
                                if(Math.random()<.5){
                                    y[i].xv = 3;
                                }else{
                                    y[i].xv = -3;
                                }
                            }else{
                                if(Math.random()<.5){
                                    y[i].yv = 3;
                                }else{
                                    y[i].yv = -3;
                                }
                            }
                        }else{
                            if(y[i].xv == 0){
                                if(Math.random()<.66){
                                    y[i].yv = 0;
                                    if(Math.random()<.5){
                                        y[i].xv = 3;
                                    }else{
                                        y[i].xv = -3;
                                    }
                                }
                            }else if(y[i].yv == 0){
                                if(Math.random()<.66){
                                    y[i].xv = 0;
                                    if(Math.random()<.5){
                                        y[i].yv = 3;
                                    }else{
                                        y[i].yv = -3;
                                    }
                                }
                            }
                        }
                        y[i].o-=b.o/2;
                        ctx.globalAlpha = y[i].o;
                        y[i].x+=y[i].xv;
                        y[i].y+=y[i].yv;
                        ctx.fillRect(y[i].x,y[i].y,3,3);
                        if(y[i].o<=0){
                            y.splice(i,1);
                            i--;
                        };
                    }
                }else if(tp == 10){
                    ctx.clearRect(0,0,w,h);

                    ctx.fillStyle = color2;
                    y.push({x:cx,y:cy,xv:2,yv:1,o:1});

                    for(var i=0;i<y.length;i++){
                        y[i].o-=b.o/10;
                        ctx.globalAlpha = y[i].o;
                        y[i].x+=(Math.random()-.5)*4;
                        y[i].y-=1;
                        ctx.fillRect(y[i].x,y[i].y,2,2);
                        if(y[i].o<=0){
                            y.splice(i,1);
                            i--;
                        };
                    }
                }
                window.requestAnimationFrame(begin);
            }
            function re(){
                w = window.innerWidth;
                h = window.innerHeight;
                canvas.width = w;
                canvas.height = h;
                cx = w/2;
                cy = h/2;
            };
            body.mousemove(function(e){
                cx = e.pageX-c.offset().left;
                cy = e.pageY-c.offset().top;
                if(tp == 4){
                    if(Math.random()<=.5){
                        if(Math.random()<=.5){
                            bx = -10;
                        }else{
                            bx = w+10;
                        }
                        by = Math.random()*h;
                    }else{
                        if(Math.random()<=.5){
                            by = -10;
                        }else{
                            by = h+10;
                        }
                        bx = Math.random()*w;
                    }
                    vx = (Math.random()-.5)*8;
                    vy = (Math.random()-.5)*8;
                }
                if(tp==1 || tp==2 || tp==3){
                    y.push({x:cx,y:cy,r:b.r,o:1,v:0});
                }else if(tp==4){
                    y.push({x:cx,y:cy,r:b.r,o:1,v:0,wx:bx,wy:by,vx2:vx,vy2:vy});
                }else if(tp==6){
                    y.push({x:cx+((Math.random()-.5)*30),y:cy+((Math.random()-.5)*30),o:1,wx:cx,wy:cy});
                }
            });

            (function() {
                var lastTime = 0;
                var vendors = ['webkit', 'moz'];
                for(var xx = 0; xx < vendors.length && !window.requestAnimationFrame; ++xx) {
                    window.requestAnimationFrame = window[vendors[xx] + 'RequestAnimationFrame'];
                    window.cancelAnimationFrame = window[vendors[xx] + 'CancelAnimationFrame'] ||
                        window[vendors[xx] + 'CancelRequestAnimationFrame'];
                }

                if (!window.requestAnimationFrame) {
                    window.requestAnimationFrame = function(callback, element) {
                        var currTime = new Date().getTime();
                        var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                        var id = window.setTimeout(function() {
                            callback(currTime + timeToCall);
                        }, timeToCall);
                        lastTime = currTime + timeToCall;
                        return id;
                    };
                }
                if (!window.cancelAnimationFrame) {
                    window.cancelAnimationFrame = function(id) {
                        clearTimeout(id);
                    };
                }
            }());
            begin();
        }
    }
})(jQuery);
