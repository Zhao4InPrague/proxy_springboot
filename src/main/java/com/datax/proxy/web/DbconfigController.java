package com.datax.proxy.web;

import com.datax.proxy.pojo.Dbconfig;
import com.datax.proxy.service.DbconfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DbconfigController {

    @Autowired
    DbconfigService dbconfigService;

    @GetMapping("/dbconfig")
    public List<Dbconfig> list() throws Exception {
        return dbconfigService.list();
    }

}
