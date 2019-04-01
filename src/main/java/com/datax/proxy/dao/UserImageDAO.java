package com.datax.proxy.dao;

import com.datax.proxy.pojo.User;
import com.datax.proxy.pojo.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserImageDAO extends JpaRepository<UserImage, Integer>{

    public List<UserImage> findByUserOrderByIdDesc(User user);

}
