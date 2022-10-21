---
layout: post
date: 2022-10-21 09:05:00 +0900
title: '[java] google cloud 번역 API 호출'
categories:
  - javascript
tags:
  - translation
  - google-cloud
---

* Kramdown table of contents
{:toc .toc}

## 참고

[구글 클라우드 번역 API](https://cloud.google.com/translate)
[설정](https://cloud.google.com/translate/docs/setup#windows)
[소스코드 샘플](https://cloud.google.com/translate/docs/samples/translate-text-with-model#translate_text_with_model-java)


# 구글 클라우드 번역 API

## 설정

- 구글 클라우드 프로젝트 생성 및 서비스 계정을 만든다.
- 프로젝트ID와 서비스계정 키(json 파일)이 필요하다.
- 로컬 환경변수에 GOOGLE_APPLICATION_CREDENTIALS 시스템변수를 추가하고 서비스계정 키가 들어 있는 json파일의 경로를 값을 지정한다. 
  ![로컬 환경변수 설정](/images/goodle-translation-servie-key-regist.png)

- 인텔리제이 `pom.xml` 파일에 구글 클라우드 번역 클라이언트 라이브러리 추가 후 다운로드 

  ```XML
    <dependency>
       <groupId>com.google.cloud</groupId>
       <artifactId>google-cloud-translate</artifactId>
    </dependency>

    <dependencyManagement>
      <dependencies>
        <!--구글 번역 API start -->
        <dependency>
           <groupId>com.google.cloud</groupId>
           <artifactId>libraries-bom</artifactId>
           <version>26.1.3</version>
           <type>pom</type>
           <scope>import</scope>
        </dependency>
        <!--구글 번역 API end -->
      </dependencies>
    </dependencyManagement>
  ```
  ![메이븐 다운로드](/images/maven-download.png)  

  ![메이븐 다운로드 결과](/images/maven-download-result.png)


## 샘플 소스

호출

```
http://localhost:8080/display/translation/read-translation?lang=KO&sourceText=안녕하세요. 좋은아침입니다.
```

결과
```
"targetText": "hello. good morning."
```


controller.java

```java
@RestController
@RequestMapping("/display/translation")
public class TranslationController {

  @Autowired
  private TranslationSelector selector;

  @GetMapping("/read-translation")
  public Object readTranslation(String lang, String sourceText) throws IOException {
    return selector.readTranslation(lang, sourceText);
  }
}
```

service.java

```java
  public Object readTranslation(String lang, String sourceText) throws IOException {

    TranslateText translateText = new TranslateText();

    String targetText = translateText.translateText(lang, sourceText); // 구글 번역 API 호출
    Map<String, String> translation = new TranslationResult();
    translation.put("source", sourceText);
    translation.put("target", targetText);

    return translation;
  }

```

구글 클라우드 번역 샘플 소스(변형)

```java
package com.top.api.biz.display.translation;

import com.google.cloud.translate.v3.LocationName;
import com.google.cloud.translate.v3.TranslateTextRequest;
import com.google.cloud.translate.v3.TranslateTextResponse;
import com.google.cloud.translate.v3.Translation;
import com.google.cloud.translate.v3.TranslationServiceClient;
import java.io.IOException;

public class TranslateText {

  public static String translateText(String lang, String sourceText) throws IOException {
    String projectId = "프로젝트ID"; // 설정에서 얻은 프로젝트 아이디
    String targetLanguage = lang; // 변환할 언어
    String text = sourceText; // 변환할 대상 텍스트
    return translateText(projectId, targetLanguage, text);
  }

  public static String translateText(String projectId, String targetLanguage, String text)
      throws IOException {

    try (TranslationServiceClient client = TranslationServiceClient.create()) {

      LocationName parent = LocationName.of(projectId, "global");

      TranslateTextRequest request =
          TranslateTextRequest.newBuilder()
              .setParent(parent.toString())
              .setMimeType("text/plain")
              .setTargetLanguageCode(targetLanguage)
              .addContents(text)
              .build();

      TranslateTextResponse response = client.translateText(request);
//      // Display the translation for each input text provided
//      for (Translation translation : response.getTranslationsList()) {
//        System.out.printf("Translated text: %s\n", translation.getTranslatedText());
//      }

      return response.getTranslationsList().get(0).getTranslatedText(); 
    }
  }
}
```

