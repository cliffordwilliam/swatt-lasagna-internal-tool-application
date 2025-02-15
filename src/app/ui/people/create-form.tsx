"use client";

import { createPeople, CreatePeopleState } from "@/app/lib/actions";
import { Alert, Button, Stack, TextField } from "@mui/material";
import { useActionState } from "react";

export default function Form({ cancelHref }: { cancelHref: string }) {
  const initialState: CreatePeopleState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    createPeople,
    initialState
  );

  return (
    <Stack component="form" action={formAction} noValidate gap={2}>
      {/* Name */}
      <TextField
        id="name"
        name="name"
        label="Name"
        error={!!state.errors?.name}
        helperText={state.errors?.name ? state.errors.name.join(", ") : ""}
      />

      {/* Address */}
      <TextField
        id="address"
        name="address"
        label="Address"
        error={!!state.errors?.address}
        helperText={
          state.errors?.address ? state.errors.address.join(", ") : ""
        }
      />

      {/* Phone num */}
      <TextField
        id="phoneNumber"
        name="phoneNumber"
        label="Phone number"
        error={!!state.errors?.phoneNumber}
        helperText={
          state.errors?.phoneNumber ? state.errors.phoneNumber.join(", ") : ""
        }
      />

      {/* Form message alert */}
      {state.message ? <Alert severity="error">{state.message}</Alert> : null}

      {/* Submit / cancel */}
      <Stack spacing={2} direction="row">
        <Button href={cancelHref} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" variant="contained" loading={isPending}>
          Create People
        </Button>
      </Stack>
    </Stack>
  );
}
