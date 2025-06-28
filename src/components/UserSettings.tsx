
import React, { useState } from 'react';
import { Settings, Sun, Moon, Globe, Bell, Lock, Trash2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from './ThemeProvider';
import { useToast } from '@/hooks/use-toast';

interface UserSettingsProps {
  onBack: () => void;
}

export const UserSettings: React.FC<UserSettingsProps> = ({ onBack }) => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: theme === 'dark',
    language: 'en',
    fontSize: 'medium',
    highContrast: false,
    soundEnabled: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [deleteAccountData, setDeleteAccountData] = useState({
    password: '',
    otp: '',
    confirmation: ''
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    if (key === 'darkMode') {
      toggleTheme();
    }
    
    toast({
      title: "Setting Updated",
      description: "Your preference has been saved.",
    });
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation don't match.",
        variant: "destructive",
      });
      return;
    }

    // Mock password change
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
    
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleDeleteAccount = async () => {
    if (deleteAccountData.confirmation !== 'DELETE') {
      toast({
        title: "Confirmation Required",
        description: "Please type 'DELETE' to confirm account deletion.",
        variant: "destructive",
      });
      return;
    }

    // Mock account deletion
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Account Deletion Requested",
      description: "Your account deletion request has been submitted for review.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Theme & Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sun className="w-5 h-5 mr-2" />
              Theme & Display
            </CardTitle>
            <CardDescription>
              Customize your visual experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Dark Mode</label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Switch between light and dark themes
                </p>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Font Size</label>
              <Select
                value={settings.fontSize}
                onValueChange={(value) => handleSettingChange('fontSize', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="extra-large">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">High Contrast</label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Enhance contrast for better visibility
                </p>
              </div>
              <Switch
                checked={settings.highContrast}
                onCheckedChange={(checked) => handleSettingChange('highContrast', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </CardTitle>
            <CardDescription>
              Manage your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Email Notifications</label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Push Notifications</label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Receive browser notifications
                </p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Sound Alerts</label>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Play sounds for notifications
                </p>
              </div>
              <Switch
                checked={settings.soundEnabled}
                onCheckedChange={(checked) => handleSettingChange('soundEnabled', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Language & Region
            </CardTitle>
            <CardDescription>
              Set your language and regional preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <Select
                value={settings.language}
                onValueChange={(value) => handleSettingChange('language', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="si">Sinhala</SelectItem>
                  <SelectItem value="ta">Tamil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Security
            </CardTitle>
            <CardDescription>
              Manage your account security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Password</label>
                <div className="relative">
                  <Input
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                  >
                    {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <div className="relative">
                  <Input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Enter new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                  >
                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm New Password</label>
                <div className="relative">
                  <Input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirm new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                  >
                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button onClick={handlePasswordChange} className="w-full">
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="lg:col-span-2 border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <Trash2 className="w-5 h-5 mr-2" />
              Danger Zone
            </CardTitle>
            <CardDescription>
              Irreversible and destructive actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                Delete Account
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  type="password"
                  placeholder="Current password"
                  value={deleteAccountData.password}
                  onChange={(e) => setDeleteAccountData(prev => ({ ...prev, password: e.target.value }))}
                />
                <Input
                  placeholder="OTP (if required)"
                  value={deleteAccountData.otp}
                  onChange={(e) => setDeleteAccountData(prev => ({ ...prev, otp: e.target.value }))}
                />
                <Input
                  placeholder="Type 'DELETE'"
                  value={deleteAccountData.confirmation}
                  onChange={(e) => setDeleteAccountData(prev => ({ ...prev, confirmation: e.target.value }))}
                />
              </div>
              
              <Button 
                variant="destructive" 
                onClick={handleDeleteAccount}
                className="mt-3"
                disabled={!deleteAccountData.password || deleteAccountData.confirmation !== 'DELETE'}
              >
                Delete My Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
