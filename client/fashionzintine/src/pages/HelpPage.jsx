import ContactForm from '../components/help/ContactForm.jsx'
import FAQAccordion from '../components/help/FAQAccordion.jsx'

export default function HelpPage() {
  return <><h1 className="page-title">How can we help?</h1><h2 className="section-heading">Common questions</h2><FAQAccordion /><h2 className="section-heading">Contact us</h2><ContactForm /></>
}