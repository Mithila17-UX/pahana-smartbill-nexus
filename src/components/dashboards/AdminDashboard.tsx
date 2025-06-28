
import React, { useState } from 'react';
import { Users, Package, FileText, BarChart3, Settings, DollarSign, TrendingUp, ShoppingCart, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CustomerManagement } from '../features/CustomerManagement';
import { ItemManagement } from '../features/ItemManagement';
import { BillingSystem } from '../features/BillingSystem';
import { BillingForm } from '../features/BillingForm';
import { ReportsSection } from '../features/ReportsSection';
import { ActivityFeedModal } from '../ActivityFeedModal';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  const stats = [
    { title: 'Total Customers', value: '1,234', icon: Users, color: 'text-blue-600', change: '+12%' },
    { title: 'Active Items', value: '456', icon: Package, color: 'text-green-600', change: '+5%' },
    { title: 'Monthly Revenue', value: 'Rs 2,45,000', icon: DollarSign, color: 'text-purple-600', change: '+18%' },
    { title: 'Bills Generated', value: '89', icon: FileText, color: 'text-orange-600', change: '+23%' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Complete system management and oversight</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Last updated: {new Date().toLocaleString()}</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="billing">Bills</TabsTrigger>
          <TabsTrigger value="new-bill">New Bill</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('new-bill')}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Generate New Bill
                </CardTitle>
                <CardDescription>Create bills for customer purchases</CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('customers')}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Manage Customers
                </CardTitle>
                <CardDescription>Add and edit customer information</CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('items')}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2 text-purple-600" />
                  Manage Inventory
                </CardTitle>
                <CardDescription>Update items and pricing</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system activities and transactions</CardDescription>
                </div>
                <Button onClick={() => setIsActivityModalOpen(true)}>
                  <Clock className="w-4 h-4 mr-2" />
                  View All Activities
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'New bill generated', user: 'Admin', time: '2 minutes ago', icon: FileText },
                  { action: 'Customer added', user: 'Employee', time: '15 minutes ago', icon: Users },
                  { action: 'Item updated', user: 'Admin', time: '1 hour ago', icon: Package },
                  { action: 'Report generated', user: 'Admin', time: '2 hours ago', icon: BarChart3 }
                ].map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => setIsActivityModalOpen(true)}
                  >
                    <activity.icon className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-600">by {activity.user}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <CustomerManagement />
        </TabsContent>

        <TabsContent value="items">
          <ItemManagement />
        </TabsContent>

        <TabsContent value="billing">
          <BillingSystem />
        </TabsContent>

        <TabsContent value="new-bill">
          <BillingForm />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsSection />
        </TabsContent>
      </Tabs>

      {/* Activity Feed Modal */}
      <ActivityFeedModal 
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        activity={null}
      />
    </div>
  );
};
