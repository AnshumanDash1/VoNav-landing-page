const DEFAULT_CHECKOUT_URL =
  import.meta.env.VITE_STRIPE_CHECKOUT_URL ??
  "https://buy.stripe.com/test_9AQ8ynflpa9lc7GeUU";

export default function StripeCheckoutButton({
  label = "Buy Now",
  checkoutUrl,
}) {
  const targetUrl = checkoutUrl ?? DEFAULT_CHECKOUT_URL;

  const handleClick = () => {
    window.location.assign(targetUrl);
  };

  return (
    <button
      type="button"
      className="action-button action-button--primary"
      onClick={handleClick}
      aria-label={label}
    >
      {label}
    </button>
  );
}
