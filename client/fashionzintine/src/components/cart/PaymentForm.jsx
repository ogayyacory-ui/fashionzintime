import Button from '../common/Button.jsx'

export default function PaymentForm() {
  return <form className="form-stack" onSubmit={(event) => event.preventDefault()}><label>Name on card<input autoComplete="cc-name" required /></label><label>Card details<input inputMode="numeric" autoComplete="cc-number" placeholder="Card integration required" disabled /></label><Button disabled>Payment integration required</Button></form>
}