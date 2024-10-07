export function createSuccessCheckoutURL(
  paymentType: "express" | "card",
  pricePaid: number,
  currency: string,
  planID: string
) {
  // this is a redirect url after the successful payment
  const redirectUrl = new URL(window.location.href);
  redirectUrl.searchParams.delete("checkout");
  redirectUrl.pathname = "/success-checkout";

  redirectUrl.searchParams.set("paymentType", paymentType);
  redirectUrl.searchParams.set("pricePaid", pricePaid.toString());
  redirectUrl.searchParams.set("currency", currency);
  redirectUrl.searchParams.set("planID", planID);

  return redirectUrl;
}
