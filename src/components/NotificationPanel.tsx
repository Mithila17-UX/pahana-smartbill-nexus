
import React, { useState } from 'react';
import { Bell, X, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Bill Generated',
      message: 'Bill PB-2024-004 has been generated for customer ACC-001',
      type: 'success',
      timestamp: '2 minutes ago',
      read: false
    },
    {
      id: '2',
      title: 'Payment Received',
      message: 'Payment of Rs 3,200 received from Kamal Silva',
      type: 'success',
      timestamp: '15 minutes ago',
      read: false
    },
    {
      id: '3',
      title: 'Low Inventory Alert',
      message: 'The Alchemist book is running low in stock (5 remaining)',
      type: 'warning',
      timestamp: '1 hour ago',
      read: true
    },
    {
      id: '4',
      title: 'System Update',
      message: 'Pahana SmartBill has been updated to version 2.1.0',
      type: 'info',
      timestamp: '2 hours ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "You're all caught up!",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md h-full shadow-lg overflow-hidden">
        <Card className="h-full rounded-none border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            <div className="space-y-2 mb-4">
              {unreadCount > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="w-full"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark all as read
                </Button>
              )}
            </div>
            
            <div className="space-y-3">
              {notifications.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      notification.read 
                        ? 'bg-gray-50 dark:bg-gray-700 opacity-75' 
                        : 'bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700'
                    }`}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                        {notification.title}
                      </h4>
                      <div className="flex items-center space-x-1">
                        <Badge className={getTypeColor(notification.type)}>
                          {notification.type}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="p-1 h-auto"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {notification.timestamp}
                    </p>
                    {!notification.read && (
                      <div className="absolute left-2 top-4 w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
