"use client";

import { createOrder, State } from "@/app/lib/actions";
import {
  ItemField,
  OrderStatusField,
  PaymentField,
  PeopleField,
  PickupDeliveryField,
} from "@/app/lib/definitions";
import { Delete } from "@mui/icons-material";
import {
  Alert,
  Autocomplete,
  Button,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useActionState, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

export default function Form({
  peoples,
  items,
  pickupDeliveries,
  payments,
  statuses,
}: {
  peoples: PeopleField[];
  items: ItemField[];
  pickupDeliveries: PickupDeliveryField[];
  payments: PaymentField[];
  statuses: OrderStatusField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createOrder, initialState);
  const [selectedItems, setSelectedItems] = useState<
    { id: string; quantity: string }[]
  >([]);
  const [totalPurchase, setTotalPurchase] = useState(0);
  const [shippingCost, setShippingCost] = useState("");

  useEffect(() => {
    const total = selectedItems.reduce((sum, selectedItem) => {
      const item = items.find((i) => i.id === selectedItem.id);
      return sum + (item ? item.price * Number(selectedItem.quantity) : 0);
    }, 0);
    setTotalPurchase(total);
  }, [selectedItems, items]);

  const handleItemChange = (value: string) => {
    const itemId = value;
    if (!selectedItems.find((item) => item.id === itemId)) {
      setSelectedItems([...selectedItems, { id: itemId, quantity: "" }]);
    }
  };

  const handleQuantityChange = (id: string, quantity: string) => {
    const quantityOnlyDigit = quantity.replace(/\D/g, "");
    setSelectedItems(
      selectedItems.map((item) =>
        item.id === id ? { ...item, quantity: quantityOnlyDigit || "" } : item
      )
    );
  };

  const handleDeleteItem = (id: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  return (
    <Stack component="form" action={formAction} noValidate gap={2}>
      {/* Buyer */}
      <Autocomplete
        options={peoples}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField {...params} name="buyerId" label="Buyer" />
        )}
      />

      {/* Recipient */}
      <Autocomplete
        options={peoples}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField {...params} name="recipientId" label="Recipient" />
        )}
      />

      {/* Order date */}
      <DatePicker label="Order date" name="orderDate" />

      {/* Delivery date */}
      <DatePicker label="Delivery date" name="deliveryDate" />

      {/* Pickup delivery */}
      <Autocomplete
        options={pickupDeliveries}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            name="pickupDeliveryId"
            label="Pickup deliveries"
          />
        )}
      />

      {/* Shipping cost */}
      <NumericFormat
        name="shippingCost"
        displayType="input"
        thousandSeparator="."
        decimalSeparator=","
        prefix="Rp "
        customInput={TextField}
        label="Shipping cost"
        error={!!state.errors?.shippingCost}
        helperText={state.errors?.shippingCost?.[0]}
        onChange={(e) => {
          const digitOnly = e.target.value.replace(/\D/g, "");
          setShippingCost(digitOnly || "");
        }}
        isAllowed={(values) =>
          values.value === "" || parseInt(values.value) > 0
        }
      />

      {/* Payment */}
      <Autocomplete
        options={payments}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField {...params} name="paymentId" label="Payment" />
        )}
      />

      {/* Status */}
      <Autocomplete
        options={statuses}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField {...params} name="statusId" label="Status" />
        )}
      />

      {/* Item Selection */}
      <Autocomplete
        options={items.sort((a, b) =>
          a.name.split(" ")[0].localeCompare(b.name.split(" ")[0])
        )}
        groupBy={(option) => option.name.split(" ")[0]}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} label="Item" />}
        onChange={(event, newValue) => {
          if (newValue) {
            handleItemChange(newValue.id);
          }
        }}
      />

      {/* Selected Items */}
      {selectedItems.map((selectedItem, index) => (
        <Stack key={index} spacing={2} direction="row">
          <TextField
            label="Item"
            value={
              items.find((item) => item.id === selectedItem.id)?.name || ""
            }
            disabled
          />
          <NumericFormat
            value={selectedItem.quantity}
            customInput={TextField}
            label="Quantity"
            allowNegative={false}
            thousandSeparator="."
            decimalSeparator=","
            isAllowed={(values) =>
              values.value === "" || parseInt(values.value) > 0
            }
            onValueChange={(values) =>
              handleQuantityChange(selectedItem.id, values.value)
            }
          />
          <input
            type="hidden"
            name="items[]"
            value={`${JSON.stringify(selectedItems)}`}
          />
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => handleDeleteItem(selectedItem.id)}
          >
            <Delete color="warning" fontSize="inherit" />
          </IconButton>
        </Stack>
      ))}

      {/* Total Purchase */}
      <NumericFormat
        name="totalPurchase"
        value={totalPurchase}
        displayType="input"
        thousandSeparator="."
        decimalSeparator=","
        prefix="Rp "
        customInput={TextField}
        label="Total purchase"
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
      />

      {/* Grand Total */}
      <NumericFormat
        name="grandTotal"
        value={totalPurchase + Number(shippingCost)}
        displayType="input"
        thousandSeparator="."
        decimalSeparator=","
        prefix="Rp "
        customInput={TextField}
        label="Grand total"
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
      />

      {/* Note */}
      <TextField id="Note" name="note" label="Note" multiline rows={4} />

      {/* Form message alert */}
      {state.message ? <Alert severity="error">{state.message}</Alert> : null}

      {/* Submit / cancel */}
      <Stack spacing={2} direction="row">
        <Button href="/orders" variant="outlined">
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Create Invoice
        </Button>
      </Stack>
    </Stack>
  );
}
