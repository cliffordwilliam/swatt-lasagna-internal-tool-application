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
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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
    { id: string; quantity: number }[]
  >([]);
  const [totalPurchase, setTotalPurchase] = useState(0);
  const [shippingCost, setShippingCost] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const total = selectedItems.reduce((sum, selectedItem) => {
      const item = items.find((i) => i.id === selectedItem.id);
      return sum + (item ? item.price * selectedItem.quantity : 0);
    }, 0);
    setTotalPurchase(total);
  }, [selectedItems, items]);

  const handleItemChange = (value: string) => {
    const itemId = value;
    if (!selectedItems.find((item) => item.id === itemId)) {
      setSelectedItems([...selectedItems, { id: itemId, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (id: string, quantity: string) => {
    const quantityOnlyDigit = quantity.replace(/\D/g, "");
    setSelectedItems(
      selectedItems.map((item) =>
        item.id === id ? { ...item, quantity: Number(quantityOnlyDigit) } : item
      )
    );
  };

  const handleDeleteItem = (id: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  return (
    <Box
      component="form"
      action={formAction}
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 2,
      }}
    >
      {/* Buyer */}
      <Autocomplete
        disablePortal
        options={peoples}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} label="Buyer" />}
        onChange={(event, newValue) => {
          if (newValue) {
            const input = document.getElementById(
              "buyerId"
            ) as HTMLInputElement;
            if (input) input.value = newValue.id;
          }
        }}
      />
      <input type="hidden" name="buyerId" id="buyerId" value={peoples[0]?.id} />

      {/* Recipient */}
      <Autocomplete
        disablePortal
        options={peoples}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} label="Recipient" />}
        onChange={(event, newValue) => {
          if (newValue) {
            const input = document.getElementById(
              "recipientId"
            ) as HTMLInputElement;
            if (input) input.value = newValue.id;
          }
        }}
      />
      <input
        type="hidden"
        name="recipientId"
        id="recipientId"
        value={peoples[0]?.id}
      />

      {/* Order date */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker label="Order date" name="orderDate" />
        </DemoContainer>
      </LocalizationProvider>

      {/* Delivery date */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker label="Delivery date" name="deliveryDate" />
        </DemoContainer>
      </LocalizationProvider>

      {/* Pickup delivery */}
      <Autocomplete
        disablePortal
        options={pickupDeliveries}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField {...params} label="Pickup deliveries" />
        )}
        onChange={(event, newValue) => {
          if (newValue) {
            const input = document.getElementById(
              "pickupDeliveryId"
            ) as HTMLInputElement;
            if (input) input.value = newValue.id;
          }
        }}
      />
      <input
        type="hidden"
        name="pickupDeliveryId"
        id="pickupDeliveryId"
        value={pickupDeliveries[0]?.id}
      />

      {/* Shipping cost */}
      <TextField
        // Type number is bugged, so use text but regex str nums only
        id="shippingCost"
        label="Shipping cost"
        name="shippingCost"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        error={!!state.errors?.shippingCost}
        helperText={state.errors?.shippingCost?.[0]}
        onChange={(e) => {
          const digitOnly = e.target.value.replace(/\D/g, "");
          setShippingCost(digitOnly || "");
        }}
        value={shippingCost}
      />

      {/* Payment */}
      <Autocomplete
        disablePortal
        options={payments}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} label="Payment" />}
        onChange={(event, newValue) => {
          if (newValue) {
            const input = document.getElementById(
              "paymentId"
            ) as HTMLInputElement;
            if (input) input.value = newValue.id;
          }
        }}
      />
      <input
        type="hidden"
        name="paymentId"
        id="paymentId"
        value={payments[0]?.id}
      />

      {/* Status */}
      <Autocomplete
        disablePortal
        options={statuses}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => <TextField {...params} label="Status" />}
        onChange={(event, newValue) => {
          if (newValue) {
            const input = document.getElementById(
              "statusId"
            ) as HTMLInputElement;
            if (input) input.value = newValue.id;
          }
        }}
      />
      <input
        type="hidden"
        name="statusId"
        id="statusId"
        value={statuses[0]?.id}
      />

      {/* Item Selection */}
      <Autocomplete
        disablePortal
        options={items}
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
          <TextField
            label="Quantity"
            type="number"
            value={selectedItem.quantity}
            onChange={(e) =>
              handleQuantityChange(selectedItem.id, e.target.value)
            }
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
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
      <input type="hidden" name="totalPurchase" value={totalPurchase} />

      {/* Grand Total */}
      <NumericFormat
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
      <input
        type="hidden"
        name="grandTotal"
        value={totalPurchase + Number(shippingCost)}
      />

      {/* Note */}
      <TextField
        value={note}
        onChange={(e) => setNote(e.target.value)}
        id="Note"
        name="note"
        label="Note"
        multiline
        rows={4}
      />

      {/* Form message alert */}
      {state.message ? <Alert severity="error">{state.message}</Alert> : null}

      <Stack spacing={2} direction="row">
        <Button href="/orders" variant="outlined">
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Create Invoice
        </Button>
      </Stack>
    </Box>
  );
}
