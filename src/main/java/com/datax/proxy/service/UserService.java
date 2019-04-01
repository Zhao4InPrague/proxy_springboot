package com.datax.proxy.service;

import com.datax.proxy.dao.UserDAO;
import com.datax.proxy.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserDAO userDAO;

    public List<User> list() {
        Sort sort = new Sort(Sort.Direction.DESC, "id");
        return userDAO.findAll(sort);
    }

    public void add(User bean) {
        userDAO.save(bean);
    }

    public User getOne(int id){
        return userDAO.findOne(id);
    }

    public User findByName(String name) {
        return userDAO.findByName(name);
    }

    public boolean isExist(String name) {
        User user = findByName(name);
        return null != user;
    }

    public User get(String name, String password) {
        return userDAO.getByNameAndPassword(name, password);
    }

    public User getByName(String name) {
        return userDAO.findByName(name);
    }



}
