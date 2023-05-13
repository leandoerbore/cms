import { FinishedRedirectValues, RedirectType } from "@/types/redirectType"
import { Form } from "antd"
import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import RedirectForm from "../form"

const UpdRedirect = () => {
    const [redirect, setRedirect] = useState<RedirectType>()
    const [redirectId, setRedirectId] = useState<string | undefined>()

    const [form] = Form.useForm()

    useEffect(() => {
        redirect &&
            form.setFields([
                { name: 'source' },
                { name: 'destination' },
                { name: 'status_code' },
                { name: 'is_active' },
            ])
    }, [form, redirect])

    const onFinish = async (values: FinishedRedirectValues) => {
        const finRedirect = fetch(`http://localhost:8080/redirects`, {
            method: "POST",
            body: JSON.stringify({ ...values, status_code: parseInt(values.status_code) }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    return (
        <>
            <div>
                <RedirectForm onFinish={onFinish} form={form}></RedirectForm>
            </div>
        </>
    )
}


export default UpdRedirect