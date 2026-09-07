import React from 'react'
import ContactUs from './components/ContactUs'
import { generateDynamicMetadata } from '@/hooks/generateDynamicMetadata';


export async function generateMetadata({ params }) {
  const locale = params.locale || "en";

  return generateDynamicMetadata("/contact", locale, {
    title: "Contact Us",
    description: "Learn more Contact us.",
  });
}

export default function Page() {
  return (
    <div>
      <ContactUs />
    </div>
  )
}
