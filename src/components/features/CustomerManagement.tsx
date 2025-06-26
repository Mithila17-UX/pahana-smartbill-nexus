
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Phone, Mail, MapPin } from 'lucide-react';
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

interface Customer {
  id: string;
  accountNumber: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  unitsConsumed: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

export const CustomerManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const [customers] = useState<Customer[]>([
    {
      id: '1',
      accountNumber: 'ACC-001',
      name: 'Samantha Perera',
      email: 'samantha@email.com',
      phone: '+94771234567',
      address: 'No. 123, Galle Road, Colombo 03',
      unitsConsumed: 145,
      status: 'active',
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      accountNumber: 'ACC-002',
      name: 'Kamal Silva',
      email: 'kamal@email.com',
      phone: '+94779876543',
      address: 'No. 456, Kandy Road, Colombo 07',
      unitsConsumed: 230,
      status: 'active',
      joinDate: '2024-02-10'
    },
    {
      id: '3',
      accountNumber: 'ACC-003',
      name: 'Priyanka Fernando',
      email: 'priyanka@email.com',
      phone: '+94771122334',
      address: 'No. 789, Negombo Road, Colombo 15',
      unitsConsumed: 98,
      status: 'inactive',
      joinDate: '2024-01-20'
    }
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = () => {
    toast({
      title: "Customer Added",
      description: "New customer has been successfully registered.",
    });
    setIsAddDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <Phone className="w-5 h-5 mr-2 text-blue-600" />
              Customer Management
            </CardTitle>
            <CardDescription>
              Manage customer accounts and information
            </CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Register New Customer</DialogTitle>
                <DialogDescription>
                  Add a new customer to the system with their account details.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Account Number</label>
                    <Input placeholder="ACC-004" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input placeholder="Customer Name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="customer@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input placeholder="+94771234567" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input placeholder="Complete Address" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Initial Units Consumed</label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCustomer}>
                  Register Customer
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
              placeholder="Search customers by name, account number, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Customer List */}
          <div className="space-y-3">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {customer.name}
                      </h3>
                      <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                        {customer.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <strong className="mr-2">Account:</strong> {customer.accountNumber}
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        {customer.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {customer.phone}
                      </div>
                    </div>
                    
                    <div className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                      {customer.address}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        <strong>Units Consumed:</strong> {customer.unitsConsumed}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        <strong>Joined:</strong> {customer.joinDate}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No customers found matching your search.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
