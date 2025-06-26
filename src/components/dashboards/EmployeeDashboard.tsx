
import React, { useState } from 'react';
import { Users, Package, FileText, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomerManagement } from '../features/CustomerManagement';
import { ItemManagement } from '../features/ItemManagement';
import { BillingForm } from '../features/BillingForm';

export const EmployeeDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const todayStats = [
    { title: 'Bills Generated Today', value: '12', icon: FileText, color: 'text-blue-600' },
    { title: 'Customers Served', value: '8', icon: Users, color: 'text-green-600' },
    { title: 'Items Sold', value: '45', icon: Package, color: 'text-purple-600' },
    { title: 'Hours Worked', value: '6.5', icon: Clock, color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Employee Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Customer and inventory management</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Shift: 9:00 AM - 5:00 PM</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="new-bill">New Bill</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="items">Items</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Today's Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {todayStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
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
                  Generate Bill
                </CardTitle>
                <CardDescription>Create a new customer bill</CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('customers')}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Customer Service
                </CardTitle>
                <CardDescription>View and update customer info</CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('items')}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2 text-purple-600" />
                  Check Inventory
                </CardTitle>
                <CardDescription>View item availability</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Tasks</CardTitle>
              <CardDescription>Your recent activities and pending tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { task: 'Process customer payment', status: 'Completed', time: '10:30 AM' },
                  { task: 'Update inventory count', status: 'Completed', time: '11:15 AM' },
                  { task: 'Generate monthly bill for ACC-001', status: 'Pending', time: '2:00 PM' },
                  { task: 'Customer consultation call', status: 'Pending', time: '3:30 PM' }
                ].map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div>
                      <p className="text-sm font-medium">{task.task}</p>
                      <p className="text-xs text-gray-600">{task.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === 'Completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new-bill">
          <BillingForm />
        </TabsContent>

        <TabsContent value="customers">
          <CustomerManagement />
        </TabsContent>

        <TabsContent value="items">
          <ItemManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};
