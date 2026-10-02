import Button from '../common/Button.jsx'

export default function ContactForm() {
  return <form className="form-stack" onSubmit={(event) => event.preventDefault()}><label>Email<input type="email" required /></label><label>How can we help?<textarea rows="5" required /></label><Button type="submit">Send inquiry</Button></form>
}