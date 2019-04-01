package com.datax.proxy.web;

import com.datax.proxy.pojo.User;
import com.datax.proxy.pojo.UserImage;
import com.datax.proxy.service.UserImageService;
import com.datax.proxy.service.UserService;
import com.datax.proxy.utils.ImageUtil;
import com.datax.proxy.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
public class UserImageController {

    @Autowired
    UserImageService userImageService;
    @Autowired
    UserService userService;

    @PostMapping("/getUserImage")
    public List<UserImage> list(@RequestBody Map<String, Integer> data) throws Exception {
        User user = userService.getOne(data.get("uid"));
        return userImageService.list(user);
    }

    @PostMapping("addUserImage")
    public Object add(@RequestParam("uid") int uid, MultipartFile image, HttpServletRequest request) throws Exception{

        UserImage bean = new UserImage();
        User user = userService.getOne(uid);
        bean.setUser(user);

        userImageService.add(bean);

        String folder = "img/";
        File imageFolder = new File(request.getServletContext().getRealPath(folder));
        File file = new File(imageFolder, bean.getId() + ".jpg");

        if(!file.getParentFile().exists()) {
            file.getParentFile().mkdirs();
        }
        try {
            image.transferTo(file);
            BufferedImage img = ImageUtil.change2jpg(file);
            ImageIO.write(img, "jpg", file);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return Result.success();

    }

    @PostMapping("deleteUserImage")
    public Object delete(@RequestBody Map<String, Integer> data, HttpServletRequest request) throws Exception {
        int uid = data.get("uid");
        UserImage userImage = userImageService.get(uid);
        userImageService.delete(uid);
        String folder = "img/";
        File imageFolder = new File(request.getServletContext().getRealPath(folder));
        File file = new File(imageFolder, userImage.getId()+".jpg");
        file.delete();

        return Result.success();
    }




}
