
import { useState, useMemo } from "react"
import { Input } from "../ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuItem } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table"
import { Badge } from "../ui/badge"
import {Link } from "react-router-dom"
export default function Component() {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: "John Doe",
      date: "2023-05-15",
      total: 149.99,
      status: "Pending",
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      date: "2023-05-12",
      total: 299.99,
      status: "Shipped",
    },
    {
      id: "ORD003",
      customer: "Bob Johnson",
      date: "2023-05-10",
      total: 79.99,
      status: "Cancelled",
    },
    {
      id: "ORD004",
      customer: "Sarah Lee",
      date: "2023-05-08",
      total: 199.99,
      status: "Delivered",
    },
    {
      id: "ORD005",
      customer: "Tom Wilson",
      date: "2023-05-05",
      total: 399.99,
      status: "Pending",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")
  const [filterStatus, setFilterStatus] = useState("all")
  const filteredOrders = useMemo(() => {
    let filtered = orders
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    if (filterStatus !== "all") {
      filtered = filtered.filter((order) => order.status === filterStatus)
    }
    return filtered.sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }, [orders, searchTerm, sortColumn, sortDirection, filterStatus])
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }
  const handleStatusChange = (status) => {
    setFilterStatus(status)
  }
  const handleUpdateStatus = (order, newStatus) => {
    setOrders(orders.map((o) => (o.id === order.id ? { ...o, status: newStatus } : o)))
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xs"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FilterIcon className="h-4 w-4" />
                <span>Filter by Status</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filterStatus === "all"}
                onCheckedChange={() => handleStatusChange("all")}
              >
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus === "Pending"}
                onCheckedChange={() => handleStatusChange("Pending")}
              >
                Pending
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus === "Shipped"}
                onCheckedChange={() => handleStatusChange("Shipped")}
              >
                Shipped
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus === "Delivered"}
                onCheckedChange={() => handleStatusChange("Delivered")}
              >
                Delivered
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus === "Cancelled"}
                onCheckedChange={() => handleStatusChange("Cancelled")}
              >
                Cancelled
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
              Order #
              {sortColumn === "id" && <span className="ml-2">{sortDirection === "asc" ? "\u25B2" : "\u25BC"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("customer")}>
              Customer
              {sortColumn === "customer" && (
                <span className="ml-2">{sortDirection === "asc" ? "\u25B2" : "\u25BC"}</span>
              )}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
              Order Date
              {sortColumn === "date" && <span className="ml-2">{sortDirection === "asc" ? "\u25B2" : "\u25BC"}</span>}
            </TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
              <TableCell className="text-center">
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
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoveVerticalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href="#" prefetch={false}>
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button variant="outline" onClick={() => handleUpdateStatus(order, "Shipped")}>
                        Mark as Shipped
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button variant="outline" onClick={() => handleUpdateStatus(order, "Delivered")}>
                        Mark as Delivered
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button variant="outline" onClick={() => handleUpdateStatus(order, "Cancelled")}>
                        Cancel Order
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
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


function MoveVerticalIcon(props) {
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
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  )
}