package com.datax.proxy.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminPageController {

    @GetMapping(value="/admin")
    public String admin() {
        return "redirect:admin_category_list";
    }

    @GetMapping(value="/admin_category_list")
    public String listCategory(){
        return "admin/listCategory";
    }

//    @GetMapping(value="/proxy_login")
//    public String login(){
//        return "build/index";
//    }

    @GetMapping(value="/login")
    public String login(){
        return "build/index";
    }

    @GetMapping(value="/")
    public String index(){
        return "build/index";
    }

    @GetMapping(value="/register")
    public String register(){
        return "build/index";
    }

    @GetMapping(value="/pros")
    public String pros(){
        return "build/index";
    }

//    @GetMapping(value="/logs")
//    public String logs(){
//        return "build/index";
//    }
//
//    @GetMapping(value="/secret")
//    public String secret(){
//        return "build/index";
//    }


}
