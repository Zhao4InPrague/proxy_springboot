package com.datax.proxy.service;

import com.datax.proxy.dao.DbconfigDAO;
import com.datax.proxy.pojo.Dbconfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DbconfigService {

    @Autowired
    DbconfigDAO dbconfigDAO;

    public List<Dbconfig> list() {
        Sort sort = new Sort(Sort.Direction.DESC, "id");
        return dbconfigDAO.findAll(sort);
    }

}
