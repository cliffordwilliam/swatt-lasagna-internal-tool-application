export type State = {
  errors?: {
    shippingCost?: string[];
    totalPurchase?: string[];
  };
  message?: string | null;
};

export async function createOrder(prevState: State, formData: FormData) {
  console.log(formData.get("buyerId"));
  console.log(formData.get("recipientId"));
  console.log(formData.get("orderDate"));
  console.log(formData.get("deliveryDate"));
  console.log(formData.get("totalPurchase"));
  console.log(formData.get("pickupDeliveryId"));
  console.log(formData.get("shippingCost"));
  console.log(formData.get("grandTotal"));
  console.log(formData.get("paymentId"));
  console.log(formData.get("statusId"));
  console.log(formData.get("items[]"));
  console.log(formData.get("note"));
  return prevState;

  // //todo
  // // Validate form fields using Zod
  // const validatedFields = CreateInvoice.safeParse({
  //   customerId: formData.get('customerId'),
  //   amount: formData.get('amount'),
  //   status: formData.get('status'),
  // });

  // // If form validation fails, return errors early. Otherwise, continue.
  // if (!validatedFields.success) {
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //     message: 'Missing Fields. Failed to Create Invoice.',
  //   };
  // }

  // // Prepare data for insertion into the database
  // const { customerId, amount, status } = validatedFields.data;
  // const amountInCents = amount * 100;
  // const date = new Date().toISOString().split('T')[0];

  // // Insert data into the database
  // try {
  //   await sql`
  //     INSERT INTO invoices (customer_id, amount, status, date)
  //     VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  //   `;
  // } catch (error) {
  //   // If a database error occurs, return a more specific error.
  //   return {
  //     message: 'Database Error: Failed to Create Invoice.',
  //   };
  // }

  // // Revalidate the cache for the invoices page and redirect the user.
  // revalidatePath('/dashboard/invoices');
  // redirect('/dashboard/invoices');
}
