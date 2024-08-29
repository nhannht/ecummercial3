import {Order, ResultMetadata, SortChoice, SortOption} from "@/lib/global.ts";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import {SortSettingsComponent} from "@/components/admin/SortSettingsComponent.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {PaginationComponent} from "@/components/PaginationComponent.tsx";
import {Badge} from "@/components/ui/badge.tsx";

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

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]|undefined>([])
  const [sorts, setSorts] = useState<SortOption[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [resultMetaData, setResultMetaData] = useState<ResultMetadata>({
    totalCount: orders?.length || 0,
    currentPage: parseInt(searchParams.get("page") || "1"),
    pageSize: 10
  })
  const [token,_getToken] = useLocalStorageState('token',{
    defaultValue:""
  })

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/orders?${searchParams.toString()}&preload=OrderItems.Product`,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type':"Application/json"
      }
    })
        .then(response => response.json())
        .then(result => {
          const {data, ...metaData} = result;
          // console.log(data)
          setOrders(data)
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
          <h1 className={"text-2xl font-bold"}>Orders Management</h1>
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
                <TableHead className="table-cell">Updated at</TableHead>
                <TableHead className={"hidden sm:table-cell"}>Cost</TableHead>
                <TableHead className="hidden md:table-cell">Items</TableHead>
                <TableHead className={"table-cell"}>Status</TableHead>
                {/*<TableHead className="hidden md:table-cell">Category</TableHead>*/}
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders && orders.map((order) => (
                  <TableRow key={order.ID}>
                    <TableCell className="md:table-cell">{new Date(order.UpdatedAt).toLocaleDateString()}</TableCell>
                    <TableCell className="hidden sm:table-cell">{order.TotalCost}</TableCell>
                    <TableCell className="hidden md:table-cell">{order.OrderItems?.map(i=> i.Product?.Name).join(", ")}</TableCell>
                    <TableCell className={"table-cell"}><Badge className={"text-muted"}>{order.Status}</Badge></TableCell>
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
