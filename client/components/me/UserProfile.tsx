
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Component() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 md:py-12 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 md:w-32 md:h-32">
            <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl md:text-3xl font-bold mt-4">John Doe</h1>
        </div>
        <div className="flex-1">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Save Changes
            </Button>
          </form>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold">Account Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Joined</div>
            <div>June 15, 2021</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Last Login</div>
            <div>August 8, 2024</div>
          </div>
        </div>
      </div>
    </div>
  )
}