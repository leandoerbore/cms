import { Button, Input, Modal, Space, Table } from "antd"
import { useCallback, useEffect, useState } from "react"
import { RedirectType, RedirectWithKey } from "../../types/redirectType"
import { useUpdateItem } from "@/hooks/useUpdateItem"
import Link from "next/link"
import { useDeleteItem } from "@/hooks/useRemoveItem"
import { searchRedirectDestination, searchRedirectSource } from "@/utils/search"
import Search from "antd/es/transfer/search"

const Redirects = () => {
    const [redirects, setRedirects] = useState<RedirectWithKey[]>([])
    const [loadTable, setLoadTable] = useState<boolean>(true)
    const [searchSource, setSearchSource] = useState<string>('')
    const [searchDestination, setSearchDestination] = useState<string>('')

    const columns = [
        {
            title: '№',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'From',
            dataIndex: 'source',
            key: 'source'
        },
        {
            title: 'Destination',
            dataIndex: 'destination',
            key: 'destination'
        },
        {
            title: 'Status code',
            dataIndex: 'status_code',
            key: 'status_code'
        },
        {
            title: 'Active',
            key: 'is_active',
            render: ({ is_active, id }: RedirectWithKey) => (
                <>
                    <Space wrap>
                        <Button
                            style={{ color: 'black', width: '100px' }} type="primary"
                            onClick={() => {
                                updEnabled(id)
                            }}
                        >
                            {!is_active ?
                                (<p className="redirects-active-button">Скрыть</p>)
                                :
                                (<p className="redirects-active-button">Показывать</p>)
                            }
                        </Button>
                        <Button type="text">
                            <Link href={`/redirects/updRedirect/${id}`}>Изменить</Link>
                        </Button>
                        <Button type="text" onClick={() => handleClickDel(id)}>
                            <p>Удалить</p>
                        </Button>
                    </Space>
                </>
            )
        },
    ]

    const fetchData = useCallback(async () => {
        const res = await fetch('http://localhost:8080/redirects')
        const data = await res.json()
        const tableData: RedirectWithKey[] = data.map((redirect: RedirectType, index: number) => {
            return { key: redirect.id, index: index + 1, ...redirect }
        })
        setRedirects(tableData)
    }, [])

    useEffect(() => {
        fetchData()
    }, [])

    const { updEnabled, showMoadlEnable, setShowModelEnable } = useUpdateItem(
        { fetchData, setLoadTable, endpoint: 'http://localhost:8080/redirects' }
    )

    const { handleCancel, handleClickDel, handleDelete, showMoadlDelete } = useDeleteItem(
        { fetchData, setLoadTable, endpoint: 'http://localhost:8080/redirects' }
    )

    const sourceSearch = searchRedirectSource(redirects, searchSource)
    const destSearch = searchRedirectDestination(sourceSearch, searchDestination)

    return (
        <div className="redirects__wrapper">
            <Space >
                <Space>
                    <span className="redirects-title">Redirects</span>
                    <Button type="primary" onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        <Link href="/redirects/newRedirect">Создать</Link>
                    </Button>
                </Space>
                <Space>
                    <Input name={'source'} placeholder="source" value={searchSource} onChange={(event) => setSearchSource(event.target.value)} />
                    <Input name={'destination'} placeholder="destination" value={searchDestination} onChange={(event) => setSearchDestination(event.target.value)} />
                </Space>
            </Space>
            <Table dataSource={destSearch} columns={columns} />
            <Modal open={showMoadlDelete} onOk={handleDelete} onCancel={handleCancel}>
                Вы уверены, что хотите удалить редирект?
            </Modal>
        </div>
    )
}

export default Redirects