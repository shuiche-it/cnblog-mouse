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

            (function () {
                var lastTime = 0;
                var vendors = ['webkit', 'moz'];
                for (var xx = 0; xx < vendors.length && !window.requestAnimationFrame; ++xx) {
                    window.requestAnimationFrame = window[vendors[xx] + 'RequestAnimationFrame'];
                    window.cancelAnimationFrame = window[vendors[xx] + 'CancelAnimationFrame'] ||
                        window[vendors[xx] + 'CancelRequestAnimationFrame'];
                }

                if (!window.requestAnimationFrame) {
                    window.requestAnimationFrame = function (callback, element) {
                        var currTime = new Date().getTime();
                        var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                        var id = window.setTimeout(function () {
                            callback(currTime + timeToCall);
                        }, timeToCall);
                        lastTime = currTime + timeToCall;
                        return id;
                    };
                }
                if (!window.cancelAnimationFrame) {
                    window.cancelAnimationFrame = function (id) {
                        clearTimeout(id);
                    };
                }
            }());

            if (options) {
                $.extend(true, this.defaluts, options);
            }
            //创建 canvas 标签
            var canvas = $("<canvas id='shuicheCanvas' style='position: fixed; left: 0px; top: 0px; z-index: 2147483647;pointer-events:none;'></canvas>");
            //var canvas=$("<canvas id='shuicheCanvas'></canvas>");
            $("body").append(canvas);

            let typeId = this.defaluts.type;

            if (typeId >= 1 && typeId < 11) {
                this.mouseType1(this.defaluts.type, this.defaluts.color);
            }
            if (typeId == 11) {
                this.mouseType2()
            }
            if (typeId == 12) {
                this.mouseType3()
            }

        }

        mouseType1(type, myColor) {
            var canvas = document.getElementById("shuicheCanvas");
            var ctx = canvas.getContext("2d");
            var c = $("#shuicheCanvas");
            var x, y, w, h, cx, cy, l;
            var y = [];
            var b = {
                n: 100,
                c: 222,    //  颜色  如果是false 则是随机渐变颜色
                bc: '#fff',   //  背景颜色
                r: 0.9,
                o: 0.05,
                a: 1,
                s: 20,
            }
            var bx = 0, by = 0, vx = 0, vy = 0;
            var td = 0;
            var p = 0;
            var hs = 0;
            re();
            var color = Math.random() * 360;
            var color2;

            if (myColor) {
                color2 = myColor;
            } else {
                color2 = 'hsl(' + color + ',100%,80%)';
            }
            $(window).resize(function () {
                re();
            });
            var tp = type;

            //每一帧渲染都会执行此函数
            function begin() {
                if (tp == 1) {
                    ctx.clearRect(0, 0, w, h);
                    for (var i = 0; i < y.length; i++) {
                        ctx.globalAlpha = y[i].o;
                        ctx.fillStyle = color2;
                        ctx.beginPath();
                        ctx.arc(y[i].x, y[i].y, y[i].r, 0, Math.PI * 2);
                        ctx.closePath();
                        ctx.fill();
                        y[i].r += b.r;
                        y[i].o -= b.o;
                        if (y[i].o <= 0) {
                            y.splice(i, 1);
                            i--;
                        }
                        ;
                    }
                } else if (tp == 2) {
                    ctx.clearRect(0, 0, w, h);
                    for (var i = 0; i < y.length; i++) {
                        ctx.globalAlpha = y[i].o;
                        ctx.fillStyle = color2;
                        ctx.beginPath();
                        y[i].r = 10;
                        ctx.shadowBlur = 20;
                        ctx.shadowColor = color2;
                        ctx.arc(y[i].x, y[i].y, y[i].r, 0, Math.PI * 2);
                        ctx.closePath();
                        ctx.fill();
                        ctx.shadowBlur = 0;
                        y[i].o -= b.o;
                        y[i].v += b.a;
                        y[i].y += y[i].v;
                        if (y[i].y >= h + y[i].r || y[i].o <= 0) {
                            y.splice(i, 1);
                            i--;
                        }
                        ;
                    }
                } else if (tp == 3) {
                    td += 5;
                    ctx.clearRect(0, 0, w, h);
                    for (var i = 0; i < y.length; i++) {
                        ctx.globalAlpha = y[i].o;
                        ctx.fillStyle = color2;
                        ctx.beginPath();
                        ctx.shadowBlur = 20;
                        ctx.shadowColor = color2;
                        y[i].r = (1 - (y[i].y / h)) * 20;
                        ctx.arc(y[i].x, y[i].y, y[i].r, 0, Math.PI * 2);
                        ctx.closePath();
                        ctx.fill();
                        ctx.shadowBlur = 0;
                        y[i].o = y[i].y / h;
                        y[i].v += b.a;
                        y[i].y -= b.s;
                        y[i].x += (Math.cos((y[i].y + td) / 100) * 10);
                        if (y[i].y <= 0 - y[i].r || y[i].o <= 0) {
                            y.splice(i, 1);
                            i--;
                        }
                        ;
                    }
                } else if (tp == 4) {
                    ctx.clearRect(0, 0, w, h);
                    for (var i = 0; i < y.length; i++) {
                        ctx.globalAlpha = y[i].o;
                        ctx.fillStyle = color2;
                        ctx.beginPath();
                        ctx.shadowBlur = 20;
                        ctx.shadowColor = color2;
                        y[i].vx2 += (cx - y[i].wx) / 1000;
                        y[i].vy2 += (cy - y[i].wy) / 1000;
                        y[i].wx += y[i].vx2;
                        y[i].wy += y[i].vy2;
                        y[i].o -= b.o / 2;
                        y[i].r = 10;
                        ctx.arc(y[i].wx, y[i].wy, y[i].r, 0, Math.PI * 2);
                        ctx.closePath();
                        ctx.fill();
                        ctx.shadowBlur = 0;
                        if (y[i].o <= 0) {
                            y.splice(i, 1);
                            i--;
                        }
                        ;
                    }
                } else if (tp == 5) {
                    if (!b.c) {
                        color += .1;
                        color2 = 'hsl(' + color + ',100%,80%)';
                    }
                    ctx.clearRect(0, 0, w, h);

                    p += 10;
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = color2;

                    ctx.shadowBlur = 20;
                    ctx.shadowColor = color2;

                    ctx.beginPath();
                    ctx.arc(cx + 50 * Math.cos(p * Math.PI / 180), cy + 50 * Math.sin(p * Math.PI / 180), 10, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(cx + 50 * Math.cos((p + 180) * Math.PI / 180), cy + 50 * Math.sin((p + 180) * Math.PI / 180), 10, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(cx + 50 * Math.cos((p + 90) * Math.PI / 180), cy + 50 * Math.sin((p + 90) * Math.PI / 180), 10, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(cx + 50 * Math.cos((p + 270) * Math.PI / 180), cy + 50 * Math.sin((p + 270) * Math.PI / 180), 10, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.fill();
                    ctx.shadowBlur = 0;
                } else if (tp == 6) {
                    ctx.clearRect(0, 0, w, h);
                    for (var i = 0; i < y.length; i++) {
                        ctx.globalAlpha = y[i].o;
                        ctx.strokeStyle = color2;
                        ctx.beginPath();
                        ctx.lineWidth = 2;
                        ctx.moveTo(y[i].x, y[i].y);
                        ctx.lineTo((y[i].wx + y[i].x) / 2 + Math.random() * 20, (y[i].wy + y[i].y) / 2 + Math.random() * 20);
                        ctx.lineTo(y[i].wx, y[i].wy);
                        ctx.closePath();
                        ctx.stroke();
                        y[i].o -= b.o;
                        if (y[i].o <= 0) {
                            y.splice(i, 1);
                            i--;
                        }
                        ;
                    }
                } else if (tp == 7) {
                    ctx.clearRect(0, 0, w, h);

                    if (y.length < b.n * 2) {
                        hs = Math.random() * 2 * Math.PI;
                        y.push({
                            x: cx + ((Math.random() - .5) * 100 * Math.cos(hs)),
                            y: cy + ((Math.random() - .5) * 100 * Math.cos(hs)),
                            o: 1,
                            h: hs
                        });
                    }
                    for (var i = 0; i < y.length; i++) {
                        ctx.globalAlpha = y[i].o;
                        ctx.fillStyle = color2;
                        ctx.beginPath();
                        y[i].x += (cx - y[i].x) / 10;
                        y[i].y += (cy - y[i].y) / 10;
                        ctx.arc(y[i].x, y[i].y, 1, 0, Math.PI * 2);
                        ctx.closePath();
                        ctx.fill();
                        y[i].o -= b.o;
                        if (y[i].o <= 0) {
                            y[i].h = Math.random() * 2 * Math.PI;
                            y[i].x = cx + ((Math.random() - .5) * 100 * Math.cos(y[i].h));
                            y[i].y = cy + ((Math.random() - .5) * 100 * Math.sin(y[i].h));
                            y[i].o = 1;
                        }
                        ;
                    }
                } else if (tp == 8) {
                    ctx.clearRect(0, 0, w, h);

                    ctx.fillStyle = color2;
                    if (cx % 4 == 0) {
                        cx += 1;
                    } else if (cx % 4 == 2) {
                        cx -= 1
                    } else if (cx % 4 == 3) {
                        cx -= 2
                    }
                    if (cy % 4 == 0) {
                        cy += 1;
                    } else if (cy % 4 == 2) {
                        cy -= 1
                    } else if (cy % 4 == 3) {
                        cy -= 2
                    }
                    for (var i = cx - 60; i < cx + 60; i += 4) {
                        for (var j = cy - 60; j < cy + 60; j += 4) {
                            if (Math.sqrt(Math.pow(cx - i, 2) + Math.pow(cy - j, 2)) <= 60) {
                                ctx.globalAlpha = 1 - (Math.sqrt(Math.pow(cx - i, 2) + Math.pow(cy - j, 2)) / 60);
                                if (Math.random() < .2) {
                                    ctx.fillRect(i, j, 3, 3);
                                }
                            }
                        }
                    }
                } else if (tp == 9) {
                    ctx.clearRect(0, 0, w, h);
                    ctx.fillStyle = color2;
                    if (cx % 4 == 0) {
                        cx += 1;
                    } else if (cx % 4 == 2) {
                        cx -= 1
                    } else if (cx % 4 == 3) {
                        cx -= 2
                    }
                    if (cy % 4 == 0) {
                        cy += 1;
                    } else if (cy % 4 == 2) {
                        cy -= 1
                    } else if (cy % 4 == 3) {
                        cy -= 2
                    }
                    if (y.length < b.n) {
                        y.push({x: cx, y: cy, xv: 0, yv: 0, o: 1});
                    }
                    for (var i = 0; i < y.length; i++) {
                        if (y[i].xv == 0 && y[i].yv == 0) {
                            if (Math.random() < .5) {
                                if (Math.random() < .5) {
                                    y[i].xv = 3;
                                } else {
                                    y[i].xv = -3;
                                }
                            } else {
                                if (Math.random() < .5) {
                                    y[i].yv = 3;
                                } else {
                                    y[i].yv = -3;
                                }
                            }
                        } else {
                            if (y[i].xv == 0) {
                                if (Math.random() < .66) {
                                    y[i].yv = 0;
                                    if (Math.random() < .5) {
                                        y[i].xv = 3;
                                    } else {
                                        y[i].xv = -3;
                                    }
                                }
                            } else if (y[i].yv == 0) {
                                if (Math.random() < .66) {
                                    y[i].xv = 0;
                                    if (Math.random() < .5) {
                                        y[i].yv = 3;
                                    } else {
                                        y[i].yv = -3;
                                    }
                                }
                            }
                        }
                        y[i].o -= b.o / 2;
                        ctx.globalAlpha = y[i].o;
                        y[i].x += y[i].xv;
                        y[i].y += y[i].yv;
                        ctx.fillRect(y[i].x, y[i].y, 3, 3);
                        if (y[i].o <= 0) {
                            y.splice(i, 1);
                            i--;
                        }
                        ;
                    }
                } else if (tp == 10) {
                    ctx.clearRect(0, 0, w, h);

                    ctx.fillStyle = color2;
                    y.push({x: cx, y: cy, xv: 2, yv: 1, o: 1});

                    for (var i = 0; i < y.length; i++) {
                        y[i].o -= b.o / 10;
                        ctx.globalAlpha = y[i].o;
                        y[i].x += (Math.random() - .5) * 4;
                        y[i].y -= 1;
                        ctx.fillRect(y[i].x, y[i].y, 2, 2);
                        if (y[i].o <= 0) {
                            y.splice(i, 1);
                            i--;
                        }
                        ;
                    }
                }
                window.requestAnimationFrame(begin);
            }

            function re() {
                w = window.innerWidth;
                h = window.innerHeight;
                canvas.width = w;
                canvas.height = h;
                cx = w / 2;
                cy = h / 2;
            };
            $(window).mousemove(function (e) {
                cx = e.pageX - c.offset().left;
                cy = e.pageY - c.offset().top;
                if (tp == 4) {
                    if (Math.random() <= .5) {
                        if (Math.random() <= .5) {
                            bx = -10;
                        } else {
                            bx = w + 10;
                        }
                        by = Math.random() * h;
                    } else {
                        if (Math.random() <= .5) {
                            by = -10;
                        } else {
                            by = h + 10;
                        }
                        bx = Math.random() * w;
                    }
                    vx = (Math.random() - .5) * 8;
                    vy = (Math.random() - .5) * 8;
                }
                if (tp == 1 || tp == 2 || tp == 3) {
                    y.push({x: cx, y: cy, r: b.r, o: 1, v: 0});
                } else if (tp == 4) {
                    y.push({x: cx, y: cy, r: b.r, o: 1, v: 0, wx: bx, wy: by, vx2: vx, vy2: vy});
                } else if (tp == 6) {
                    y.push({
                        x: cx + ((Math.random() - .5) * 30),
                        y: cy + ((Math.random() - .5) * 30),
                        o: 1,
                        wx: cx,
                        wy: cy
                    });
                }
            });

            begin();
        }

        mouseType2() {
            var SCREEN_WIDTH = window.innerWidth;
            var SCREEN_HEIGHT = window.innerHeight;

            var RADIUS = 70;

            var RADIUS_SCALE = 1;
            var RADIUS_SCALE_MIN = 1;
            var RADIUS_SCALE_MAX = 1.5;

            var QUANTITY = 25;

            var canvas;
            var context;
            var particles;

            var mouseX = SCREEN_WIDTH * 0.5;
            var mouseY = SCREEN_HEIGHT * 0.5;
            var mouseIsDown = false;

            function init() {
                canvas = document.getElementById('shuicheCanvas');
                if (canvas && canvas.getContext) {
                    context = canvas.getContext('2d');
                    // Register event listeners
                    window.addEventListener('mousemove', documentMouseMoveHandler, false);
                    window.addEventListener('mousedown', documentMouseDownHandler, false);
                    window.addEventListener('mouseup', documentMouseUpHandler, false);
                    document.addEventListener('touchstart', documentTouchStartHandler, false);
                    document.addEventListener('touchmove', documentTouchMoveHandler, false);
                    window.addEventListener('resize', windowResizeHandler, false);

                    createParticles();
                    windowResizeHandler();
                    loop()
                }
            }

            //创建线条
            function createParticles() {
                particles = [];

                for (var i = 0; i < QUANTITY; i++) {
                    var particle = {
                        size: 1,
                        position: {x: mouseX, y: mouseY},
                        offset: {x: 0, y: 0},
                        shift: {x: mouseX, y: mouseY},
                        speed: 0.01 + Math.random() * 0.04,
                        targetSize: 1,
                        fillColor: '#' + (Math.random() * 0x904040 + 0xaaaaaa | 0).toString(16),
                        orbit: RADIUS * .5 + (RADIUS * .5 * Math.random())
                    };

                    particles.push(particle);
                }
            }

            //鼠标移动事件
            function documentMouseMoveHandler(event) {
                console.log("----------")
                mouseX = event.clientX - (window.innerWidth - SCREEN_WIDTH) * .5;
                mouseY = event.clientY - (window.innerHeight - SCREEN_HEIGHT) * .5;
            }

            //鼠标按下
            function documentMouseDownHandler(event) {
                mouseIsDown = true;
            }

            //鼠标抬起
            function documentMouseUpHandler(event) {
                mouseIsDown = false;
            }

            //移动端 touch
            function documentTouchStartHandler(event) {
                if (event.touches.length == 1) {
                    event.preventDefault();

                    mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;
                    ;
                    mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;
                }
            }

            //移动端滑动
            function documentTouchMoveHandler(event) {
                if (event.touches.length == 1) {
                    event.preventDefault();

                    mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;
                    ;
                    mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;
                }
            }

            //窗口大小改变
            function windowResizeHandler() {
                SCREEN_WIDTH = window.innerWidth;
                SCREEN_HEIGHT = window.innerHeight;

                canvas.width = SCREEN_WIDTH;
                canvas.height = SCREEN_HEIGHT;
            }

            function loop() {
                if (mouseIsDown) {
                    RADIUS_SCALE += (RADIUS_SCALE_MAX - RADIUS_SCALE) * (0.02);
                } else {
                    RADIUS_SCALE -= (RADIUS_SCALE - RADIUS_SCALE_MIN) * (0.02);
                }

                RADIUS_SCALE = Math.min(RADIUS_SCALE, RADIUS_SCALE_MAX);

                //context.fillStyle = 'rgba(0,0,0,0.05)';
                //context.fillRect(0, 0, context.canvas.width, context.canvas.height);
                context.clearRect(0, 0, context.canvas.width, context.canvas.height)
                for (var i = 0, len = particles.length; i < len; i++) {
                    var particle = particles[i];

                    var lp = {x: particle.position.x, y: particle.position.y};

                    // Rotation
                    particle.offset.x += particle.speed;
                    particle.offset.y += particle.speed;

                    // Follow mouse with some lag
                    particle.shift.x += (mouseX - particle.shift.x) * (particle.speed);
                    particle.shift.y += (mouseY - particle.shift.y) * (particle.speed);

                    // Apply position
                    particle.position.x = particle.shift.x + Math.cos(i + particle.offset.x) * (particle.orbit * RADIUS_SCALE);
                    particle.position.y = particle.shift.y + Math.sin(i + particle.offset.y) * (particle.orbit * RADIUS_SCALE);

                    // Limit to screen bounds
                    particle.position.x = Math.max(Math.min(particle.position.x, SCREEN_WIDTH), 0);
                    particle.position.y = Math.max(Math.min(particle.position.y, SCREEN_HEIGHT), 0);

                    particle.size += (particle.targetSize - particle.size) * 0.01;

                    if (Math.round(particle.size) == Math.round(particle.targetSize)) {
                        particle.targetSize = 1 + Math.random() * 2;
                    }

                    context.beginPath();
                    context.fillStyle = particle.fillColor;
                    context.strokeStyle = particle.fillColor;
                    context.lineWidth = particle.size;
                    context.moveTo(lp.x, lp.y);
                    context.lineTo(particle.position.x, particle.position.y);
                    context.stroke();
                    context.arc(particle.position.x, particle.position.y, particle.size / 2, 0, Math.PI * 2, true);
                    context.fill();
                }
                window.requestAnimationFrame(loop);
            }

            init()
        }

        mouseType3() {

            //创建 canvas 标签
            var div = $("<div id='shuicheDiv' style='position: fixed;width: 100%;height: "+ $(window).height() +"px; left: 0px; top: 0px; z-index: 2147483647;pointer-events:none;'></div>");
            $("body").append(div);

            var Follow = function () {
                var $ = function (i) {
                    return document.getElementById(i)
                };
                var addEvent = function (o, e, f) {
                    window.addEventListener ? window.addEventListener(e, f, false) : window.attachEvent('on' + e, function () {
                        f.call(window)
                    })
                }

                var OBJ = []
                var sp
                var rs
                var N = 0
                var m;

                var init = function (id, config) {
                    this.config = config || {};
                    this.obj = $(id);
                    sp = this.config.speed || 4;
                    rs = this.config.animR || 1;
                    m = {x: $(id).offsetWidth * .5, y: $(id).offsetHeight * .5};
                    this.setXY();
                    this.start();
                }

                init.prototype = {
                    setXY: function () {
                        var _this = this;

                        addEvent(this.obj, 'mousemove', function (e) {
                            e = e || window.event;
                            console.log(e.clientX);
                            m.x = e.clientX;
                            m.y = e.clientY;
                        })
                    },

                    start: function () {
                        var k = 180 / Math.PI, OO, o, _this = this, fn = this.config.fn;
                        OBJ[N++] = OO = new CObj(null, 0, 0);
                        for (var i = 0; i < 360; i += 20) {
                            var O = OO;
                            for (var j = 10; j < 35; j += 1) {
                                var x = fn(i, j).x,
                                    y = fn(i, j).y;
                                OBJ[N++] = o = new CObj(O, x, y);
                                O = o;
                            }
                        }
                        setInterval(function () {
                            for (var i = 0; i < N; i++) OBJ[i].run();
                        }, 16);

                    }

                }

                var CObj = function (p, cx, cy) {

                    var obj = document.createElement("span");

                    this.css = obj.style;
                    this.css.backgroundColor = "#2D8CF0"
                    this.css.width="2px";
                    this.css.height="2px";

                    this.css.position = "absolute";
                    this.css.left = "-1000px";
                    this.css.zIndex = 1000 - N;

                    document.getElementById("shuicheDiv").appendChild(obj);

                    this.ddx = 0;

                    this.ddy = 0;

                    this.PX = 0;

                    this.PY = 0;

                    this.x = 0;

                    this.y = 0;

                    this.x0 = 0;

                    this.y0 = 0;

                    this.cx = cx;

                    this.cy = cy;

                    this.parent = p;

                }

                CObj.prototype.run = function () {
                    if (!this.parent) {
                        this.x0 = m.x;
                        this.y0 = m.y;
                    } else {
                        this.x0 = this.parent.x;
                        this.y0 = this.parent.y;
                    }
                    this.x = this.PX += (this.ddx += ((this.x0 - this.PX - this.ddx) + this.cx) / rs) / sp;
                    this.y = this.PY += (this.ddy += ((this.y0 - this.PY - this.ddy) + this.cy) / rs) / sp;
                    this.css.left = Math.round(this.x) + 'px';
                    this.css.top = Math.round(this.y) + 'px';
                }
                return init;

            }();

            new Follow('shuicheDiv', {
                speed: 4, animR: 2, fn: function (i, j) {
                    return {
                        x: j / 4 * Math.cos(i),
                        y: j / 4 * Math.sin(i)
                    }
                }
            })
        }
    }
})(jQuery);
