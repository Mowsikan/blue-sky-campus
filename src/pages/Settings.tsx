
import { useState } from "react";
import { Bell, Key, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  
  return (
    <div className="page-container">
      <h1 className="text-2xl font-bold mb-6 fade-in">Settings</h1>
      
      <div className="glass-card rounded-xl p-6 animate-fade-in">
        <Tabs defaultValue="profile" className="w-full">
          <div className="flex flex-col sm:flex-row">
            <TabsList className="mb-6 flex-shrink-0 sm:flex-col h-auto sm:h-auto sm:w-40 sm:justify-start sm:space-y-1 sm:space-x-0">
              <TabsTrigger value="profile" className="w-full justify-start px-3 py-2">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="account" className="w-full justify-start px-3 py-2">
                <Key className="h-4 w-4 mr-2" />
                Account
              </TabsTrigger>
              <TabsTrigger value="notifications" className="w-full justify-start px-3 py-2">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="appearance" className="w-full justify-start px-3 py-2">
                <Sun className="h-4 w-4 mr-2" />
                Appearance
              </TabsTrigger>
            </TabsList>
            
            <div className="flex-1 sm:pl-6">
              <TabsContent value="profile" className="mt-0 space-y-6">
                <div>
                  <h2 className="text-lg font-medium mb-2">Personal Information</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Update your personal details and profile picture
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-8">
                    <div className="flex-shrink-0 flex flex-col items-center gap-3">
                      <Avatar className="h-28 w-28">
                        <AvatarImage src="/placeholder.svg" alt="Profile" />
                        <AvatarFallback className="text-2xl">JD</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue="john.doe@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Write a short bio about yourself"
                          defaultValue="Administrator at Campus Management System"
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="account" className="mt-0 space-y-6">
                <div>
                  <h2 className="text-lg font-medium mb-2">Password</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Update your password to keep your account secure
                  </p>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm new password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Update Password</Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h2 className="text-lg font-medium mb-2">Two-Factor Authentication</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add an extra layer of security to your account
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Two-factor authentication</div>
                      <div className="text-sm text-muted-foreground">
                        Secure your account with 2FA
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0 space-y-6">
                <div>
                  <h2 className="text-lg font-medium mb-2">Notification Settings</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Control how you receive notifications
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Push Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive notifications in-app
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Announcement Alerts</div>
                        <div className="text-sm text-muted-foreground">
                          Get notified about new announcements
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Schedule Updates</div>
                        <div className="text-sm text-muted-foreground">
                          Get notified about schedule changes
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="appearance" className="mt-0 space-y-6">
                <div>
                  <h2 className="text-lg font-medium mb-2">Theme Settings</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Customize the appearance of the application
                  </p>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Theme Mode</Label>
                      <RadioGroup
                        defaultValue={theme}
                        onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="light" id="light" />
                          <Label htmlFor="light" className="flex items-center">
                            <Sun className="h-4 w-4 mr-2" />
                            Light
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="dark" id="dark" />
                          <Label htmlFor="dark" className="flex items-center">
                            <Moon className="h-4 w-4 mr-2" />
                            Dark
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="system" id="system" />
                          <Label htmlFor="system">System</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="font-size">Font Size</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Animations</div>
                        <div className="text-sm text-muted-foreground">
                          Enable animations and transitions
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
