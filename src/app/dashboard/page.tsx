"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PinterestConnectButton } from "@/components/pinterest-connect-button";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Store, Trash2 } from "lucide-react";

export default function DashboardPage() {
  const [isPinterestConnected, setIsPinterestConnected] = useState(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [stores, setStores] = useState([
    { id: 1, name: "CraftyCorner", pinterestAccount: "craftycorner" },
    { id: 2, name: "VintageFinds", pinterestAccount: "vintagefinds2023" },
  ]);

  const [rules, setRules] = useState([
    {
      id: 1,
      store: "CraftyCorner",
      board: "Handmade Crafts",
      section: "Any",
      frequency: 6,
      timezone: "America/New_York",
      active: true,
    },
    {
      id: 2,
      store: "VintageFinds",
      board: "Retro Collectibles",
      section: "Kitchenware",
      frequency: 8,
      timezone: "America/Chicago",
      active: true,
    },
  ]);

  const timezones = [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "Europe/London",
    "Asia/Tokyo",
  ];

  useEffect(() => {
    const success = searchParams.get("success");
    const error = searchParams.get("error");

    if (success === "true") {
      setIsPinterestConnected(true);
      toast({
        title: "Success",
        description: "Successfully connected to Pinterest!",
      });
    } else if (error) {
      toast({
        title: "Error",
        description: "Failed to connect to Pinterest. Please try again.",
        variant: "destructive",
      });
    }
  }, [searchParams, toast]);

  const addStore = () => {
    const newStore = {
      id: stores.length + 1,
      name: "New Store",
      pinterestAccount: "",
    };
    setStores([...stores, newStore]);
  };

  const addRule = () => {
    const newRule = {
      id: rules.length + 1,
      store: "",
      board: "",
      section: "Any",
      frequency: 6,
      timezone: "America/New_York",
      active: true,
    };
    setRules([...rules, newRule]);
  };

  const handleConnectPinterest = () => {
    setIsPinterestConnected(true);
    toast({
      title: "Success",
      description: "Successfully connected to Pinterest!",
    });
  };

  if (!isPinterestConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <PinterestConnectButton onConnect={handleConnectPinterest} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Etsy to Pinterest Automator
          </h1>
          <Button variant="outline">User Menu</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stores and Pinterest Accounts Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Connected Stores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stores.map((store) => (
                <div
                  key={store.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center space-x-4">
                    <Store className="h-6 w-6" />
                    <div>
                      <p className="font-medium">{store.name}</p>
                      <p className="text-sm text-gray-500">
                        Pinterest: {store.pinterestAccount || "Not connected"}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              ))}
            </div>
            <Button onClick={addStore} className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Etsy Store
            </Button>
          </CardContent>
        </Card>

        {/* Automation Rules Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Automation Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <p className="font-medium">
                      {rule.store} → {rule.board}
                    </p>
                    <p className="text-sm text-gray-500">
                      Every {rule.frequency} hours | {rule.section} |{" "}
                      {rule.timezone}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Switch checked={rule.active} />
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Rule Form */}
            <form className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="store">Etsy Store</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select store" />
                    </SelectTrigger>
                    <SelectContent>
                      {stores.map((store) => (
                        <SelectItem key={store.id} value={store.name}>
                          {store.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="board">Pinterest Board</Label>
                  <Input id="board" placeholder="Enter board name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="section">Product Section</Label>
                  <Input id="section" placeholder="Any" />
                </div>
                <div>
                  <Label htmlFor="frequency">Frequency (hours)</Label>
                  <Input id="frequency" type="number" min="1" placeholder="6" />
                </div>
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addRule} className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Automation Rule
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
