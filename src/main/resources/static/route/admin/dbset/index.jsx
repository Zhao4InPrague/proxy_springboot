import React from 'react';
import {Form, Button, message, Icon, Table, Pagination} from 'antd';
import Aform from './aform.jsx';
import Eform from './eform.jsx';
import 'antd/dist/antd.min.css';

class dbsetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          aVisible: false,
          eVisible: false,
          eRecord: {},
          total: 10,
          current: 1,
          size: 5
        };
        this.columns = [{
            title: 'id',
            dataIndex: 'id',
            key: '1',
          }, {
            title: 'host',
            dataIndex: 'host',
            key: '2',
          }, {
            title: 'user',
            dataIndex: 'user',
            key: '3',
          }, {
            title: 'password',
            dataIndex: 'password',
            key: '4',
          },{
            title: 'database',
            dataIndex: 'database',
            key: '5',
          }, {
            title: 'port',
            dataIndex: 'port',
            key: '6',
          }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (<div>
                <Button onClick={() => this.onDelete(record)} type='primary'>删除</Button>
                <Button onClick={() => this.onEdit(record)} style={{marginLeft: '16px'}} type='primary'>编辑</Button>
              </div>)
          }];
          let obj = {
            start: 0,
            size: 5
          }
          this.onLoad(JSON.stringify(obj));
          
    }

    onLoad(obj) {
      let self = this;
      // $.post('./dbconfigPage', obj).done(function (result) {
      //     console.log("result: ", result);
      //     self.setState({
      //       data: result.content,
      //       total: result.totalElements
      //     });
      // }).fail(function (err) {
      //   message.error('error!');
      // });
      $.ajax({
        url: './dbconfigPage',
        type: 'POST',
        data: obj,
        contentType: "application/json;charset=utf-8",
      }).done(function(result){
        console.log(result);
        self.setState({
          data: result.content,
           total: result.totalElements
        });
      }).fail(function(err){
        message.error('error!');
      });
    }

    onImage(record) {
      this.setState({

      });
    }

    onReload(result) {
      this.setState({
        data: result,
        aVisible: false
      });
    }

    eReload(result) {
        this.setState({
            data: result,
            eVisible: false
        })
    }

    onDelete(record) {
        console.log("onDelete");
        console.log("deleteRecord: ", record);
        let self = this;
        // $.post('./deleteDbset', JSON.stringify({id: record.id})).done(function (result) {
        //     // if (result.data.url) {
        //     //   window.location.href = result.data.url;
        //     // }
        //     console.log("result: ", result);
        //     self.onReload(result);
        // }).fail(function (err) {
        //     message.error('error!');
        // });
        $.ajax({
          url: './deleteDbset',
          type: 'POST',
          data: JSON.stringify({id: record.id}),
          contentType: "application/json;charset=utf-8",
        }).done(function(result){
          console.log("result: ", result);
            self.onReload(result);
        }).fail(function(err){
          message.error('error!');
        });
    }

    onEdit(record) {
        console.log("onEdit");
        console.log("editRecord: ", record);
        this.setState({
          eVisible: true,
            eRecord: record
        })
    }

    onAdd() {
      console.log('add');
      this.setState({
        aVisible: true
      })
    }

    onClose() {
      this.setState({
        aVisible: false
      })
    }

    eformClose() {
      this.setState({
        eVisible: false
      })
    }
    pageChange(page) {
      console.log("typeof page: ", typeof page);
      console.log(page);
      this.setState({
        current: page
      });
      let obj = {
        start: page-1,
        size: this.state.size
      }
      console.log("start: ", (page-1)*this.state.size);
      this.onLoad(JSON.stringify(obj))
    }

    render() {
        return (
                <div style={{padding: '20px', textAlign: 'left'}}>
                    <Button type='primary' onClick={this.onAdd.bind(this)}>add</Button>
                    <Table 
                      columns={this.columns}
                      dataSource={this.state.data} 
                      bordered style={{marginTop: '20px'}} 
                      pagination={false}
                    />
                    <div style={{paddingTop: '20px', textAlign: 'right'}}>
                      <Pagination current={this.state.current} total={this.state.total} onChange={this.pageChange.bind(this)} pageSize={5}/>
                    </div>
                    <Aform aVisible={this.state.aVisible} onClose={this.onClose.bind(this)} onReload={this.onReload.bind(this)}/>
                   <Eform eVisible={this.state.eVisible} onClose={this.eformClose.bind(this)} onReload={this.eReload.bind(this)} records={this.state.eRecord}/>
                </div>
        );
    }
}

const Dbset = Form.create()(dbsetForm);
export default Dbset
