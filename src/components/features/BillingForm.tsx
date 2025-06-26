
import React, { useState } from 'react';
import { Calculator, FileText, Download, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Customer {
  id: string;
  accountNumber: string;
  name: string;
  unitsConsumed: number;
}

interface Item {
  id: string;
  code: string;
  name: string;
  price: number;
}

interface BillItem {
  item: Item;
  quantity: number;
}

export const BillingForm: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [unitsConsumed, setUnitsConsumed] = useState<number>(0);
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBill, setGeneratedBill] = useState<any>(null);
  const { toast } = useToast();

  // Mock data
  const customers: Customer[] = [
    { id: '1', accountNumber: 'ACC-001', name: 'Samantha Perera', unitsConsumed: 145 },
    { id: '2', accountNumber: 'ACC-002', name: 'Kamal Silva', unitsConsumed: 230 },
    { id: '3', accountNumber: 'ACC-003', name: 'Priyanka Fernando', unitsConsumed: 98 }
  ];

  const items: Item[] = [
    { id: '1', code: 'BOOK-001', name: 'The Alchemist', price: 1250 },
    { id: '2', code: 'BOOK-002', name: 'Data Structures & Algorithms', price: 3200 },
    { id: '3', code: 'STAT-001', name: 'Premium Notebook', price: 450 }
  ];

  const unitRate = 25; // Rs per unit

  const addBillItem = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const existingItem = billItems.find(bi => bi.item.id === itemId);
    if (existingItem) {
      setBillItems(prev => prev.map(bi => 
        bi.item.id === itemId ? { ...bi, quantity: bi.quantity + 1 } : bi
      ));
    } else {
      setBillItems(prev => [...prev, { item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setBillItems(prev => prev.filter(bi => bi.item.id !== itemId));
    } else {
      setBillItems(prev => prev.map(bi => 
        bi.item.id === itemId ? { ...bi, quantity } : bi
      ));
    }
  };

  const calculateTotal = () => {
    const itemsTotal = billItems.reduce((sum, bi) => sum + (bi.item.price * bi.quantity), 0);
    const unitsTotal = unitsConsumed * unitRate;
    return itemsTotal + unitsTotal;
  };

  const handleGenerateBill = async () => {
    if (!selectedCustomer) {
      toast({
        title: "Customer Required",
        description: "Please select a customer to generate bill.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate bill generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const bill = {
      billNumber: `BILL-${Date.now()}`,
      customer: selectedCustomer,
      date: new Date().toLocaleDateString(),
      items: billItems,
      unitsConsumed,
      unitRate,
      itemsTotal: billItems.reduce((sum, bi) => sum + (bi.item.price * bi.quantity), 0),
      unitsTotal: unitsConsumed * unitRate,
      total: calculateTotal()
    };

    setGeneratedBill(bill);
    setIsGenerating(false);
    
    toast({
      title: "Bill Generated",
      description: `Bill ${bill.billNumber} has been created successfully.`,
    });
  };

  const handleDownloadPDF = () => {
    // Mock PDF download
    toast({
      title: "PDF Downloaded",
      description: "Bill has been downloaded as PDF.",
    });
  };

  const resetForm = () => {
    setSelectedCustomer(null);
    setUnitsConsumed(0);
    setBillItems([]);
    setGeneratedBill(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-blue-600" />
            Generate Bill
          </CardTitle>
          <CardDescription>
            Create a new bill for customer purchases and unit consumption
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Customer Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Customer</label>
            <Select value={selectedCustomer?.id || ''} onValueChange={(value) => {
              const customer = customers.find(c => c.id === value);
              setSelectedCustomer(customer || null);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name} ({customer.accountNumber})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Units Consumed */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Units Consumed</label>
            <Input
              type="number"
              value={unitsConsumed}
              onChange={(e) => setUnitsConsumed(Number(e.target.value))}
              placeholder="Enter units consumed"
              min="0"
            />
            <p className="text-sm text-gray-600">
              Rate: Rs {unitRate} per unit
            </p>
          </div>

          {/* Items Selection */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Add Items</label>
              <Select onValueChange={addBillItem}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select an item to add" />
                </SelectTrigger>
                <SelectContent>
                  {items.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name} - Rs {item.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bill Items List */}
            {billItems.length > 0 && (
              <div className="border rounded-lg p-4 space-y-3">
                <h4 className="font-medium">Selected Items:</h4>
                {billItems.map((billItem) => (
                  <div key={billItem.item.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded">
                    <div>
                      <p className="font-medium">{billItem.item.name}</p>
                      <p className="text-sm text-gray-600">Rs {billItem.item.price} each</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(billItem.item.id, billItem.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{billItem.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(billItem.item.id, billItem.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <span className="ml-4 font-medium">
                        Rs {(billItem.item.price * billItem.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bill Summary */}
          {(unitsConsumed > 0 || billItems.length > 0) && (
            <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
              <h4 className="font-medium mb-3">Bill Summary:</h4>
              <div className="space-y-2 text-sm">
                {unitsConsumed > 0 && (
                  <div className="flex justify-between">
                    <span>Units ({unitsConsumed} × Rs {unitRate})</span>
                    <span>Rs {(unitsConsumed * unitRate).toLocaleString()}</span>
                  </div>
                )}
                {billItems.length > 0 && (
                  <div className="flex justify-between">
                    <span>Items Total</span>
                    <span>Rs {billItems.reduce((sum, bi) => sum + (bi.item.price * bi.quantity), 0).toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total Amount</span>
                  <span>Rs {calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button 
              onClick={handleGenerateBill} 
              disabled={isGenerating || !selectedCustomer}
              className="flex-1"
            >
              <FileText className="w-4 h-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate Bill"}
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Reset Form
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Bill Preview */}
      {generatedBill && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Bill Preview</CardTitle>
              <Button onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 p-6 border rounded-lg bg-white dark:bg-gray-900">
              <div className="text-center border-b pb-4">
                <h2 className="text-2xl font-bold">Pahana SmartBill</h2>
                <p className="text-gray-600">Professional Billing System</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Bill To:</h3>
                  <p>{generatedBill.customer.name}</p>
                  <p>Account: {generatedBill.customer.accountNumber}</p>
                </div>
                <div className="text-right">
                  <p><strong>Bill #:</strong> {generatedBill.billNumber}</p>
                  <p><strong>Date:</strong> {generatedBill.date}</p>
                </div>
              </div>

              <div className="space-y-2">
                {generatedBill.unitsConsumed > 0 && (
                  <div className="flex justify-between">
                    <span>Units Consumed: {generatedBill.unitsConsumed}</span>
                    <span>Rs {generatedBill.unitsTotal.toLocaleString()}</span>
                  </div>
                )}
                
                {generatedBill.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.item.name} × {item.quantity}</span>
                    <span>Rs {(item.item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total Amount:</span>
                  <span>Rs {generatedBill.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
