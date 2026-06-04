import { ArrowUpRightIcon, LogOutIcon, MapPinIcon,ChevronDownIcon, MenuIcon, PackageIcon, SearchIcon, ShieldIcon, ShoppingCartIcon, UserIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { BellIcon } from "lucide-react";

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartCount, setIsCartOpen } = useCart();
    const [searchQuery, setSearchQuery] = useState("");
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
        }
    };

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
        navigate("/");
    };

    return (
        <nav className="
sticky top-0 z-50
bg-white/90
supports-[backdrop-filter]:bg-white/75
backdrop-blur-md
border-b border-orange-100
shadow-sm
">
            <div className="
max-w-[1400px]
mx-auto
px-3 md:px-6 lg:px-8
flex items-center
justify-between
gap-3 md:gap-6
min-h-[64px] md:min-h-[72px]
py-2
">
                {/* Logo */}
                <div className="hidden md:block">
    <p className="text-xs text-gray-500">
        Delivering To
    </p>

    <p className="text-sm font-semibold">
        Mumbai 400001
    </p>
</div>
                {/* Logo */}
<Link
    to="/"
    className="
    flex items-center
    shrink-0
    "
>
    <h1
        className="
        text-2xl
        md:text-3xl
        font-bold
        tracking-tight
        "
    >
        <span className="text-orange-500">Pill</span>
        <span className="text-zinc-900">Now</span>
    </h1>
</Link>
              <div className="
flex-1
flex
items-center
gap-2 md:gap-6
min-w-0
">
                    {/* Nav Links - Desktop */}
                    <div className="hidden md:flex items-center gap-6 text-[16px] md:text-sm text-zinc-600">
                      <Link
    to="/"
    className="
    hover:text-orange-500
    transition-colors
    "
>
    Home
</Link>
                        <Link to="/products">Products</Link>
                        <Link to="/deals" className="text-app-orange">
                            Deals
                        </Link>
                    </div>
                    {/* Search */}
                    {/* Search */}
{/* Search Section */}
<div className="
flex-1
flex
items-center
justify-center
min-w-0
">

  {/* Desktop Search */}
  <form
    onSubmit={handleSearch}
    className="hidden md:flex w-full max-w-2xl"
  >
    <div
      className="
      flex items-center
      w-full
      bg-white
      border
      border-orange-200
      rounded-2xl
      overflow-hidden
      shadow-sm
      transition-all
      hover:shadow-md
      focus-within:ring-4
      focus-within:ring-orange-100
      focus-within:border-orange-500
    "
    >
      <div className="px-4 text-orange-500">
        <SearchIcon className="size-5" />
      </div>

      <input
        type="text"
        placeholder="Search medicines and healthcare products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="
        flex-1
        py-3
        text-sm
        outline-none
        bg-transparent
        text-zinc-800
        placeholder:text-zinc-400
      "
      />

      <button
        type="submit"
        className="
        bg-orange-500
        hover:bg-orange-600
        text-white
        px-6
        py-3
        text-sm
        font-medium
        transition-all
      "
      >
        Search
      </button>
    </div>
  </form>

  {/* Mobile Search */}
  <div className="md:hidden mt-3">
    <button
        className="
        w-full
        bg-orange-500
        text-white
        py-3
        rounded-2xl
        font-semibold
        "
    >
        📄 Upload Prescription
    </button>
</div>
  <form
    onSubmit={handleSearch}
    className="flex md:hidden w-full"
  >
    <div
      className="
      flex items-center
      w-full
      bg-white
      border
      border-orange-200
      rounded-2xl
      overflow-hidden
      shadow-sm
    "
    >
      <div className="pl-4 text-orange-500">
        <SearchIcon className="size-4" />
      </div>

      <input
        type="text"
        placeholder="Search medicines..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="
        flex-1
        px-3
    h-11
        text-sm
        outline-none
        bg-transparent
      "
      />

      <button
        type="submit"
        className="
        bg-orange-500
       w-11
h-11
flex items-center justify-center
        text-white
      "
      >
        <SearchIcon className="size-4" />
      </button>
    </div>
  </form>

</div>
                    {/* Right Actions */}
                    <Link
    to="/notifications"
    className="
    relative
    p-2
    rounded-xl
    hover:bg-orange-50
    transition-all
    "
>
    🔔
</Link>
                    <div className="flex items-center gap-3">
                        {/* Cart */}
                        <button className="
relative
p-2
rounded-xl
hover:bg-orange-50
transition-all
" onClick={() => setIsCartOpen(true)}>
                            <ShoppingCartIcon className="size-5 text-zinc-900" />
                            {cartCount > 0 && <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px]
px-1 bg-orange-500 text-white text-[10px] rounded-full shadow-md flex-center">{cartCount}</span>}
                        </button>
                        {/* User */}
                        <div className="relative">
                            {user ? (
                                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="
flex items-center
gap-2
p-2
rounded-xl
hover:bg-orange-50
transition-all
">
                                    <div className="size-7 rounded-full shadow-md bg-green-950 text-white flex-center">{user.name.charAt(0).toUpperCase()}</div>
                                    <ChevronDownIcon className="size-3 text-zinc-500" />
                                </button>
                            ) : (
                                <div className="flex-center gap-2">
                                    <Link to="/login" className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-950 rounded-full shadow-md hover:bg-green-950-light transition-colors">
                                        <UserIcon size={16} /> Sign In
                                    </Link>
                                    {userMenuOpen ? <XIcon
    className="
    md:hidden
    size-5
    text-zinc-700
    shrink-0
    " onClick={() => setUserMenuOpen(!userMenuOpen)} /> : <MenuIcon className="
md:hidden
size-5
text-zinc-700
shrink-0
" onClick={() => setUserMenuOpen(!userMenuOpen)} />}
                                </div>
                            )}

                            {userMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                                    <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-xl shadow-lg border border-app-border py-2 z-50 animate-fade-in">
                                        {user && (
                                            <div className="px-4 py-2 border-b border-app-border">
                                                <p className="text-sm font-medium text-zinc-900">{user?.name}</p>
                                                <p className="text-xs text-zinc-500">{user?.email}</p>
                                            </div>
                                        )}
                                        <div onClick={() => setUserMenuOpen(false)}>
                                            {!user && (
                                                <Link to="/login" className="
flex items-center gap-3
px-4 py-3
text-sm
text-zinc-700
hover:bg-orange-50
transition-all
">
                                                    <UserIcon size={16} /> Sign In{" "}
                                                </Link>
                                            )}

                                            {user && (
                                                <Link to="/orders" className="
flex items-center gap-3
px-4 py-3
text-sm
text-zinc-700
hover:bg-orange-50
transition-all
">
                                                    <PackageIcon size={16} /> My Orders{" "}
                                                </Link>
                                            )}

                                            {user && (
                                                <Link to="/addresses" className="
flex items-center gap-3
px-4 py-3
text-sm
text-zinc-700
hover:bg-orange-50
transition-all
">
                                                    <MapPinIcon size={16} /> Addresses{" "}
                                                </Link>
                                            )}

                                            <Link to="/products" className="dropdown-link md:hidden">
                                                <ArrowUpRightIcon size={16} /> Products{" "}
                                            </Link>

                                            <Link to="/deals" className="dropdown-link md:hidden">
                                                <ArrowUpRightIcon size={16} /> Deals{" "}
                                            </Link>
                                            {user && user.isAdmin && (
                                             <Link
    to="/admin/products"
    className="
    flex items-center gap-3
    px-4 py-3
    text-sm
    text-zinc-700
    hover:bg-orange-50
    transition-all
    "
> 
                                                    <ShieldIcon className="text-app-orange-dark" size={16} /> <span className="text-app-orange-dark">Admin Panel</span>{" "}
                                                </Link>
                                            )}
                                            {user && (
                                                <div className="border-t border-app-border pt-1">
                                                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-sm text-app-error hover:bg-red-50 w-full transition-colors">
                                                        <LogOutIcon size={16} /> Logout
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
