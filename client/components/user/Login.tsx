import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card"
import {Label} from "../ui/label"
import {Input} from "../ui/input"
import {Link, useNavigate} from "react-router-dom"
import {Button} from "../ui/button"
import useLocalStorageState from "use-local-storage-state";
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast.ts";
import {emptyUser} from "@/lib/global" ;
import {User} from "@/lib/global";




export default function Login() {

    const [_userToken, setUserToken] =
        useLocalStorageState<string>(`token`, {defaultValue: ""})

    const [_userData, setUserData] =
        useLocalStorageState<User>(`user`,
            {
                defaultValue: emptyUser
            })
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null);
    const {toast} = useToast();
    const navigate = useNavigate()


    const handleLogin = async () => {
        setError(null); // Reset error state
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    identifier,password
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const responseJSON = await response.json();
            const data: {
                User: User,
                Token: string
            } = responseJSON.data
            setUserData(data.User)
            setUserToken(data.Token);
            // console.log(responseJSON)

            if (data.User.Role === "admin") {
                navigate("/admin")

            } else if (data.User.Role === "user") {
                navigate("/user")
            }

            toast({
                description: `Successfully logged in`,
            })

        } catch (error:unknown) {
            console.error('Error during login:', error);
            if (error instanceof Error) {

            setError(error.message);
            } else {
                setError('Unknow error occur')
            }


        }

    };

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
                        <Input

                            id="email" type="text"
                            placeholder="Enter your email or username"
                            value={identifier}
                            onChange={(e)=>setIdentifier(e.target.value) }
                            required/>
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
                        <Input id="password" type="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               required/>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        onClick={handleLogin}
                        type="submit" className="w-full">
                        Sign In
                    </Button>
                </CardFooter>
                {error && <p className="text-red-500 text-sm">Wrong username/email or password </p>}
            </Card>
        </div>
    )
}