import { Card } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { getStore } from "./_api";
import { Button, Popover, Whisper } from "rsuite";
import ProPopover from "components/ProPopover";
const Stores = (props) => {
    const [store, setStore] = useState([])
    const [textSelected, setTextSelected] = useState('')
    const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });
    const fetchStore = async (page) => {
        const res = await getStore('The Little Prince')
        if (res.status == 200) {
            setStore(res.data.docs)
        }
        console.log(res.data.docs)
    }

    const handleMouseUp = (event) => {
        console.log(`Selected text: ${window.getSelection().toString()}`);
        setTextSelected(window.getSelection().toString().trim())
    }
    useEffect(() => {
        fetchStore(1)
    }, [])
    return (<>

        <ProPopover str={textSelected} />

        <Card onMouseUp={handleMouseUp}>

            {
                store.map(s => {
                    return <div ><div dangerouslySetInnerHTML={{ __html: s.content }}></div> <br /></div>
                })
            }
        </Card>
    </>)
}
export default Stores;