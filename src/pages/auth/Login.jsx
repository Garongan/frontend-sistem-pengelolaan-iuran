import { Ship } from "lucide-react";
import LoginForm from "./components/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl">
                    <div className="container relative grid h-[800px] flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
                        <Link to={"/register"}
                            className="hover:bg-zinc-900 hover:text-zinc-50 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 absolute right-4 top-4 md:right-8 md:top-8">
                            Registration
                        </Link>
                        <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r">
                            <div className="absolute inset-0 bg-zinc-900">
                                <img src="/banner.jpg" alt="banner" />
                            </div>
                            <div className="relative z-20 flex items-center text-lg font-medium bg-gradient-to-b from-black to-tranparent p-5">
                                <Ship className="me-3" />
                                Warung Makan Bahari
                            </div>
                            <div className="relative z-20 mt-auto p-5 bg-gradient-to-t from-black to-tranparent">
                                <blockquote className="space-y-2">
                                    <p className="text-lg">“Warung makan Bahari: Nikmatnya hidangan keluarga dalam setiap suapan di tepian pantai.”</p>
                                    <footer className="text-sm">Founder: Alvindo Tri Jatmiko</footer>
                                </blockquote>
                            </div>
                        </div>
                        <div className="lg:p-8">
                            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                                <div className="flex flex-col space-y-2 text-center">
                                    <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
                                    <p className="text-sm text-muted-foreground">Enter your username below to login</p>
                                </div>
                                <div className="grid gap-6">
                                    <LoginForm />
                                </div>
                                <p className="px-8 text-center text-sm text-muted-foreground">
                                    By clicking continue, you agree to our{" "}
                                    <a className="underline underline-offset-4 hover:text-primary" href="/terms">
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a className="underline underline-offset-4 hover:text-primary" href="/privacy">
                                        Privacy Policy
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
