package com.haesol.srmbackend.common.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class ReactAppController {

    /***
     * React 빌드시에 index.html 로 가게 만드는  page 컨트롤러가 반드시 필요하다.
     * 해당 url 에 매칭이 되면 index.html 로 리턴하게 만든다.
     * 이게 없을 경우 도메인 배포시에 React Route 에 있는 url 에 매핑이 되지 않는다.
     * 왜냐하면 서버에서 해당 url 주소를 모르기 때문에 index.html 을 리턴해주지 못하기 때문이다.
     * 서버 사이드에서 url 관리가 필요 없을 경우에는 HashRouter 를 사용하면 되는데 권장되는 방식은 아니다.
     * */
//    @RequestMapping(value = { "/", "/{x:[\\w\\-]+}", "/{x:^(?!api$).*$}/*/{y:[\\w\\-]+}","/error"  })
//    public String getIndex(HttpServletRequest request) {
//        return "/index.html";
//    }
}
