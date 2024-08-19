//@ts-nocheck
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import {Link} from "react-router-dom"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {MoveHorizontalIcon, SearchIcon} from "lucide-react";
import {DashBoardHeader} from "./DashBoardHeader";

export default function DashBoard() {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4">
        <DashBoardHeader/>

      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Overview</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Get a high-level view of your business performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <div className="text-xs text-muted-foreground">+20.1% from last month</div>
                </div>
                <div className="grid gap-2">
                  <div className="text-sm text-muted-foreground">New Customers</div>
                  <div className="text-2xl font-bold">2,350</div>
                  <div className="text-xs text-muted-foreground">+180.1% from last month</div>
                </div>
                <div className="grid gap-2">
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                  <div className="text-2xl font-bold">12,234</div>
                  <div className="text-xs text-muted-foreground">+19% from last month</div>
                </div>
                <div className="grid gap-2">
                  <div className="text-sm text-muted-foreground">Active Users</div>
                  <div className="text-2xl font-bold">573</div>
                  <div className="text-xs text-muted-foreground">+201 since last hour</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-3">
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                View and manage your recent orders.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Type</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-accent">
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">liam@example.com</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">Sale</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant="secondary">
                        Fulfilled
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Olivia Smith</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">olivia@example.com</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">Refund</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant="outline">
                        Declined
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">2023-06-24</TableCell>
                    <TableCell className="text-right">$150.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Noah Williams</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">noah@example.com</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">Subscription</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant="secondary">
                        Fulfilled
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">2023-06-25</TableCell>
                    <TableCell className="text-right">$350.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Emma Brown</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">emma@example.com</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">Sale</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant="secondary">
                        Fulfilled
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">2023-06-26</TableCell>
                    <TableCell className="text-right">$450.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-4</strong> of <strong>32</strong> orders
              </div>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-3">
              <CardTitle>Top Products</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                View your best-selling products.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="hidden sm:table-cell">Type</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Price</TableHead>
                    <TableHead className="hidden md:table-cell">Total Sales</TableHead>
                    <TableHead className="hidden md:table-cell">Created at</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Laser Lemonade Machine</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">Draft</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline">Draft</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">$499.99</TableCell>
                    <TableCell className="hidden md:table-cell">25</TableCell>
                    <TableCell className="hidden md:table-cell">2023-07-12 10:42 AM</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoveHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Hypernova Headphones</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">Active</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">$129.99</TableCell>
                    <TableCell className="hidden md:table-cell">100</TableCell>
                    <TableCell className="hidden md:table-cell">2023-10-18 03:21 PM</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoveHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">AeroGlow Desk Lamp</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">Active</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">$39.99</TableCell>
                    <TableCell className="hidden md:table-cell">50</TableCell>
                    <TableCell className="hidden md:table-cell">2023-11-29 08:15 AM</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoveHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">TechTonic Energy Drink</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">Draft</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="secondary">Draft</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">$2.99</TableCell>
                    <TableCell className="hidden md:table-cell">0</TableCell>
                    <TableCell className="hidden md:table-cell">2023-12-25 11:59 PM</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoveHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Gamer Gear Pro Controller</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">Active</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">$59.99</TableCell>

                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}




