---
layout: post
date: 2013-04-23 23:48:00 +0900
title: '[java] file upload '
categories:
  - java
tags:
  - file upload
---

## File upload annotation

### sp3에서 작업

### form

- `method`  
- `enctype="multipart/form-data”` : 없이 내용 안 넘어감  
- `action`: 주로 `javascript`로 뺌-> `created.action, answer.action, update.action` 등의 주소가 동적임  
- 메모리 -> 하드: `FileOutputStream`  
- 하드 -> 메모리: `FileInputStream`   

### 파일 이름 정하기

년-월-일 시:분:초.밀리세컨드.나노세컨드(10 ^-9)  


#### [sp3/WebContent/WEB-INF/views/dispatcher-servlet.xml]

```xml
<bean id="multipartResolver"  class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
  <property name="maxUploadSize" value="10485760" />
</bean>
```

#### [com.sp.common.FileManager .java]

```java
@Service("fileManager")
public class FileManager {
	// path : 파일을 저장할 경로
	// 리턴 : 서버에 저장된 새로운 파일명
	//파일은 무조건 byteStream으로 저장/ 문자스트림으로 저장 시 그림은 다 깨짐
	//String originalFilename : 클라이언트가 올린 파일
	//CLOB(텍스트), BLOB(그림) : 데이터 저장 공간이 다른 곳-> 서버에는 파일명만 저장되어 있음

  public String doFileUpload(byte[] bytes, String originalFilename, String path) throws Exception {
    String newFilename = null;

    if(bytes == null)
    	return null;

    // 클라이언트가 업로드한 파일의 이름
    if(originalFilename.equals(""))
    	return null;

    // 확장자
    String fileExt = originalFilename.substring(originalFilename.lastIndexOf("."));
    if(fileExt == null || fileExt.equals(""))
    	return null;

    // 서버에 저장할 새로운 파일명을 만든다.
    //tY 년, tm 월, td 일, tH 시,tM 분, tS 초
    newFilename = String.format("%1$tY%1$tm%1$td%1$tH%1$tM%1$tS",
    		         Calendar.getInstance());
    newFilename += System.nanoTime(); //나노세컨드
    newFilename += fileExt;

    // 업로드할 경로가 존재하지 않는 경우 폴더를 생성 한다.
    File dir = new File(path);
    if(!dir.exists())
    	dir.mkdirs();

    String pathname = path + File.separator + newFilename;

    FileOutputStream fos = new FileOutputStream(pathname);
    fos.write(bytes);
    fos.close();

     return newFilename;
  }

	public String doFileUpload(InputStream is, String originalFilename, String path) throws Exception {

		String newFilename = null;

		// 클라이언트가 업로드한 파일의 이름
		if(originalFilename==null||originalFilename.equals(""))
			return null;

		// 확장자
		String fileExt = originalFilename.substring(originalFilename.lastIndexOf("."));
		if(fileExt == null || fileExt.equals(""))
			return null;

		// 서버에 저장할 새로운 파일명을 만든다.
		newFilename = String.format("%1$tY%1$tm%1$td%1$tH%1$tM%1$tS",
				         Calendar.getInstance());
		newFilename += System.nanoTime();
		newFilename += fileExt;

		// 업로드할 경로가 존재하지 않는 경우 폴더를 생성 한다.
		File dir = new File(path);
		if(!dir.exists())
			dir.mkdirs();

		String pathname = path + File.separator + newFilename;

		//InputStream 사용시 byte[] 다시 사용해야함
		byte[] b=new byte[1024];
		int size=0;
		FileOutputStream fos = new FileOutputStream(pathname);

		while((size=is.read(b))!=-1) {
			fos.write(b, 0, size);
		}

		fos.close();
		is.close();

		return newFilename;
	}

	// 파일 다운로드
	// saveFilename : 서버에 저장된 파일명
	// originalFilename : 클라이언트가 업로드한 파일명
	// path : 서버에 저장된 경로
  public boolean doFileDownload(String saveFilename, String originalFilename, String path, HttpServletResponse response) {

    String pathname = path + File.separator + saveFilename;
    try {
      if(originalFilename == null || originalFilename.equals(""))
        originalFilename = saveFilename;
        originalFilename = new String(originalFilename.getBytes("euc-kr"),"8859_1");
    } catch (UnsupportedEncodingException e) {
    }

    try {
      File file = new File(pathname);

      if (file.exists()){
        byte readByte[] = new byte[4096];
        response.setContentType("application/octet-stream");
        response.setHeader("Content-disposition", "attachment;filename=" + originalFilename);

        BufferedInputStream  fin  = new BufferedInputStream(new FileInputStream(file));
        //javax.servlet.ServletOutputStream outs =	response.getOutputStream();
        OutputStream outs = response.getOutputStream();

        int read;

        while ((read = fin.read(readByte, 0, 4096)) != -1)
        outs.write(readByte, 0, read);
        outs.flush();
        outs.close();
        fin.close();

        return true;
      }
    } catch(Exception e) {
    }
    return false;
  }

	// 실제 파일 삭제
  public void doFileDelete(String filename, String path) throws Exception {

		String pathname = path + File.separator + filename;
		File file = new File(pathname);
        if (file.exists())
           file.delete();
	}

	// 파일 길이
	public long getFilesize(String pathname) {
		long size=-1;
		File file = new File(pathname);
		if (! file.exists())
			return size;
		size=file.length();//long형
		return size;
	}

	// 파일 타입: 이미지, binary ... / jpg, png...
	public String getFiletype(String pathname) {
		String type="";
		try {
      URL u = new URL("file:"+pathname);
      URLConnection uc = u.openConnection();
      type = uc.getContentType();
		} catch (Exception e) {
		}
	    return type;
	}
}
```

