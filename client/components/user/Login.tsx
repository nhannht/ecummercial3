
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {Link } from "react-router-dom"
import { Button } from "../ui/button"

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome back!</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email or Username</Label>
            <Input id="email" type="text" placeholder="Enter your email or username" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                to="#"
                className="text-sm font-medium underline underline-offset-4 hover:text-primary"

              >
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}