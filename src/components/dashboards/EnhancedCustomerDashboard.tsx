
import React, { useState } from 'react';
import { FileText, Download, Eye, Search, Filter, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Bill {
  id: string;
  billNumber: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Cancelled';
  items: number;
  description: string;
}

export const EnhancedCustomerDashboard: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const allBills: Bill[] = [
    {
      id: '1',
      billNumber: 'PB-2024-001',
      date: '2024-03-15',
      amount: 2450,
      status: 'Paid',
      items: 12,
      description: 'Monthly utility bill'
    },
    {
      id: '2',
      billNumber: 'PB-2024-002',
      date: '2024-03-10',
      amount: 3200,
      status: 'Pending',
      items: 18,
      description: 'Product purchase'
    },
    {
      id: '3',
      billNumber: 'PB-2024-003',
      date: '2024-02-28',
      amount: 1890,
      status: 'Paid',
      items: 8,
      description: 'Service charges'
    },
    {
      id: '4',
      billNumber: 'PB-2024-004',
      date: '2024-02-15',
      amount: 5400,
      status: 'Overdue',
      items: 25,
      description: 'Equipment rental'
    },
    {
      id: '5',
      billNumber: 'PB-2024-005',
      date: '2024-01-30',
      amount: 890,
      status: 'Cancelled',
      items: 3,
      description: 'Cancelled order'
    }
  ];

  const accountSummary = {
    totalSpent: allBills.filter(b => b.status === 'Paid').reduce((sum, b) => sum + b.amount, 0),
    pendingAmount: allBills.filter(b => b.status === 'Pending' || b.status === 'Overdue').reduce((sum, b) => sum + b.amount, 0),
    totalOrders: allBills.length,
    lastPayment: '2024-03-15'
  };

  // Filter and sort bills
  const filteredBills = allBills
    .filter(bill => {
      const matchesSearch = bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bill.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || bill.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = a.billNumber.localeCompare(b.billNumber);
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

  const handleDownloadBill = (billNumber: string) => {
    toast({
      title: "Download Started",
      description: `Bill ${billNumber} is being downloaded as PDF.`,
    });
  };

  const handleViewBill = (billNumber: string) => {
    toast({
      title: "Opening Bill",
      description: `Viewing details for bill ${billNumber}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Cancelled': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View your billing history and account details
          </p>
        </div>
      </div>

      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              Rs {accountSummary.totalSpent.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Pending Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              Rs {accountSummary.pendingAmount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Bills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {accountSummary.totalOrders}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Last Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {accountSummary.lastPayment}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bills Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Bill History
          </CardTitle>
          <CardDescription>
            View and manage your billing history with advanced filtering
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bills by number or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>
            </div>
          </div>

          {/* Bills List */}
          <div className="space-y-4">
            {filteredBills.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No bills found matching your criteria</p>
              </div>
            ) : (
              filteredBills.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {bill.billNumber}
                        </p>
                        <Badge className={getStatusColor(bill.status)}>
                          {bill.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {bill.description}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {bill.date} • {bill.items} items
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Rs {bill.amount.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewBill(bill.billNumber)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadBill(bill.billNumber)}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {filteredBills.length > 0 && (
            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredBills.length} of {allBills.length} bills
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
