// components/InactivityLogout.tsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const INACTIVITY_LIMIT = 15* 60 * 1000; // 15 minutes in milliseconds

const InactivityLogout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/login");
    }, INACTIVITY_LIMIT);
  };

  const checkTokenExpiry = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    checkTokenExpiry();
    resetTimer();

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    for (const event of events) {
      window.addEventListener(event, resetTimer);
    }

    return () => {
      for (const event of events) {
        window.removeEventListener(event, resetTimer);
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [navigate]);

  return <>{children}</>;
};

export default InactivityLogout;
