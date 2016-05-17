sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("sap.ui.demo.wt.controller.App", {

        onInit: function() {

        }

        , addImage: function() {
            div2img(document.body.innerHTML, 1200, 2400, function(pImgData) {
                var tNewDiv = document.createElement('div');
                document.body.appendChild(tNewDiv);
                tNewDiv.innerHTML = "<img src='" + pImgData + "'>";
            }, 0, 0);
        }

    });

});
