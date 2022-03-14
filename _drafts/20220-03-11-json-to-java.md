---
layout: post
date: 2022-03-11 08:06:00 +0900
title: '[java] json to java'
categories:
  - java
tags:
  - vo
  - json
  - ajax
---

* Kramdown table of contents
{:toc .toc}


## java List to jason

자바에서 값을 화면으로 넘길때는 `ModelAndView` 객체에 담아 넘기면 된다.
특히, 리스트를 넘기고자하면 `json` 형식으로 `String` 타입으로 변경해서 넘겨야 하는데,
`jackson`의 `ObjectMapper`를 이용하면 쉽게 `String`타입으로 변경할 수 있다.
참고로 `jackson`은 자바 객체를 쉽게 `json`으로 변경해 주는 라이브러리라고 생각하면 된다.

```java
import org.codehaus.jackson.map.ObjectMapper;

@Controller
@RequestMapping("/com/common")
public class IndexController {
  ObjectMapper mapper = new ObjectMapper();

  @RequestMapping("/index.do")
  public Object index(ModelAndView mv) throws Exception {

    List<Map<String, String>> resultList = new ArrayList<Map<String, String>>();
    Map<String, String> result = new HashMap<>();
    result.put("1","apple");
    result.put("2","banana");
    result.put("3","citron");
    resultList.add(result);

    mv.addObject("list", mapper.writeValueAsString(resultList)); // "[{"1":"apple","2":"banan","3":"citron"}]"
    mv.setViewName("/index");

    return mv;
  }
}
```

```html
<script>
  var list = ${list};
</script>
```

## jason to java List

### form 태그 데이터 + button 태그 이벤트

`form` 태그의 모든 데이터를 보내지 않고 일부 원하는 데이터만 보내려고 하면 `submit` 대신 별도 함수로 처리해 준다.

```html
<form name="faceForm" id="faceForm" method="post">
<div class="buttons">
  <button type="button" style="background-color:#0c83da;border-color:transparent;color:#fff;border-radius:40px;border-width:1px;height:36px;min-width:50px" onclick="save()">저장</button>
</div>
<label>얼굴에 포함된 것은?</label><br/>
<label>eyes</label>
<input type="checkbox" name="chk" value="eyes" data-id="face01"/><br/>
<label>nose</label>
<input type="checkbox" name="chk" value="nose" data-id="face02"/><br/>
<label>mouth</label>
<input type="checkbox" name="chk" value="mouth" data-id="face03"/><br/>
<label>hand</label>
<input type="checkbox" name="chk" value="hand" data-id="face04"/><br/>
</form>
```

```js
function save(){
  var sendArray = [];
  $('#faceForm').find('input[name="chk"]').each(function(idx, ele){
    var param = new Object();
    var id = $(ele).attr('data-id'),
        name = $(ele).attr('value'),
        checked = $(ele).prop('checked');
        param['id'] = id;
        param['name'] = name;
        param['faceYn'] = checked;
        sendArray.push(param);
        // [{id:'face01', name:'eyes', faceYn:true},{id:'face02', name:'nose', faceYn:true},{id:'face03', name:'mouth', faceYn:true},{id:'face04', name:'hand', faceYn:false}]
  });

  $.ajax({
    method: 'POST',
    url: '/com/common/index.do',
    contentType: 'application/json', // 요청 데이터의 타입을 나타내므로 일치해야 한다.
    data: JSON.stringify(sendArray), // JSON은 키/값 모두 쌍따옴표 '[{"id":"face01","name":"eyes","faceYn":true},{"id":"face02","name":"nose","faceYn":true},{"id":"face03","name":"mouth","faceYn":true},{"id":"face04","name":"hand","faceYn":false}]'
    dataType: 'json',
    success: function(rs) {
      if( typeof rs == 'boolean' && rs) {
          alert("정상적으로 저장되었습니다.");
      } else {
          alert(rs);
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        // [http 응답코드][상태값]: 에러메시지
        alert( "[httpStatus: " + jqXHR.status + "] "+ "[" + textStatus + "]: " + errorThrown);
    }
  });
}

```

데이터가 화면으로부터 키:값의 형태로 전달이 되면 `@RequestParam`으로 받아야 하고 그렇지 않을 경우, `@RequestBody`로 받으면 된다.
리스트를 `json`타입으로 전환하여 서버로 전달하면 스프링 내부에서 자동으로 문자열을 파싱하여 자바의 데이터타입으로 맞춰준다. (HttpMessageConverters 역할인듯)
따라서 아래 예시는 `List<Map<String, Object>>` 형태로 받았지만 `List<MyVO>`와 같이 별도 `VO`를 정의하여 지정해 주어도 된다.
하지만 화면에서 리스트로 요청했는데 컨트롤러에서 `String`과 같은 타입으로 받으면 당연히 안된다.
서로 호환이 되는 타입으로 일치 시켜야 한다. 

```java

@RequestMapping(value = "/save.do", method = RequestMethod.POST)
@ResponseBody
public Object saveWidgetAuthMapping(@RequestBody List<Map<String, Object>> faceList) throws Exception {

  LOGGER.debug(faceList.toString());
  // [{id=face01, name=eyes, faceYn=true},{id=face02, name=nose, faceYn=true},{id=face03, name=mouth, faceYn=true},{id=face04, name=hand, faceYn=false}]
  return true;
}
```
