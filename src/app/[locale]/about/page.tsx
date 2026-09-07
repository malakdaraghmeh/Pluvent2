import React from 'react'
import About from './components/About'
import { generateDynamicMetadata } from '@/hooks/generateDynamicMetadata';

export async function generateMetadata({ params }) {
  const locale = params.locale || "en";

  return generateDynamicMetadata("/about", locale, {
    title: "About Us",
    description: "Learn more about us.",
  });
}

export default function Page() {

  return (
    <div>
      <About />
    </div>
  )
}
