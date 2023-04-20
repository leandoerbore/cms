import { useState } from "react";

interface EnableType {
    show: boolean;
    id: string | null;
}

const useUpdateItem = (
    {
        fetchData,
        setLoadTable,
        endpoint
    }: {
        fetchData: () => Promise<void>;
        setLoadTable: React.Dispatch<React.SetStateAction<boolean>>,
        endpoint: string;
    }
) => {
    const [showMoadlEnable, setShowModelEnable] = useState<EnableType>({
        show: false,
        id: null
    })

    const updEnabled = async (id: string) => {
        const body = {}
        setLoadTable(true);
        await fetch(`${endpoint}/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        await fetchData()
    }

    return { updEnabled, showMoadlEnable, setShowModelEnable }
}

export { useUpdateItem }