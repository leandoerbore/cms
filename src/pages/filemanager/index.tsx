import { Button, Divider, Radio, RadioChangeEvent, Space } from "antd"
import { useEffect, useState } from "react"
import { UFile } from "../../Components/filemanager/uploadFile"
import { ChangeFile } from "../../Components/filemanager/changeFile"
import { filemanager } from "@/global"
import Image from 'next/image';

const Filemanger = () => {
    const [page, setPage] = useState('upload')

    const handlePage = (e: RadioChangeEvent) => {
        setPage(e.target.value)
        console.log(page)
    }

    return (
        <div className="filemanager__wrapper">
            <span style={{ paddingRight: '12px' }} className="filemanager-title">Filemanager</span>

            <Radio.Group value={page} onChange={handlePage}>
                <Radio.Button value="upload">Upload</Radio.Button>
                <Radio.Button value="change">Change</Radio.Button>
            </Radio.Group>
            {page === "upload" ? <UFile /> : <ChangeFile />}
        </div>
    )
}

export default Filemanger