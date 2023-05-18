import { FinishedRedirectValues } from "@/types/redirectType"
import { Button, Form, FormInstance, Input, InputNumber, Space, Switch, message } from "antd"
import { valueType } from "antd/es/statistic/utils";
import { stat } from "fs";
import Link from "next/link";
import { useEffect, useState } from "react";

const { Item } = Form

const RedirectForm = ({
    onFinish,
    form,
    state = false,
}: {
    onFinish: (values: FinishedRedirectValues) => Promise<void>,
    form: FormInstance<any>,
    state?: boolean,
}): JSX.Element => {
    const [active, setIsActive] = useState<boolean>(state)
    useEffect(() => {
        setIsActive(state)
    }, [state])
    const [disable, setDisable] = useState<boolean>(false)

    const checkCode = (value: valueType | null) => {
        if (typeof (value) === "number") {
            if (value < 300 || value > 308) {
                message.error('Введите код от 300 до 308')
                setDisable(true)
            } else {
                setDisable(false)
            }
        }
    }

    return (
        <Form onFinish={onFinish} form={form}>
            <div className="form">
                <p className="form-input-title">Откуда</p>
                <Item name="source">
                    <Input placeholder="/home" />
                </Item>

                <p className="form-input-title">Куда</p>
                <Item name="destination">
                    <Input placeholder="/newHome" />
                </Item>

                <p className="form-input-title">Статус код</p>
                <Item name="status_code">
                    <InputNumber placeholder="302" onChange={value => checkCode(value)} />
                </Item>

                <p className="form-input-title">Состояние</p>
                <Item
                    name="is_active"
                >
                    <Switch onClick={() => setIsActive(!active)} checked={active} />
                </Item>

                <Space direction="horizontal">
                    <Button disabled={disable} onClick={() => form.submit()}>
                        <Link href="/redirects">Сохранить</Link>
                    </Button>
                    <Button>
                        <Link href="/redirects">Отмена</Link>
                    </Button>
                </Space>
            </div>
        </Form>
    )
}

export default RedirectForm