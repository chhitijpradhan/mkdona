"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        setUserName(user.name || user.email);
      } catch {
        setUserName("");
      }
    }
  }, []);

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (!confirm) return;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <nav
      className="px-6 py-4 flex justify-between items-center border-b"
      style={{
        background: "rgba(10,10,20,0.8)",
        borderColor: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
      }}
    >
      <h1 className="text-xl font-bold text-white">📝 Notes</h1>

      <div className="flex items-center gap-4">
        {userName && (
          <span className="text-sm text-gray-400">
            👋 <span className="text-white font-medium">{userName}</span>
          </span>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-red-500/20 text-red-400"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;