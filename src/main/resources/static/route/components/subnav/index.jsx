import React from 'react';
import {Menu, Icon} from 'antd';
const {SubMenu} = Menu;
const reactRouterDom = require('react-router-dom');
const matchPath = require('react-router').matchPath;
const Link = reactRouterDom.Link;

class Subnav extends React.Component {
  constructor(props) {
    super(props);
  }

  getPathList(type) {
    return [{
      key: '/pros',
      link: '/pros',
      icon: 'copy',
      text: '数据库配置',
    },
    {
      key: '/logs',
      link: '/logs',
      icon: 'switcher',
      text: '日志'
    },
    {
      key: '/secret',
      link: '/secret',
      icon: 'lock',
      text: '密钥'
    }
    ];
  }

  getSelectedItem(pathList) {
    let self = this;
    let selectedKey = null;
    let openKeys = [];
    pathList.forEach((path) => {
      if (path.sub) {
        let subKey = self.getSelectedItem(path.children);
        if (subKey) {
          openKeys.push(path.key);
          openKeys.concat(subKey.openKeys);
          selectedKey = subKey.selectedKey;
        }
      } else {
        if (matchPath(window.location.pathname, {
          path: path.key
        })) {
          selectedKey = path.key;
        }
      }
    });
    if (selectedKey) {
      return {
        selectedKey: selectedKey,
        openKeys: openKeys
      };
    } else {
      return null;
    }
  }

  getMenu(pathList) {
    let self = this;
    return pathList.map((path) => {
      if (path.sub) {
        return (
          <SubMenu key={path.key} title={<span><Icon type={path.icon} /><span>{path.text}</span></span>}>
            {self.getMenu(path.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={path.key}>
            <Link to={{pathname: path.link, langKey: self.props.langKey}}>
              <Icon type={path.icon} />
              <span>{path.text}</span>
            </Link>
          </Menu.Item>);
      }
    });
  }

  render() {
    const pathList = this.getPathList(this.props.langKey);
    const selectedMenuItem = this.getSelectedItem(pathList);
    return (
      <Menu
        defaultSelectedKeys={[selectedMenuItem.selectedKey]}
        defaultOpenKeys={selectedMenuItem.openKeys}
        mode="inline"
        style={{height: '100%', borderRight: 0}}
      >
        {this.getMenu(pathList)}
      </Menu>
    );
  }
}

export default Subnav;
