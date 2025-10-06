import React, {useState, useRef, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { User, Menu } from 'lucide-react';

const Navbar = () => {
    const { authUser, logout } = useAuthStore();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    useEffect(()=>{
        const onDoc = (e)=>{ if(menuRef.current && !menuRef.current.contains(e.target)) setOpen(false); }
        document.addEventListener('click', onDoc);
        return ()=>document.removeEventListener('click', onDoc);
    },[])

    const handleLogout = async ()=>{
        await logout();
        navigate('/login');
    }

    return (
        <div className="navbar bg-base-100 sticky top-0 z-50 shadow">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    <div className="inline-flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow">
                            <User className="size-5" />
                        </div>
                        <span>NeighborNet</span>
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li><Link to="/">Home</Link></li>
                    {authUser && <li><Link to="/profile">Profile</Link></li>}
                    {!authUser && <li><Link to="/settings">Settings</Link></li>}
                </ul>
            </div>
            <div className="navbar-end">
                {authUser ? (
                    <div className="dropdown dropdown-end" ref={menuRef}>
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full bg-base-200 flex items-center justify-center">{(authUser.fullname||authUser.email||'U')[0].toUpperCase()}</div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li><Link to="/profile">Profile</Link></li>
                            {!authUser && <li><Link to="/settings">Settings</Link></li>}
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <div className="hidden md:flex items-center gap-3">
                        <Link to="/login" className="btn btn-ghost">Login</Link>
                        <Link to="/signup" className="btn btn-primary">Sign up</Link>
                    </div>
                )}
                <div className="dropdown dropdown-end ml-2 lg:hidden">
                    <button onClick={() => setOpen(o=>!o)} className="btn btn-ghost btn-circle">
                        <Menu />
                    </button>
                    {open && (
                        <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to="/">Home</Link></li>
                            {authUser && <li><Link to="/profile">Profile</Link></li>}
                            {!authUser && <li><Link to="/settings">Settings</Link></li>}
                            {authUser ? <li><button onClick={handleLogout}>Logout</button></li> : <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/signup">Sign up</Link></li>
                            </>}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar;