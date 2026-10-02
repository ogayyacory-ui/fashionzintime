const questions = [
  ['How long does shipping take?', 'Orders usually arrive within 3 to 5 business days.'],
  ['Can I return an item?', 'Unworn pieces can be returned within 30 days of delivery.'],
  ['How should I care for my pieces?', 'Follow the care label on each garment; delicate fabrics are best hand washed or dry cleaned.'],
]

export default function FAQAccordion() {
  return <div>{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
}