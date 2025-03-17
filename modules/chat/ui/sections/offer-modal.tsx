"use client";

import { useState } from "react";
import { Offer } from "../../types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (offer: Offer) => void;
}

const OfferModal = ({ isOpen, onClose, onSubmit }: OfferModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !amount || !deliveryDays) {
      return;
    }
    
    const amountValue = parseFloat(amount);
    const daysValue = parseInt(deliveryDays);
    
    if (amountValue <= 0 || daysValue <= 0) {
      return;
    }
    
    const offer: Offer = {
      id: `offer-${Date.now()}`,
      title,
      description,
      amount: amountValue,
      currency: "US$",
      deliveryDays: daysValue,
    };
    
    onSubmit(offer);
    resetForm();
  };
  
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setAmount("");
    setDeliveryDays("");
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0 bg-white border-soft-200 rounded-3xl">
        <DialogHeader className="p-4 border-b border-soft-200">
          <div className="flex items-center justify-between w-full">
            <DialogTitle className="text-main-900 font-medium">Create an Offer</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8 rounded-full"
            >
              <X size={18} />
            </Button>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="I will migrate any website from one platform to another"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you'll deliver..."
              rows={3}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sub-600">
                  US$
                </span>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100"
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-sub-600">Minimum price: $1</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deliveryDays">Delivery Time (Days)</Label>
              <Input
                id="deliveryDays"
                type="number"
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                placeholder="7"
                required
              />
              <p className="text-xs text-sub-600">Minimum: 1 day</p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-soft-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-soft-200"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Send Offer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OfferModal; 