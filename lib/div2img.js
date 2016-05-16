/*
  div2img 0.0.1 <https://www.github.com/shineum>
  Copyright (c) 2016 Sungwon Um
*/
function div2img(divContent, w, h, callBack) {

    if (!callBack) return null;

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
    tDivInner.style.width = w + "px";
    tDivInner.style.height = h + "px";
    tDivInner.innerHTML = divContent;

    var tCanvas = document.createElement('canvas');
    var tContext = tCanvas.getContext("2d");
    tCanvas.width = w;
    tCanvas.height = h;
    var tCanvasOffX = 0, tCanvasOffY = 0;

    var snapPart = function() {
        html2canvas(tDivOuter, {
            onrendered: function(pCanvas) {
                tContext.drawImage(pCanvas, 0, 0, divW, divH, tCanvasOffX, tCanvasOffY, divW, divH);
                if (tCanvasOffX + divW < w) {
                    tCanvasOffX += divW;
                    tDivInner.style.left = -tCanvasOffX + "px";
                    snapPart();
                } else if (tCanvasOffY + divH < h) {
                    tCanvasOffX = 0;
                    tCanvasOffY += divH;
                    tDivInner.style.left = "0px";
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
