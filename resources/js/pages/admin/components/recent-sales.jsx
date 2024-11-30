import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {useEffect, useState} from "react";
import {route} from "ziggy-js";
import axios from "axios";
import {Skeleton} from "@/components/ui/skeleton"

export function RecentSales() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        const fetchUsers = async () => {
            const res = await axios.get(route('data', 'contributors'))
            const {contributors} = res.data
            setUsers(contributors)
        }
        fetchUsers().then()
        setLoading(false)
    })

    return (
        <div className="space-y-8">
            {loading ? <Skeleton/> :
                users && users.map(user => (
                    <div className="flex items-center">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={`/storage/avatars/${user.image}`} alt="Avatar"/>
                            <AvatarFallback>{user.name.split(' ').map(e => e.charAt(0)).join()}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                        <div className="ml-auto font-medium">{user["finished_tasks"]}</div>
                    </div>
                ))}

        </div>
    )
}

