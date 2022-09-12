import {
    HomeOutlined,
    InfoCircleOutlined ,
    BookOutlined 

} from '@ant-design/icons';

export const menuItems = [
    {
        key: '0',
        icon: <HomeOutlined />,
        label: "Home",
        path: 'home'
    },
    {
        key: '1',
        icon: <BookOutlined />,
        label: "Stores",
        path: 'store'
    },
    {
        key: '2',
        icon: <InfoCircleOutlined  />,
        label: "About",
        path: 'about'
    }
]   