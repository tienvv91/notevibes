import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { menuItems } from '../config';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const ProMenu = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectKeys, setSelectKeys] = useState([])

    useEffect(() => {
        let key = [menuItems[0]?.path];
        const pathSnippets = location.pathname.split('/').filter(i => i);
        if (pathSnippets.length <= 0) {
            navigate(`/${key}`)
        }
        const activeMenu = menuItems.find(m => `${m.path}` === pathSnippets[0])
        if (activeMenu?.children) {
            const childActiveMenu = activeMenu.children.find(m => m.path === pathSnippets[1])
            if (childActiveMenu) {
                key = childActiveMenu.key
            }
        } else if (activeMenu) {
            key = activeMenu.key
        }
        setSelectKeys(key)
    }, [location])


    return (<>
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['0']}
            items={menuItems}

            selectedKeys={selectKeys}
            onClick={(event) => {
                const selected = menuItems.find(i => i.key === event.key)
                if(selected) {
                    navigate(`/${selected.path}`);
                }
                
            }}
        />
    </>)
}

export default ProMenu;