/*
  div2img 0.0.1e <https://www.github.com/shineum>
  Copyright (c) 2016 Sungwon Um
*/
function div2img(div, callBack, w, h, offX, offY) {

    if (!div) return null;
    if (!callBack) return null;
    if (!offX) offX = 0;
    if (!offY) offY = 0;

    var ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var divW = Math.min(w, ww), divH = Math.min(h, wh);

    var bPos = div.style.position;
    var bTop = div.style.top;
    var bLeft = div.style.left;
    var bWidth = div.style.width;
    var bHeight = div.style.height;
    var bBg = div.style.background;
    var bZidx = div.style.zindex;

    div.style.position = "fixed";
    div.style.top = -offY + "px";
    div.style.left = -offX + "px";
    div.style.width = w + "px";
    div.style.height = h + "px";
    div.style.background = "#ffffff";
    div.style.zindex = 999999;

    var tCanvas = document.createElement('canvas');
    var tContext = tCanvas.getContext("2d");
    tCanvas.width = w - offX;
    tCanvas.height = h - offY;
    var tCanvasOffX = offX, tCanvasOffY = offY;

    var snapPart = function() {
        html2canvas(div, {
            onrendered: function(pCanvas) {
                tContext.drawImage(pCanvas, 0, 0, divW, divH, tCanvasOffX - offX, tCanvasOffY - offY, divW, divH);
                if (tCanvasOffX + divW < w) {
                    tCanvasOffX += divW;
                    div.style.left = -tCanvasOffX + "px";
                    snapPart();
                } else if (tCanvasOffY + divH < h) {
                    tCanvasOffX = offX;
                    tCanvasOffY += divH;
                    div.style.left = -tCanvasOffX + "px";
                    div.style.top = -tCanvasOffY + "px";
                    snapPart();
                } else {
                    div.style.position = bPos;
                    div.style.top = bTop;
                    div.style.left = bLeft;
                    div.style.width = bWidth;
                    div.style.height = bHeight;
                    div.style.background = bBg;
                    div.style.zindex = bZidx;

                    callBack(tCanvas.toDataURL("image/jpeg"));
                }
            }
        });
    }

    snapPart();

}
