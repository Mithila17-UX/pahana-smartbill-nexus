
import React, { useState } from 'react';
import { Calculator, FileText, Download, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface Bill {
  id: string;
  billNumber: string;
  customerName: string;
  customerAccount: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'generated' | 'paid';
  date: string;
}

export const BillingSystem: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const [bills] = useState<Bill[]>([
    {
      id: '1',
      billNumber: 'PB-2024-001',
      customerName: 'Samantha Perera',
      customerAccount: 'ACC-001',
      items: [
        { name: 'The Alchemist', quantity: 2, price: 1250 },
        { name: 'Premium Notebook', quantity: 3, price: 450 }
      ],
      subtotal: 3850,
      tax: 385,
      total: 4235,
      status: 'paid',
      date: '2024-03-15'
    },
    {
      id: '2',
      billNumber: 'PB-2024-002',
      customerName: 'Kamal Silva',
      customerAccount: 'ACC-002',
      items: [
        { name: 'Data Structures & Algorithms', quantity: 1, price: 3200 }
      ],
      subtotal: 3200,
      tax: 320,
      total: 3520,
      status: 'generated',
      date: '2024-03-14'
    },
    {
      id: '3',
      billNumber: 'PB-2024-003',
      customerName: 'Priyanka Fernando',
      customerAccount: 'ACC-003',
      items: [
        { name: 'Harry Potter Collection', quantity: 1, price: 5500 },
        { name: 'The Alchemist', quantity: 1, price: 1250 }
      ],
      subtotal: 6750,
      tax: 675,
      total: 7425,
      status: 'draft',
      date: '2024-03-13'
    }
  ];

  const filteredBills = bills.filter(bill =>
    bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.customerAccount.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateBill = () => {
    toast({
      title: "Bill Created",
      description: "New bill has been successfully generated.",
    });
    setIsCreateDialogOpen(false);
  };

  const handleDownloadPDF = (billNumber: string) => {
    toast({
      title: "PDF Generated",
      description: `Bill ${billNumber} has been downloaded as PDF.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'generated': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-purple-600" />
              Billing System
            </CardTitle>
            <CardDescription>
              Generate and manage customer bills
            </CardDescription>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Bill
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Generate New Bill</DialogTitle>
                <DialogDescription>
                  Create a new bill for a customer with their purchased items.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Customer Account</label>
                    <Input placeholder="Select or enter account number" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Customer Name</label>
                    <Input placeholder="Customer name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Items</label>
                  <div className="border rounded p-4 space-y-3">
                    <div className="grid grid-cols-4 gap-2">
                      <Input placeholder="Item name" />
                      <Input type="number" placeholder="Qty" />
                      <Input type="number" placeholder="Price" />
                      <Button variant="outline" size="sm">Add</Button>
                    </div>
                    <div className="text-sm text-gray-600">
                      No items added yet. Add items using the form above.
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subtotal</label>
                    <Input value="Rs 0.00" readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tax (10%)</label>
                    <Input value="Rs 0.00" readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Total</label>
                    <Input value="Rs 0.00" readOnly className="font-bold" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateBill}>
                  Generate Bill
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search bills by customer name, bill number, or account..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Bills List */}
          <div className="space-y-3">
            {filteredBills.map((bill) => (
              <div key={bill.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                          {bill.billNumber}
                        </h3>
                        <Badge className={getStatusColor(bill.status)}>
                          {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600">
                          Rs {bill.total.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {bill.date}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Customer:</strong> {bill.customerName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Account:</strong> {bill.customerAccount}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Items:</strong> {bill.items.length} item(s)
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Subtotal:</strong> Rs {bill.subtotal.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Items:</p>
                      {bill.items.map((item, index) => (
                        <p key={index} className="text-sm text-gray-600 dark:text-gray-400">
                          • {item.name} (Qty: {item.quantity}) - Rs {(item.price * item.quantity).toLocaleString()}
                        </p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadPDF(bill.billNumber)}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBills.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No bills found matching your search.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
