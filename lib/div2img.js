/*
  div2img 0.0.1d <https://www.github.com/shineum>
  Copyright (c) 2016 Sungwon Um
*/
function div2img(div, callBack, w, h, offX, offY) {

    if (!div) return null;
    if (!callBack) return null;
    if (!offX) offX = 0;
    if (!offY) offY = 0;

    var divContent = div.innerHTML;
    var ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var divW = Math.min(w, ww), divH = Math.min(h, wh);

    var tDivOuter = document.createElement('div');
    var tDivInner = document.createElement('div');

    document.body.appendChild(tDivOuter);
    tDivOuter.appendChild(tDivInner);

    tDivOuter.style.position = "fixed";
    tDivOuter.style.top = "0px";
    tDivOuter.style.left = "0px";
    tDivOuter.style.width = divW + "px";
    tDivOuter.style.height = divH + "px";
    tDivOuter.style.background = "#ffffff";

    tDivInner.style.position = "fixed";
    tDivInner.style.top = -offY + "px";
    tDivInner.style.left = -offX + "px";
    tDivInner.style.width = w + "px";
    tDivInner.style.height = h + "px";
    tDivInner.innerHTML = divContent;

    var tCanvas = document.createElement('canvas');
    var tContext = tCanvas.getContext("2d");
    tCanvas.width = w;
    tCanvas.height = h;
    var tCanvasOffX = offX, tCanvasOffY = offY;

    var snapPart = function() {
        html2canvas(tDivOuter, {
            onrendered: function(pCanvas) {
                tContext.drawImage(pCanvas, 0, 0, divW, divH, tCanvasOffX - offX, tCanvasOffY - offY, divW, divH);
                if (tCanvasOffX + divW < w) {
                    tCanvasOffX += divW;
                    tDivInner.style.left = -tCanvasOffX + "px";
                    snapPart();
                } else if (tCanvasOffY + divH < h) {
                    tCanvasOffX = offX;
                    tCanvasOffY += divH;
                    tDivInner.style.left = -tCanvasOffX + "px";
                    tDivInner.style.top = -tCanvasOffY + "px";
                    snapPart();
                } else {
                    document.body.removeChild(tDivOuter);
                    callBack(tCanvas.toDataURL("image/jpeg"));
                }
            }
        });
    }

    snapPart();

}
