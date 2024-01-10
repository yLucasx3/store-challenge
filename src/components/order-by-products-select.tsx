"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OrderByProductsSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Order by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Order by</SelectLabel>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="price">Price</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default OrderByProductsSelect;
