import {useMemo, useState} from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger
} from "../ui/dropdown-menu"
import {Button} from "../ui/button"
import {Input} from "../ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table"
import {Link} from "react-router-dom"
import {Badge} from "../ui/badge"
import {DashBoardHeader} from "./DashBoardHeader";

export default function UserOrderHistory() {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      date: "2023-05-15",
      total: 99.99,
      status: "Delivered",
    },
    {
      id: "ORD002",
      date: "2023-04-22",
      total: 149.99,
      status: "Shipped",
    },
    {
      id: "ORD003",
      date: "2023-03-10",
      total: 79.99,
      status: "Cancelled",
    },
    {
      id: "ORD004",
      date: "2023-02-28",
      total: 199.99,
      status: "Pending",
    },
    {
      id: "ORD005",
      date: "2023-01-18",
      total: 59.99,
      status: "Delivered",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDate, setFilterDate] = useState({ start: "", end: "" })
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const statusMatch = filterStatus === "all" || order.status.toLowerCase() === filterStatus
      const dateMatch =
        (filterDate.start === "" || new Date(order.date) >= new Date(filterDate.start)) &&
        (filterDate.end === "" || new Date(order.date) <= new Date(filterDate.end))
      const searchMatch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.total.toString().includes(searchTerm)
      return statusMatch && dateMatch && searchMatch
    })
  }, [orders, filterStatus, filterDate, searchTerm])
  return (
    <div className="sm:py-8 sm:pl-14 w-full">
        <DashBoardHeader/>

        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <FilterIcon className="w-4 h-4 mr-2"/>
                            Filter by Status
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuRadioGroup value={filterStatus} onValueChange={setFilterStatus}>
                            <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="pending">Pending</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="shipped">Shipped</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="delivered">Delivered</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="cancelled">Cancelled</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="relative">
                    <div className="bg-background text-foreground border-muted rounded-md px-3 py-2 text-sm"/>
                    <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
                </div>
            </div>
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
                <Input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-background text-foreground border-muted rounded-md pl-10 pr-4 py-2 text-sm"
                />
            </div>
        </div>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell>
                            <Link to="#" className="font-medium text-primary">
                                {order.id}
                            </Link>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                            <Badge
                                variant={
                                    order.status === "Pending"
                                        ? "warning"
                                        : order.status === "Shipped"
                                            ? "info"
                                            : order.status === "Delivered"
                                                ? "success"
                                                : "danger"
                                }
                            >
                                {order.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <Link to="#" className="text-primary hover:underline">
                                View Details
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}