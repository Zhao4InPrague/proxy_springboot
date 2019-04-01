package com.datax.proxy.service;

import com.datax.proxy.dao.UserImageDAO;
import com.datax.proxy.pojo.User;
import com.datax.proxy.pojo.UserImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserImageService {

    @Autowired
    UserImageDAO userImageDAO;
    @Autowired
    UserService userService;

    public void add(UserImage bean) {
        userImageDAO.save(bean);
    }

    public void delete(int id) {
        userImageDAO.delete(id);
    }

    public UserImage get(int id) {
        return userImageDAO.findOne(id);
    }

    public List<UserImage> list(User user) {

        return userImageDAO.findByUserOrderByIdDesc(user);

    }

    public void setFirstUserImage(User user) {
        List<UserImage> images = list(user);
        user.setUserImage(images.get(0));
    }

    public void setFirstUserImages(List<User> users) {
        for (User user: users) {
            setFirstUserImage(user);
        }
    }


}
