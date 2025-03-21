"use client";

import { CreateOrderState, updateOrder } from "@/app/lib/actions";
import {
  ItemField,
  Order,
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
import dayjs from "dayjs";
import { useActionState, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import FormDialog from "../people/create-form-dialog";

export default function Form({
  order,
  peoples,
  items,
  pickupDeliveries,
  payments,
  statuses,
}: {
  order: Order;
  peoples: PeopleField[];
  items: ItemField[];
  pickupDeliveries: PickupDeliveryField[];
  payments: PaymentField[];
  statuses: OrderStatusField[];
}) {
  const initialState: CreateOrderState = { message: null, errors: {} };
  const updateInvoiceWithId = updateOrder.bind(null, order.id);
  const [state, formAction, isPending] = useActionState(
    updateInvoiceWithId,
    initialState
  );

  const [selectedItems, setSelectedItems] = useState(
    order.items.map((item) => ({
      id: item.itemId,
      quantity: item.quantity.toString(),
    }))
  );
  const [selectedBuyerId, setSelectedBuyerId] = useState(order.buyerId);
  const [selectedRecipientId, setSelectedRecipientId] = useState(
    order.recipientId
  );
  const [selectedPickupDeliveryId, setSelectedPickupDeliveryId] = useState(
    order.pickupDeliveryId
  );
  const [selectedPaymentId, setSelectedPaymentId] = useState(order.paymentId);
  const [selectedStatusId, setSelectedStatusId] = useState(order.orderStatusId);
  const [totalPurchase, setTotalPurchase] = useState(order.totalPurchase);
  const [shippingCost, setShippingCost] = useState(
    order.shippingCost.toString()
  );
  const [note, setNote] = useState(order.note);
  const [po, setPo] = useState(order.po);

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
      {/* Add people form dialog */}
      <FormDialog isInDialog={true} />

      {/* Buyer */}
      <Autocomplete
        options={peoples.map((option) => ({
          id: option.id,
          name: option.name,
        }))}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              label="Buyer"
              error={!!state.errors?.buyerId}
              helperText={
                state.errors?.buyerId ? state.errors.buyerId.join(", ") : ""
              }
            />
            <input type="hidden" name="buyerId" value={selectedBuyerId} />
          </>
        )}
        value={peoples.find((p) => p.id === selectedBuyerId) || null}
        onChange={(e, value) => setSelectedBuyerId(value?.id || "")}
      />

      {/* Recipient */}
      <Autocomplete
        options={peoples.map((option) => ({
          id: option.id,
          name: option.name,
        }))}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={peoples.find((p) => p.id === selectedRecipientId) || null}
        onChange={(e, value) => setSelectedRecipientId(value?.id || "")}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              label="Recipient"
              error={!!state.errors?.recipientId}
              helperText={
                state.errors?.recipientId
                  ? state.errors.recipientId.join(", ")
                  : ""
              }
            />
            <input
              type="hidden"
              name="recipientId"
              value={selectedRecipientId}
            />
          </>
        )}
      />

      {/* Order date */}
      <DatePicker
        value={dayjs(order.orderDate)}
        label="Order date"
        name="orderDate"
        slotProps={{
          textField: {
            error: !!state.errors?.orderDate,
            helperText: state.errors?.orderDate
              ? state.errors.orderDate.join(", ")
              : "",
          },
        }}
      />

      {/* Delivery date */}
      <DatePicker
        value={dayjs(order.deliveryDate)}
        label="Delivery date"
        name="deliveryDate"
        slotProps={{
          textField: {
            error: !!state.errors?.deliveryDate,
            helperText: state.errors?.deliveryDate
              ? state.errors.deliveryDate.join(", ")
              : "",
          },
        }}
      />

      {/* Pickup Delivery */}
      <Autocomplete
        options={pickupDeliveries.map((option) => ({
          id: option.id,
          name: option.name,
        }))}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(e, value) => setSelectedPickupDeliveryId(value?.id || "")}
        value={
          pickupDeliveries.find((p) => p.id === selectedPickupDeliveryId) ||
          null
        }
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              label="Pickup deliveries"
              error={!!state.errors?.pickupDeliveryId}
              helperText={
                state.errors?.pickupDeliveryId
                  ? state.errors.pickupDeliveryId.join(", ")
                  : ""
              }
            />
            <input
              type="hidden"
              name="pickupDeliveryId"
              value={selectedPickupDeliveryId}
            />
          </>
        )}
      />

      {/* Shipping cost */}
      <NumericFormat
        displayType="input"
        thousandSeparator="."
        decimalSeparator=","
        prefix="Rp "
        customInput={TextField}
        label="Shipping cost"
        error={!!state.errors?.shippingCost}
        helperText={
          state.errors?.shippingCost ? state.errors.shippingCost.join(", ") : ""
        }
        onChange={(e) => {
          const digitOnly = e.target.value.replace(/\D/g, "");
          setShippingCost(digitOnly || "");
        }}
        value={shippingCost}
        isAllowed={(values) =>
          values.value === "" || parseInt(values.value) > 0
        }
      />
      <input type="hidden" name="shippingCost" value={shippingCost} />

      {/* Payment */}
      <Autocomplete
        options={payments.map((option) => ({
          id: option.id,
          name: option.name,
        }))}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={payments.find((p) => p.id === selectedPaymentId) || null}
        onChange={(e, value) => setSelectedPaymentId(value?.id || "")}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              label="Payment"
              error={!!state.errors?.paymentId}
              helperText={
                state.errors?.paymentId ? state.errors.paymentId.join(", ") : ""
              }
            />
            <input type="hidden" name="paymentId" value={selectedPaymentId} />
          </>
        )}
      />

      {/* Status */}
      <Autocomplete
        options={statuses.map((option) => ({
          id: option.id,
          name: option.name,
        }))}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(e, value) => setSelectedStatusId(value?.id || "")}
        value={statuses.find((p) => p.id === selectedStatusId) || null}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              label="Status"
              error={!!state.errors?.statusId}
              helperText={
                state.errors?.statusId ? state.errors.statusId.join(", ") : ""
              }
            />
            <input type="hidden" name="statusId" value={selectedStatusId} />
          </>
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
        renderInput={(params) => (
          <TextField
            {...params}
            label="Item"
            error={!!state.errors?.items}
            helperText={
              state.errors?.items ? state.errors.items.join(", ") : ""
            }
          />
        )}
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
            name="items"
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
        error={!!state.errors?.totalPurchase}
        helperText={
          state.errors?.totalPurchase
            ? state.errors.totalPurchase.join(", ")
            : ""
        }
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
        error={!!state.errors?.grandTotal}
        helperText={
          state.errors?.grandTotal ? state.errors.grandTotal.join(", ") : ""
        }
      />
      <input
        type="hidden"
        name="grandTotal"
        value={totalPurchase + Number(shippingCost)}
      />

      {/* Po */}
      <TextField
        value={po}
        onChange={(e) => setPo(e.target.value)}
        id="po"
        name="po"
        label="Po"
        error={!!state.errors?.po}
        helperText={state.errors?.po ? state.errors.po.join(", ") : ""}
      />

      {/* Note */}
      <TextField
        value={note}
        onChange={(e) => setNote(e.target.value)}
        id="note"
        name="note"
        label="Note"
        multiline
        rows={4}
        error={!!state.errors?.note}
        helperText={state.errors?.note ? state.errors.note.join(", ") : ""}
      />

      {/* Form message alert */}
      {state.message ? <Alert severity="error">{state.message}</Alert> : null}

      {/* Submit / cancel */}
      <Stack spacing={2} direction="row">
        <Button href="/orders" variant="outlined">
          Cancel
        </Button>
        <Button type="submit" variant="contained" loading={isPending}>
          Update Order
        </Button>
      </Stack>
    </Stack>
  );
}
