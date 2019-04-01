package com.datax.proxy.web;

import com.datax.proxy.pojo.Dbconfig;
import com.datax.proxy.pojo.User;
import com.datax.proxy.service.DbconfigService;
import com.datax.proxy.service.UserService;
import com.datax.proxy.utils.ImageUtil;
import com.datax.proxy.utils.Page4Navigator;
import com.datax.proxy.utils.Result;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.HtmlUtils;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class DbconfigController {

    @Autowired
    DbconfigService dbconfigService;
    @Autowired
    UserService userService;

    @PostMapping("/dbconfig")
    public List<Dbconfig> list() throws Exception {
        return dbconfigService.list();
    }

    @PostMapping("/dbconfigPage")
    public Page4Navigator<Dbconfig> list(@RequestBody Map<String, Integer> data) throws Exception {
        int start = data.get("start");
        start = start < 0? 0: start;
        int size = data.get("size");
        Page4Navigator<Dbconfig> page = dbconfigService.list(start, size, 5);
        return page;
    }

    @PostMapping("/addDbset")
    public List<Dbconfig> relist(@RequestBody Dbconfig data) throws Exception {
        dbconfigService.add(data);
        return dbconfigService.list();
    }

    @PostMapping("/deleteDbset")
    public List<Dbconfig> delist(@RequestBody Map<String, Integer> data) throws Exception {
        dbconfigService.delete(data.get("id"));
        return dbconfigService.list();
    }

    @PostMapping("/updateDbset")
    public List<Dbconfig> uplist(@RequestBody Dbconfig data) throws Exception {
        dbconfigService.update(data);
        return dbconfigService.list();
    }

//    @PostMapping("/loginPass")
//    public Object loginpass(@RequestBody User userParam, HttpSession httpSession) throws Exception {
//        String name = userParam.getName();
//        String password = userParam.getPassword();
//        User user = userService.get(name, password);
//        if(null == user) {
//            String message = "no user!";
//            return Result.fail(message);
//        } else {
//            httpSession.setAttribute("user", user);
//            Map<String, Object> map = new HashMap<>();
//            map.put("url", "/pros");
//            return Result.success(map);
//        }
//    }

//    @PostMapping("/getRegister")
//    public Object register(@RequestBody User user) throws Exception {
//        String name = HtmlUtils.htmlEscape(user.getName());
//        String password = user.getPassword();
//        boolean exist = userService.isExist(name);
//        user.setName(name);
//        if(exist) {
//            String message = "用户名已经被使用, 请更换";
//            return Result.fail(message);
//        }
//        user.setPassword(password);
//
//        userService.add(user);
//        Map<String, Object> map = new HashMap<>();
//        map.put("name", name);
//        map.put("password", password);
//        return Result.success(map);
//    }

    @PostMapping("/getRegister")
    public Object register(@RequestBody User user) throws Exception {
        String name = HtmlUtils.htmlEscape(user.getName());
        String password = user.getPassword();
        user.setName(name);
        boolean exist = userService.isExist(name);
        if(exist) {
            String message ="用户名已经被使用,不能使用";
            return Result.fail(message);
        }
        String salt = new SecureRandomNumberGenerator().nextBytes().toString();
        int times = 2;
        String algorithmName = "md5";

        String encodedPassword = new SimpleHash(algorithmName, password, salt, times).toString();

        user.setSalt(salt);
        user.setPassword(encodedPassword);

        userService.add(user);

        return  Result.success();
    }

    @PostMapping("/loginPass")
    public Object loginpass(@RequestBody User userParam, HttpSession httpSession) throws Exception {
        String name = userParam.getName();
        name = HtmlUtils.htmlEscape(name);
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(name, userParam.getPassword());
        try {
            subject.login(token);
            User user = userService.getByName(name);
            httpSession.setAttribute("user", user);
            Map<String, Object> map = new HashMap<>();
            map.put("url", "/pros");
            return Result.success(map);
        } catch (AuthenticationException e) {
            String message ="账号密码错误";
            return Result.fail(message);
        }
    }

    @GetMapping("/forelogout")
    public String logout( ) {
        Subject subject = SecurityUtils.getSubject();
        if(subject.isAuthenticated())
            subject.logout();
        return "redirect:login";
    }

    @PostMapping("/uploadImage")
    public Object uploadImage(@RequestParam MultipartFile image, @RequestParam String uid,  HttpServletRequest request) throws Exception {
        String folder = "img/";
        File imageFloader = new File(request.getServletContext().getRealPath(folder));
        File file = new File(imageFloader, uid + ".jpg");
        if(!file.getParentFile().exists()){
            file.getParentFile().mkdirs();
        }
        try {
            image.transferTo(file);
            BufferedImage img = ImageUtil.change2jpg(file);
            ImageIO.write(img, "jpg", file);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Map<String, String> map = new HashMap<>();
        map.put("uid", uid);
        return Result.success(map);
    }

}
