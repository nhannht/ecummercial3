import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

import useLocalStorageState from "use-local-storage-state";
import OrderManagement from "@/components/admin/OrderManagement.tsx";
import { Link} from "react-router-dom";
import {useEffect, useState} from "react";

export type AnalyticData = {
  TotalOrders: number;
  LastHourOrders: number;
  TotalUsers: number;
  TotalRevenues: number;
  LastMonthRevenues: number;
  LastWeekUsers: number;
}

export default function AdminDashBoard() {
  const [token] = useLocalStorageState("token",{defaultValue: ""})
  const [analyticsData, setAnalyticsData] = useState<AnalyticData>({
    LastHourOrders: 0,
    LastMonthRevenues: 0,
    LastWeekUsers: 0,
    TotalOrders: 0,
    TotalRevenues: 0,
    TotalUsers: 0
  })


  useEffect(()=>{
    const fetchAnalyticFunc = async  ()=>{
      try {
        const response = await  fetch(`${import.meta.env.VITE_SERVER_URL}/admin/analytic`,{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        })
        if (!response.ok) {
          return response.text().then(text=>{
            throw new Error(`Error fetching analytics data: ${text}`)

          })


        }
        const j = await response.json()
        const data: AnalyticData = j.data
        setAnalyticsData(data)

      } catch (error){
        if (error instanceof Error){
          throw new Error(`Error fetching analytics data: ${error.message}`)
        }
      }

    }
    fetchAnalyticFunc()
  },[])

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4">

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
                  <div className="text-2xl font-bold">${analyticsData.TotalRevenues.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">+{analyticsData.LastMonthRevenues.toFixed(2)}$ from last month</div>
                </div>
                <div className="grid gap-2">
                  <div className="text-sm text-muted-foreground">Total Customers</div>
                  <div className="text-2xl font-bold">{analyticsData.TotalUsers}</div>
                  <div className="text-xs text-muted-foreground">+{analyticsData.LastWeekUsers} from last week</div>
                </div>
                <div className="grid gap-2">
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                  <div className="text-2xl font-bold">{analyticsData.TotalOrders}</div>
                  <div className="text-xs text-muted-foreground">+{analyticsData.LastHourOrders} from last hour</div>
                </div>

              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-3">
              <CardTitle><div>
                Orders Managements
                <Link to={"/admin/orders"}>
                  <Button>
                    Go to
                  </Button>
                </Link>
              </div></CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                View and manage your recent orders.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrderManagement/>
            </CardContent>

          </Card>
          {/**/}
        </div>
      </main>
    </div>
  )
}




