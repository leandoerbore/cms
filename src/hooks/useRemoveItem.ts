import { useState } from "react";

const useDeleteItem = (
    {
        fetchData,
        setLoadTable,
        endpoint,
    }: {
        fetchData: () => Promise<void>,
        setLoadTable: React.Dispatch<React.SetStateAction<boolean>>;
        endpoint: string;
    }
) => {
    const [showMoadlDelete, setShowMoadlDelete] = useState<boolean>(false)
    const [deleting, setDeleting] = useState<string>('')

    const handleClickDel = (id: string) => {
        setDeleting(id)
        setShowMoadlDelete(true)
    }

    const handleDelete = async () => {
        setLoadTable(true);
        await fetch(`${endpoint}/${deleting}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        await fetchData()
        setShowMoadlDelete(false)
        setDeleting('')
    }

    const handleCancel = () => {
        setShowMoadlDelete(false)
        setDeleting('')
    }

    return { handleCancel, handleClickDel, handleDelete, showMoadlDelete }
}

export { useDeleteItem }