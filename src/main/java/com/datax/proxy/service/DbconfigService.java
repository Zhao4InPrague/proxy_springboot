package com.datax.proxy.service;

import com.datax.proxy.dao.DbconfigDAO;
import com.datax.proxy.pojo.Dbconfig;
import com.datax.proxy.utils.Page4Navigator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    public Page4Navigator<Dbconfig> list(int start, int size, int navigatePages) {
        Sort sort = new Sort(Sort.Direction.DESC, "id");
        Pageable pageable = new PageRequest(start, size, sort);
        Page pageFormJPA = dbconfigDAO.findAll(pageable);

        return new Page4Navigator<>(pageFormJPA, navigatePages);
    }

    public void add(Dbconfig bean) {
        dbconfigDAO.save(bean);
    }

    public void delete(int id) {
        dbconfigDAO.delete(id);
    }

    public void update(Dbconfig bean) {
        dbconfigDAO.save(bean);
    }

}
