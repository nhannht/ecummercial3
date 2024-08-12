
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-4xl p-8 md:p-12">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Thank you for your order!</h1>
            <p className="text-muted-foreground">Your order has been processed and is on its way.</p>
          </div>
          <Card className="w-full bg-muted/40 p-6 md:p-8">
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground">Order #</div>
                <div className="font-medium">Oe31b70H</div>
              </div>
              <Separator />
              <div className="grid gap-4">
                <div className="font-medium">Items Purchased</div>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <div className="text-muted-foreground">Glimmer Lamps x 2</div>
                    <div>$250.00</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-muted-foreground">Aqua Filters x 1</div>
                    <div>$49.00</div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <div className="text-muted-foreground">Subtotal</div>
                  <div>$299.00</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-muted-foreground">Shipping</div>
                  <div>$5.00</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-muted-foreground">Tax</div>
                  <div>$25.00</div>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <div className="text-muted-foreground">Total</div>
                  <div>$329.00</div>
                </div>
              </div>
              <Separator />
              <div className="grid gap-3">
                <div className="font-medium">Shipping Address</div>
                <address className="grid gap-0.5 not-italic text-muted-foreground">
                  <span>Liam Johnson</span>
                  <span>1234 Main St.</span>
                  <span>Anytown, CA 12345</span>
                </address>
              </div>
              <div className="grid gap-3">
                <div className="font-medium">Estimated Delivery</div>
                <div className="text-muted-foreground">October 23, 2023</div>
              </div>
            </div>
          </Card>
          <div className="flex gap-4">
            <Link to="#" className="flex-1" >
              <Button variant="outline" className="w-full">
                View Order Details
              </Button>
            </Link>
            <Link to="#" className="flex-1" >
              <Button variant="outline" className="w-full">
                Print Order
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}