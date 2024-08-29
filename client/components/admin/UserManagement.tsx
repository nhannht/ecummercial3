
import {useEffect, useState} from "react"
import {ResultMetadata, SortChoice, SortOption, User} from "@/lib/global.ts";
import { useSearchParams} from "react-router-dom";
import {SortSettingsComponent} from "@/components/admin/SortSettingsComponent.tsx";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {PaginationComponent} from "@/components/PaginationComponent.tsx";
import useLocalStorageState from "use-local-storage-state";

const sortChoices: SortChoice[] = [
  {
    ID: "newest_updated_at",
    orders: [{sortBy: "updated_at", sortOrder: "desc"}],
    description: "Most recently updated users"
  },
  {
    ID: "oldest_updated_at",
    orders: [{sortBy: "updated_at", sortOrder: "asc"}],
    description: "From oldest to most recently updated users"
  },

]

export default function UserManagement() {
  const [users, setUsers] = useState<User[]|undefined>([])
  const [sorts, setSorts] = useState<SortOption[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [resultMetaData, setResultMetaData] = useState<ResultMetadata>({
    totalCount: users?.length || 0,
    currentPage: parseInt(searchParams.get("page") || "1"),
    pageSize: 10
  })
  const [token,_getToken] = useLocalStorageState('token',{
    defaultValue:""
  })

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/users?${searchParams.toString()}`,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type':"Application/json"
      }
    })
        .then(response => response.json())
        .then(result => {
          // console.log(data)
          const {data, ...metaData} = result;
          setUsers(data)
          setResultMetaData(metaData)
          // console.log(metaData)
        })
        .catch(error => console.error('Error fetching products:', error));
  }, [searchParams])

  useEffect(() => {
    // console.log("sorts updated")
    searchParams.delete("sortBy");
    searchParams.delete("sortOrder");
    sorts.forEach(sorts => {
      searchParams.append("sortBy", sorts.sortBy);
      searchParams.append("sortOrder", sorts.sortOrder);
    })
    setSearchParams(searchParams)


  }, [sorts])

  return (
      <div className="flex flex-col gap-4 p-4 sm:p-6">
        <div className={"flex flex-row justify-between"}>
          <h1 className={"text-2xl font-bold"}>Users Management</h1>
          <div className={"flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end"}>
            <SortSettingsComponent
                choices={sortChoices}
                handleSort={setSorts}/>

          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {/*<TableHead className="w-[80px] sm:w-[100px]">Image</TableHead>*/}
                <TableHead>Name</TableHead>
                {/*<TableHead className="hidden sm:table-cell">Price</TableHead>*/}
                {/*<TableHead className="hidden md:table-cell">Category</TableHead>*/}
                <TableHead className="hidden md:table-cell">Updated at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users && users.map((user) => (
                  <TableRow key={user.ID}>
                    {/*<TableCell>*/}
                    {/*  <img*/}
                    {/*      src={user.}*/}
                    {/*      width="64"*/}
                    {/*      height="64"*/}
                    {/*      alt={user.Name}*/}
                    {/*      className="aspect-square rounded-md object-cover"*/}
                    {/*  />*/}
                    {/*</TableCell>*/}
                    <TableCell className="font-medium">{user.Name}</TableCell>

                    {/*<TableCell className="hidden sm:table-cell">${user.Price?.toFixed(2)}</TableCell>*/}
                    {/*<TableCell*/}
                    {/*    className="hidden md:table-cell">{user.Categories?.map(category => category.CategoryName).join(', ')}</TableCell>*/}
                    <TableCell
                        className="md:table-cell">{new Date(user.UpdatedAt).toLocaleDateString()}</TableCell>
                    {/*<TableCell className={"table-cell"}>*/}
                    {/*  <Link className={"table-cell"} to={`/admin/products/edit/${user.ID}`}>*/}
                    {/*    <PencilIcon/>*/}
                    {/*  </Link>*/}
                    {/*</TableCell>*/}


                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <PaginationComponent searchParams={searchParams}
                             setSearchParams={setSearchParams}
                             resultMetaData={resultMetaData}

        />


      </div>
  )
}





