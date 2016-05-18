# div2img
- In certain framework (like openui5), the area that is not shown in the page rendered as black area. To avoid this issue, div2img will take a snapshot in small divided area and merge it.

# library references
- html2canvas (https://html2canvas.hertzen.com/ or https://github.com/niklasvh/html2canvas)

# image references
https://pixabay.com/static/uploads/photo/2016/05/05/02/35/hot-air-1373167_960_720.jpg
https://pixabay.com/static/uploads/photo/2016/05/04/19/39/stones-1372677_960_720.jpg
https://pixabay.com/static/uploads/photo/2014/11/30/19/08/maine-551993_960_720.jpg

# Usage
```javascript
div2img(document.body, function(pImgData) {
    var tNewDiv = document.createElement('div');
    document.body.appendChild(tNewDiv);
    tNewDiv.innerHTML = "<img src='" + pImgData + "'>";
}, 1200, 2400, 0, 0);
```

# Release History
- 0.0.1d
    Changed parameter to accept div element instead of inner content

- 0.0.1c
    Changed the order of parameters

- 0.0.1b
    Add offset parameters so that getting partial images easily

- 0.0.1
    Release initial version
