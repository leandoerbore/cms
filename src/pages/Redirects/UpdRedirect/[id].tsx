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
        const id = window.location.pathname.split("/").at(-1)
        setRedirectId(id)
        const fetchData = async () => {
            const res = await fetch(`http://localhost:8080/redirects/${id}`)
            const data = await res.json() as RedirectType
            setRedirect(data)
        };
        fetchData();
    }, [])

    useEffect(() => {
        redirect &&
            form.setFields([
                { name: 'source', value: redirect.source },
                { name: 'destination', value: redirect.destination },
                { name: 'status_code', value: redirect.status_code },
                { name: 'is_active', value: redirect.is_active },
            ])
    }, [form, redirect])

    const onFinish = async (values: FinishedRedirectValues) => {
        const finRedirect = fetch(`http://localhost:8080/redirects/${redirectId}`, {
            method: "PATCH",
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    return (
        <>
            <div>
                <RedirectForm onFinish={onFinish} form={form} state={redirect && (redirect.is_active ? true : false)}></RedirectForm>
            </div>
        </>
    )
}

export default UpdRedirect