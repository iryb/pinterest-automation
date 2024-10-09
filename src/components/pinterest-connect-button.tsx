"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pin } from "lucide-react";

// const PINTEREST_APP_ID = process.env.NEXT_PUBLIC_PINTEREST_APP_ID;
// const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/pinterest/oauth/callback`;
interface PinterestConnectButtonProps {
  onConnect: () => void;
}

export function PinterestConnectButton({
  onConnect,
}: PinterestConnectButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    // const authUrl = `https://www.pinterest.com/oauth/?client_id=${PINTEREST_APP_ID}&redirect_uri=${encodeURIComponent(
    //   REDIRECT_URI
    // )}&response_type=code&scope=boards:read,pins:read`;
    // window.location.href = authUrl;
    setIsConnecting(false);
    // Simulate a connection delay
    setTimeout(() => {
      setIsConnecting(false);
      onConnect(); // Call the onConnect callback
    }, 2000); // 2 seconds delay to simulate the connection process
  };

  return (
    <Button onClick={handleConnect} disabled={isConnecting}>
      <Pin className="mr-2 h-4 w-4" />
      {isConnecting ? "Connecting..." : "Connect to Pinterest"}
    </Button>
  );
}
