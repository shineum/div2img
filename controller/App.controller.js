sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("sap.ui.demo.wt.controller.App", {

        onInit: function() {

        }

        , addImage: function() {
            div2img(document.body, function(pImgData) {
                var tNewDiv = document.createElement('div');
                document.body.appendChild(tNewDiv);
                tNewDiv.innerHTML = "<img src='" + pImgData + "'>";
            }, 1200, 2400, 0, 0);
        }

    });

});
