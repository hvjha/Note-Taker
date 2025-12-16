import { Book, BookA, BookOpen, LogOut, LogOutIcon, User, User2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getData } from "@/context/UserContext";
import axios from "axios";

const Navbar = () => {
  const {user,setUser} = getData()
  const accessToken = localStorage.getItem("accessToken")
  const logoutHandler = async()=>{
    try {
        const res = await axios.post(`http://localhost:8000/user/logout`,{},{
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        })
        if(res.data.success){
            setUser(null)
            toast.success(res.data.message)
            localStorage.clear()
        }
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <nav className="p-2 border-b border-gray-200 bg-transparent">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* logo section  */}
        <div className="flex gap-2 items-center">
          <BookOpen className="h-6 w-6 text-green-800" />
          <h1 className="font-bold text-xl">
            <span className="text-green-600">Notes</span>Taker
          </h1>
        </div>
        <div className="flex gap-7 items-center">
          <ul className="flex gap-7 items-center text-lg font-semibold">
            <li>Features</li>
            <li>Pricing</li>
            <li>About</li>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><User2/>Profile</DropdownMenuItem>
                  <DropdownMenuItem><Book/><Link to={'/create'}>Notes</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logoutHandler}><LogOutIcon/>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to={"/login"}>
                <li>Login</li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
