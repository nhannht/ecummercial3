
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {Link} from "react-router-dom"

export default function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-card p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-muted-foreground">Enter your details to get started.</p>
        </div>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" required />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="#" className="font-medium underline underline-offset-4" >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}