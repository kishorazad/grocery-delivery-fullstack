import { ArrowUpRightIcon, LogOutIcon, MapPinIcon,ChevronDownIcon, MenuIcon, PackageIcon, SearchIcon, ShieldIcon, ShoppingCartIcon, UserIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

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
bg-white/95
backdrop-blur-md
border-b border-orange-100
shadow-sm
">
            <div className="
max-w-7xl
mx-auto
px-3 md:px-6 lg:px-8
flex items-center
justify-between
gap-3 md:gap-6
h-16 md:h-[72px]
">
                {/* Logo */}
                {/* Logo */}
<Link to="/" className="flex items-center shrink-0">
    <img
        src="/pillnow-logo.png"
        alt="PillNow"
      className="h-7 md:h-9 w-auto object-contain"
    />
</Link>

                <div className="flex-1 flex items-center gap-3 md:gap-6">
                    {/* Nav Links - Desktop */}
                    <div className="hidden md:flex items-center gap-6 text-sm text-zinc-600">
                        <Link to="/">Home</Link>
                        <Link to="/products">Products</Link>
                        <Link to="/deals" className="text-app-orange">
                            Deals
                        </Link>
                    </div>
                    {/* Search */}
                    {/* Search */}
{/* Search Section */}
<div className="flex-1 flex items-center justify-center">

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
        py-3
        text-sm
        outline-none
        bg-transparent
      "
      />

      <button
        type="submit"
        className="
        bg-orange-500
        px-4
        py-3
        text-white
      "
      >
        <SearchIcon className="size-4" />
      </button>
    </div>
  </form>

</div>
                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        {/* Cart */}
                        <button className="relative p-2 rounded-xl" onClick={() => setIsCartOpen(true)}>
                            <ShoppingCartIcon className="size-5 text-zinc-900" />
                            {cartCount > 0 && <span className="absolute -top-1 -right-1 size-4 bg-app-orange text-white text-[10px] rounded-full flex-center">{cartCount}</span>}
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
                                    <div className="size-7 rounded-full bg-green-950 text-white flex-center">{user.name.charAt(0).toUpperCase()}</div>
                                    <ChevronDownIcon className="size-3 text-zinc-500" />
                                </button>
                            ) : (
                                <div className="flex-center gap-2">
                                    <Link to="/login" className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-950 rounded-full hover:bg-green-950-light transition-colors">
                                        <UserIcon size={16} /> Sign In
                                    </Link>
                                    {userMenuOpen ? <XIcon className="md:hidden" onClick={() => setUserMenuOpen(!userMenuOpen)} /> : <MenuIcon className="md:hidden size-5 text-zinc-700" onClick={() => setUserMenuOpen(!userMenuOpen)} />}
                                </div>
                            )}

                            {userMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                                    <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-xl shadow-lg border border-app-border py-2 z-50 animate-fade-in">
                                        {user && (
                                            <div className="px-4 py-2 border-b border-app-border">
                                                <p className="text-sm font-medium text-zinc-900">{user?.name}</p>
                                                <p className="text-xs text-zinc-500">{user?.email}</p>
                                            </div>
                                        )}
                                        <div onClick={() => setUserMenuOpen(false)}>
                                            {!user && (
                                                <Link to="/login" className="dropdown-link">
                                                    <UserIcon size={16} /> Sign In{" "}
                                                </Link>
                                            )}

                                            {user && (
                                                <Link to="/orders" className="dropdown-link">
                                                    <PackageIcon size={16} /> My Orders{" "}
                                                </Link>
                                            )}

                                            {user && (
                                                <Link to="/addresses" className="dropdown-link">
                                                    <MapPinIcon size={16} /> Addresses{" "}
                                                </Link>
                                            )}

                                            <Link to="/products" className="dropdown-link md:hidden">
                                                <ArrowUpRightIcon size={16} /> Products{" "}
                                            </Link>

                                            <Link to="/deals" className="dropdown-link md:hidden">
                                                <ArrowUpRightIcon size={16} /> Deals{" "}
                                            </Link>
                                            {user?.isAdmin && (
                                                <Link to="/admin/products" className="dropdown-link">
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
