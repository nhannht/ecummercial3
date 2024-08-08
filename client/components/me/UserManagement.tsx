

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "johndoe",
      email: "johndoe@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      username: "janesmith",
      email: "janesmith@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      id: 3,
      username: "bobwilson",
      email: "bobwilson@example.com",
      role: "Editor",
      status: "Active",
    },
    {
      id: 4,
      username: "sarahjones",
      email: "sarahjones@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 5,
      username: "mikeanderson",
      email: "mikeanderson@example.com",
      role: "Admin",
      status: "Inactive",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("username")
  const [sortDirection, setSortDirection] = useState("asc")
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  const sortedUsers = filteredUsers.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
    return 0
  })
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId))
  }
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "",
    status: "Active",
  })
  const handleCreateUser = () => {
    setUsers([
      ...users,
      {
        id: users.length + 1,
        ...newUser,
      },
    ])
    setShowCreateModal(false)
    setNewUser({
      username: "",
      email: "",
      role: "",
      status: "Active",
    })
  }
  return (
    <div className="flex flex-col h-full">
      <header className="bg-background p-4 shadow">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Button onClick={() => setShowCreateModal(true)}>Create User</Button>
        </div>
      </header>
      <main className="flex-1 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedUsers.map((user) => (
            <Card key={user.id}>
              <CardContent className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{user.username}</div>
                  <Badge variant={user.status === "Active" ? "green" : "red"}>{user.status}</Badge>
                </div>
                <div className="text-muted-foreground">{user.email}</div>
                <div className="text-muted-foreground">{user.role}</div>
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="icon" className="text-muted-foreground hover:text-foreground">
                    <FilePenIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => handleDelete(user.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Create User</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  id="role"
                  value={newUser.role}
                  onValueChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  id="status"
                  value={newUser.status}
                  onValueChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateUser}>Create</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

function FilePenIcon(props) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}


function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}