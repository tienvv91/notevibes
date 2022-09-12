import { useEffect } from "react";
import { useState } from "react";
import {
    CloseOutlined,
} from '@ant-design/icons'
import { Button, Space } from 'antd';
const ProPopover = (props) => {
    const { str } = props
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false)
    const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });
    const [sizePopover, setSizePopover] = useState({ width: 0, height: 0 })

    const [word, setWord] = useState('')

    const handleMouseMove = event => {
        setSizePopover({
            width: event.target.offsetWidth,
            height: event.target.offsetHeight
        })
    };

    useEffect(() => {
        const handleWindowMouseMove = event => {
            let pos_x = event.screenX
            let pos_y = event.pageY
            // console.log("pos_x = ", pos_x, "window width = ", window.innerWidth, "width = ", sizePopover.width)
            // console.log("pos_y = ", pos_y, "window width = ", window.innerHeight, "height = ", sizePopover.height)
            if (window.innerWidth - pos_x < sizePopover.width) {
                pos_x = window.innerWidth - sizePopover.width
            } else if (pos_x - sizePopover.width < 0) {
                pos_x = 0
            }
            setGlobalCoords({
                x: pos_x - 50,
                y: pos_y + sizePopover.height + 10,
            });
        };
        window.addEventListener('mousemove', handleWindowMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove);
        };
    }, [])

    useEffect(() => {
        if (str != '') {
            console.log("===> ", str)
            setCoords(globalCoords)

            const words = str.split(' ');
            setWord(words[0])

        }
        setVisible(str != '')
    }, [str])


    return (<>
        {
            visible && <div style={{ position: 'absolute', top: coords.y, left: coords.x }} onMouseMove={handleMouseMove}>
                <div className="ant-popover ant-popover-placement-bottom">
                    <div className="ant-popover-content">
                        <div className="ant-popover-inner" role="tooltip" style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: "5px", right: '5px' }} className='cursor-pointer'>
                                <Button size="small" type="link" icon={<CloseOutlined />} onClick={()=> setVisible(false)} />
                            </div>
                            <div className="ant-popover-title">{word}</div>

                            <div className="ant-popover-inner-content">
                                <Space direction="vertical">
                                    <Space>
                                        
                                    </Space>
                                    <div>title</div>
                                </Space>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }


    </>)
}

export default ProPopover;