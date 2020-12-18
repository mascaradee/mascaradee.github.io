---
layout: post
date: 2018-01-08 17:34:00 +0900
title: '[javascript] textarea-글자수-체크'
categories:
  - javascript
tags:
  - charCodeAt
  - textarea
---

```javascript
var byteChecker = {
    getBytes: function(s) {
        var b, i, c;
        for (b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
        return b;
    },
    /**
     * originaltext의 바이트를 계산해서 limit를 초과할 경우 잘라서 반환
     *
     * @param originaltext 길이 제한할 문자열
     * @param limit 최대 바이트
     * @return limit만큼 잘린 originaltext
     */
    getLimitedText: function(originaltext, limit) {
        while (true) {
            if (byteChecker.getBytes(originaltext) <= limit) {
                return originaltext;
            }
            originaltext = originaltext.substring(0, originaltext.length - 1);
        }
    }
};
```

```html
<textarea onchange="$(this).val(byteChecker.getLimitedText($(this).val(), 60));">
```

```javascript
$(document).ready(function () {
	$('textarea[name=deliveryRequestMessage]').on('paste', function() {   
		var element = this;
		setTimeout(function () { // 텍스트가 붙여지기 전에 onpaste가 실행되므로 시차를 두고 붙여넣은 텍스트를 얻어 글자 수 제한을 걸도록함.
			var text = $(element).val();
			$(this).val(byteChecker.getLimitedText(text, 102));
		 }, 100);			
	});
}
```