#### [sp3/WebContent/WEB-INF/views/test/test.jsp]

```html
<body>
<form action="<%=cp%>/test/test.action" method="post" enctype="multipart/form-data">
제목: <input type="text" name="subject"/><br/>
이름: <input type="text" name="name"><br/>
파일: <input type="file" name="upload"><br/>
<input type="submit" value="보내기">
</form>
</body>
```

#### [sp3/WebContent/WEB-INF/views/test/result.jsp]

```html
<body>
이름: ${dto.name}<br/>
제목: ${dto.subject}<br/>
업로드한 파일명: ${dto.originalFilename}<br/>
서버에 저장된 파일명: ${dto.saveFilename}<br/>
파일의 길이: ${dto.filesize}<br/>
<a href="<%=cp%>/test/download.action?saveFilename=${dto.saveFilename}&of=${of}">다운로드</a>
</body>
```

#### [sp3.com.sp.test.TestController.java]

```java
@Controller("test.testController")
public class TestController {
	@Resource(name="fileManager")
	private FileManager fileManager;

	@RequestMapping(value="/test/test.action", method=RequestMethod.GET)
	public String testForm() throws Exception {
		return "test/test";
	}

	@RequestMapping(value="/test/test.action", method=RequestMethod.POST)
	public String testSubmit(
			HttpServletRequest req, HttpSession session,
			Test dto
			) throws Exception {

		//root의 실제 경로
		String root = session.getServletContext().getRealPath("/");
		String pathname = root + File.separator + "saveFile";

		//서버에 파일 저장
		String filename = fileManager.doFileUpload(dto.getUpload().getBytes(), dto.getUpload().getOriginalFilename(), pathname);
    //getBytes(): 클라이언트가 올린 파일을 바이트로 저장해 놓은 것을 불러옴

		dto.setOriginalFilename(dto.getUpload().getOriginalFilename());
		dto.setSaveFilename(filename);
		dto.setFilesize(dto.getUpload().getSize());
		req.setAttribute("dto", dto);
		req.setAttribute("of", URLEncoder.encode(dto.getOriginalFilename(), "utf-8"));
		return "test/result";
	}

  //다운로드시 화면 바뀌지 않음, 리턴값 없음=> void
  @RequestMapping(value="/test/download.action", method=RequestMethod.GET)
	public void download( HttpServletResponse resp, HttpSession session, String saveFilename, String of	) throws Exception {
		String originalFilename=URLDecoder.decode(of, "utf-8");
		String root = session.getServletContext().getRealPath("/");
		String path = root + File.separator + "saveFile";
		boolean flag = fileManager.doFileDownload(saveFilename, originalFilename, path, resp);

		if(! flag){
			PrintWriter pw = resp.getWriter();
			resp.setContentType("text/html; charset = utf-8");
			pw.print("<script> alert('다운로드 에러');history.back();</script>");
		}
	}
}
```

#### [sp3.com.sp.test.Test.java]

```java
public class Test {
	private String subject, name;
	private MultipartFile upload; //<input type="file" name="upload"... name은 .jsp에서 지정했던 이름과 반드시동일해야
	private String saveFilename, originalFilename;
	private long filesize;

  //getter/ setter //(중략)
```

#### 결과  
- http://localhost:9090/sp3/test/test.action

![file-upload1.jpg](/images/file-upload1.jpg)  

[보내기 결과]  

![file-upload2.jpg](/images/file-upload2.jpg)  
