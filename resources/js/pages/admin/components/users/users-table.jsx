import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {useQuery, useQueryClient} from "@tanstack/react-query"
import {Checkbox} from "@/components/ui/checkbox"
import {Skeleton} from "@/components/ui/skeleton"
import {CircleCheckBig, EllipsisIcon, SearchIcon, Trash2Icon, X} from "lucide-react"
import React, {lazy, Suspense, useCallback, useMemo, useState} from "react"
import {Input} from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {toast} from "sonner"
import debounce from "lodash.debounce"
import {MyPagination} from "@/components/MyPagination"
import {Button} from "@/components/ui/button"
import {ReloadIcon} from "@radix-ui/react-icons"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger
} from "@/components/ui/select"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Dialog, DialogTrigger} from "@/components/ui/dialog"
import ShinyButton from "@/components/ui/shiny-button"

const UsersTable = () => {
    const queryClient = useQueryClient();
    const [searchValue, setSearchValue] = useState('')
    const [selectingUsers, setSelectingUsers] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [img, setImg] = useState('')
    const [page, setPage] = useState(1)

    const {data, isLoading} = useQuery({
        queryKey: ['users-table', searchValue, page],
        queryFn: async () => {
            const res = await axios.get(route('table-user', {searchValue, page}));
            return res.data
        },
        refetchOnWindowFocus: false,
        enabled: !!searchValue || searchValue === '',
        refetchOnMount: false
    })
    let sortedUsers = useMemo(() => data ? data.data.sort((a, b) => (a.id - b.id)) : [], [data])

    const handleMassDelete = async () => {
        const res = await axios.delete(route('mass-destroy', {ids: selectingUsers}));
        if (res.status === 200) {
            toast.success("Users deleted successfully")
            setSelectingUsers([])
            await queryClient.invalidateQueries({queryKey: ['users-table', searchValue, page], exact: true})
        }
    }

    const handleSearchChange = useCallback(
        debounce((value) => {
            setSearchValue(value)
        }, 1000), [])

    const handleSingleDelete = async (userId) => {
        const res = await axios.delete(route('single-destroy', userId));
        if (res.status === 200) {
            toast.success("Task deleted successfully")
            await queryClient.invalidateQueries({queryKey: ['users-table', searchValue, page], exact: true})
        }
    }

    const handleRoleChange = async (userId, role) => {
        console.log(role, userId)
        const res = await axios.post(route('assign.role', {user: userId, role: role}));
        if (res.status === 200) {
            toast.success("Role changed successfully")
            await queryClient.invalidateQueries({queryKey: ['users-table', searchValue, page], exact: true})

        }
    }

    const handleUpdateUser = async (user, field, value) => {
        if (user[field] === value) return
        const res = await axios.patch(route('users.update', {user: user.id, [field]: value}));
        if (res.status === 200) {
            toast.success(`User's ${field} updated successfully`)
            await queryClient.invalidateQueries({queryKey: ['users-table', searchValue, page], exact: true})
        }
    }

    const handleEmailVerifiedChange = async (userId, verified) => {
        const res = await axios.patch(route('users.update', {user: userId, verified: verified}));
        if (res.status === 200) {
            toast.success("Email verified successfully")
            await queryClient.invalidateQueries({queryKey: ['users-table', searchValue, page], exact: true})
        }
    }

    const LazyLayer = lazy(() => import("@/components/layers/image-present"))

    return (
        <div className="w-full bg-white dark:bg-inherit p-4 flex flex-col rounded-md gap-5">
            <h1 className="font-semibold tracking-tight text-xl"> Users Management </h1>
            <div className="flex justify-between items-center sticky top-0">
                <div className="relative w-1/2">
                    <Input placeholder="Search for users by name or email" type="search"
                           className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                           onChange={e => handleSearchChange(e.target.value)}/>
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400 dark:to-gray-500"/>
                </div>
                <div className="flex gap-2 items-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" onClick={handleMassDelete} disabled={selectingUsers.length === 0}>
                                <Trash2Icon/>
                            </Button>
                        </DialogTrigger>
                    </Dialog>
                    <Button variant="outline" onClick={async () => {
                        await queryClient.invalidateQueries({queryKey: ['users-table', searchValue, page]})
                        toast('refreshed')
                    }}>
                        <ReloadIcon/>
                    </Button>
                </div>
                <Suspense fallback={<></>}>
                    <LazyLayer img={img} setOpen={setImg}/>
                </Suspense>
                <ShinyButton className="fixed bottom-[3rem] right-4 z-[50] p-4 backdrop-blur text-white rounded-full shadow-lg" onClick={async () => await queryClient.invalidateQueries(['users-table', searchValue, page])}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 8 8">
                        <path fill="currentColor" d="M4 0C1.8 0 0 1.8 0 4s1.8 4 4 4c1.1 0 2.12-.43 2.84-1.16l-.72-.72c-.54.54-1.29.88-2.13.88c-1.66 0-3-1.34-3-3s1.34-3 3-3c.83 0 1.55.36 2.09.91L4.99 3h3V0L6.8 1.19C6.08.47 5.09 0 3.99 0z"></path>
                    </svg>
                </ShinyButton>
            </div>
            {isLoading ? <Skeleton className="rounded-md w-full h-[300px]"/> :
                <Table>
                    <TableCaption>A list of users.</TableCaption>
                    <TableHeader>
                        <TableRow className="font-medium [font-size:1rem] font-ui tracking-tight">
                            <TableHead>
                                <Checkbox role="checkbox"
                                          onCheckedChange={(e) => {setSelectingUsers(e ? sortedUsers.map((task) => task.id) : [])}}
                                />
                            </TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead className="">Avatar</TableHead>
                            <TableHead className="ps-4">Name</TableHead>
                            <TableHead className="ps-4 hidden lg:table-cell">Email</TableHead>
                            <TableHead className="text-center">Verified</TableHead>
                            <TableHead className="text-center hidden lg:table-cell">Date of Birth</TableHead>
                            <TableHead className="text-center">Password</TableHead>
                            <TableHead className="text-center">Role</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedUsers.map((user) => (
                            <TableRow key={user.name}
                                      className={`min-h-[100px] ${selectingUsers.includes(user.id) && 'bg-gray-100 dark:bg-gray-800'}`}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectingUsers.includes(user.id)}
                                        onCheckedChange={(e) => {
                                            if (e) {
                                                setSelectingUsers([...selectingUsers, user.id])
                                            } else {
                                                setSelectingUsers(selectingUsers.filter((id) => id !== user.id))
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell className="font-medium text-center">{user.id}</TableCell>
                                <TableCell className="font-medium text-center">
                                    <Avatar className="border-red-400">
                                        <AvatarImage src={`/storage/app/avatars/${user.image}`} alt="avatar"
                                                     onClick={() => setImg(`/storage/app/avatars/${user.image}`)}
                                                     className="cursor-pointer"/>
                                        <AvatarFallback>{user.name.split(' ').map(e => e.charAt(0)).join()}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="font-medium text-left">
                                    <Input defaultValue={user.name ?? null} aria-label="Name" title={user.name}
                                           className="w-fit border-none mx-auto p-0 shadow-none m-0 ps-2"
                                           onBlur={e => handleUpdateUser(user, 'name', e.target.value)}
                                    />
                                    {/*{user.name}*/}
                                </TableCell>
                                <TableCell className=" hidden lg:block">
                                    <Input defaultValue={user.email ?? null}
                                           className=" border-none mx-auto p-0 shadow-none m-0 ps-2"
                                           onBlur={e => handleUpdateUser(user, 'email', e.target.value)}
                                    />

                                </TableCell>
                                <TableCell className="capitalize text-center">
                                    <input id="verified" name="verified" type="checkbox"
                                           className="checkbox checkbox-info rounded size-5"
                                           checked={user.email_verified_at}
                                           onChange={e => handleEmailVerifiedChange(user.id, e.target.checked)}
                                    />
                                </TableCell>
                                <TableCell className="capitalize font-medium text-center  hidden lg:block">
                                    <Input defaultValue={user.birthday ?? null} type="date"
                                           className="w-fit border-none mx-auto"
                                           onBlur={e => handleUpdateUser(user, 'birthday', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell className="text-center">
                                    <label htmlFor="" className="flex items-center justify-center gap-3 select-none">
                                        *******
                                    </label>
                                </TableCell>
                                <TableCell>
                                    <Select onValueChange={(e) => handleRoleChange(user.id, e)}>
                                        <SelectTrigger className={`mx-auto flex items-center justify-center gap-3 ${user.roles.some(role => role.name === 'admin') ? 'bg-[#034F73]' : ''} max-w-[130px]`}>
                                            {user.roles.some(role => role.name === 'admin') ?
                                                <div className="flex rounded-sm items-center gap-2 px-2 py-1">
                                                    <img src="/storage/user/admin1.svg" alt="admin"/>
                                                    <span className=" text-white font-normal">Admin</span>
                                                </div>
                                                :
                                                <div className="flex rounded-sm items-center gap-2 px-2 py-1">
                                                    <img src="/storage/user/user.svg" alt="user" aria-label="User Badge" className="size-4"/>
                                                    <span className="font-normal">User</span>
                                                </div>}
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Roles</SelectLabel>
                                                <SelectSeparator/>
                                                <SelectItem value='admin'>
                                                    <div className="flex gap-2">
                                                        <img src="/storage/user/admin1.svg" alt="admin"/>
                                                        Admin
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value='user'>
                                                    <div className="flex gap-2">
                                                        <img src="/storage/user/user.svg" alt="user"/>
                                                        User
                                                    </div>
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                </TableCell>
                                <TableCell className="max-w-[100px]">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost">
                                                <EllipsisIcon/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-64" side="left">
                                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                                            <DropdownMenuSeparator/>
                                            {selectingUsers.includes(user.id) ?
                                                <DropdownMenuItem onClick={() => setSelectingUsers(selectingUsers.filter((id) => id !== user.id))}>
                                                    <X/>
                                                    Unselect
                                                </DropdownMenuItem>
                                                :
                                                <DropdownMenuItem onClick={() => setSelectingUsers([...selectingUsers, user.id])}>
                                                    <CircleCheckBig/>
                                                    Select
                                                </DropdownMenuItem>
                                            }
                                            <DropdownMenuItem onClick={() => handleSingleDelete(user.id)}>
                                                <Trash2Icon/>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter className="bg-white dark:bg-inherit">
                        <TableRow>
                            <TableCell colSpan={8}>
                                <MyPagination links={data.links} action={setPage}/>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>}
        </div>

    )
}

export default UsersTable
