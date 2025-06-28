
import React from 'react';
import { X, User, FileText, Package, DollarSign, Settings, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Activity {
  id: string;
  type: 'user' | 'bill' | 'item' | 'payment' | 'system';
  title: string;
  description: string;
  user: string;
  timestamp: string;
  details: string;
}

interface ActivityFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity | null;
}

export const ActivityFeedModal: React.FC<ActivityFeedModalProps> = ({ 
  isOpen, 
  onClose, 
  activity 
}) => {
  const recentActivities: Activity[] = [
    {
      id: '1',
      type: 'bill',
      title: 'New Bill Generated',
      description: 'Bill PB-2024-004 created for customer ACC-001',
      user: 'Admin User',
      timestamp: '2 minutes ago',
      details: 'Generated bill for Samantha Perera with 12 items totaling Rs 4,235. Payment status: Pending. Due date: 2024-04-15.'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Received',
      description: 'Rs 3,200 payment processed for bill PB-2024-002',
      user: 'Employee',
      timestamp: '15 minutes ago',
      details: 'Payment received via bank transfer from Kamal Silva. Transaction ID: TXN-2024-1001. Bill status updated to Paid.'
    },
    {
      id: '3',
      type: 'user',
      title: 'New Customer Registered',
      description: 'Priyanka Fernando registered as a new customer',
      user: 'System',
      timestamp: '1 hour ago',
      details: 'Customer account ACC-004 created. Email: priyanka@email.com. Phone: +94 77 123 4567. Registration completed with email verification.'
    },
    {
      id: '4',
      type: 'item',
      title: 'Inventory Updated',
      description: 'Stock levels updated for 5 items',
      user: 'Employee',
      timestamp: '2 hours ago',
      details: 'Updated inventory: The Alchemist (+10 units), Premium Notebook (+25 units), Data Structures Book (+5 units), Harry Potter Collection (+3 units), Technical Manual (+8 units).'
    },
    {
      id: '5',
      type: 'system',
      title: 'System Backup Completed',
      description: 'Daily backup process completed successfully',
      user: 'System',
      timestamp: '3 hours ago',
      details: 'Automated backup completed at 03:00 AM. Database size: 2.3 GB. Files backed up: 1,247. Backup stored in secure cloud storage with encryption.'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return User;
      case 'bill': return FileText;
      case 'item': return Package;
      case 'payment': return DollarSign;
      default: return Settings;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user': return 'text-green-600';
      case 'bill': return 'text-blue-600';
      case 'item': return 'text-purple-600';
      case 'payment': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'user': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'bill': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'item': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'payment': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <Card className="h-full border-0 rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recent Activities
              </CardTitle>
              <CardDescription>
                System activities and user actions from the last 24 hours
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {activity ? (
              /* Detailed View of Selected Activity */
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700`}>
                    {React.createElement(getActivityIcon(activity.type), {
                      className: `w-6 h-6 ${getActivityColor(activity.type)}`
                    })}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {activity.title}
                      </h3>
                      <Badge className={getTypeColor(activity.type)}>
                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {activity.description}
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                      By {activity.user} • {activity.timestamp}
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Details
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.details}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Back to Activities
                  </Button>
                </div>
              </div>
            ) : (
              /* Activities List */
              <div className="space-y-4">
                {recentActivities.map((activityItem) => {
                  const IconComponent = getActivityIcon(activityItem.type);
                  return (
                    <div
                      key={activityItem.id}
                      className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                      onClick={() => {/* Could implement detailed view here */}}
                    >
                      <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700`}>
                        <IconComponent className={`w-5 h-5 ${getActivityColor(activityItem.type)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate">
                            {activityItem.title}
                          </h4>
                          <Badge className={getTypeColor(activityItem.type)}>
                            {activityItem.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {activityItem.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          By {activityItem.user} • {activityItem.timestamp}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
