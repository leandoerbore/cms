import { FinishedRedirectValues, RedirectType } from "@/types/redirectType"
import { Form } from "antd"
import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import RedirectForm from "../form"

const UpdRedirect = (
    // { data }: { data: RedirectType }
) => {
    const [redirect, setRedirect] = useState<RedirectType>()
    const [redirectId, setRedirectId] = useState<string | undefined>()

    const [form] = Form.useForm()

    useEffect(() => {
        const id = window.location.pathname.split("/").at(-1)
        setRedirectId(id)
        const fetchData = async () => {
            const res = await fetch(`http://localhost:8080/redirects/${id}`)
            const data = await res.json() as RedirectType
            console.log(data)
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
                <RedirectForm onFinish={onFinish} form={form}></RedirectForm>
            </div>
        </>
    )
}

// export const getStaticPaths = async () => {
//     const res = await fetch("http://localhost:8080/redirects")
//     const data = await res.json() as RedirectType[]

//     const paths = data.map((redirect) => {
//         params: { id: 16 }
//     })

//     return {
//         paths,
//         fallback: false,
//     }
// }

// export const getStaticProps = async (context) => {
//     const { id } = context.params;
//     console.log(id)

//     const res = await fetch(`http://localhost:8080/redirects/${id}`)
//     const data = await res.json() as RedirectType

//     return {
//         props: {
//             redirect: data
//         }
//     }
// }

export default UpdRedirect