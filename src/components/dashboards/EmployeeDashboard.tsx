
import React, { useState } from 'react';
import { Users, ShoppingCart, FileText, Package } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomerManagement } from '../features/CustomerManagement';
import { ItemManagement } from '../features/ItemManagement';
import { BillingSystem } from '../features/BillingSystem';

export const EmployeeDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('customers');

  const quickStats = [
    {
      title: 'Customers Served Today',
      value: '24',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Bills Generated',
      value: '18',
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      title: 'Items Updated',
      value: '7',
      icon: Package,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Employee Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customer service and billing operations
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customers">Customer Management</TabsTrigger>
          <TabsTrigger value="items">Item Management</TabsTrigger>
          <TabsTrigger value="billing">Bill Generation</TabsTrigger>
        </TabsList>

        <TabsContent value="customers">
          <CustomerManagement />
        </TabsContent>

        <TabsContent value="items">
          <ItemManagement />
        </TabsContent>

        <TabsContent value="billing">
          <BillingSystem />
        </TabsContent>
      </Tabs>
    </div>
  );
};
