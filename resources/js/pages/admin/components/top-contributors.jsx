import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {route} from "ziggy-js";
import axios from "axios";
import {Skeleton} from "@/components/ui/skeleton"
import {useQuery} from "@tanstack/react-query"

export function TopContributors() {
    const {data, isLoading} = useQuery({
        queryKey: ['topContributors'],
        queryFn: async () => {
            const {contributors} = (await axios.get(route('data', 'contributors'))).data;
            return contributors
        },
    })

    return (
        <div className="space-y-8">
            {isLoading ? <Skeleton/> :
                data && data.map(user => (
                    <div className="flex items-center" key={user.name}>
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={`/storage/app/avatars/${user.image}`} alt="Avatar"/>
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

