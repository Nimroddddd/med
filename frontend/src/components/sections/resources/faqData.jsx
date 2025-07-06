import { Link } from "react-router-dom";
export const faqs = [
  {
    question: 'What is the difference between psychiatry & therapy? Do I need both?',
    answer: (<> 
                <p>Psychiatrists are medical professionals who manage mental health 
                  disorders using medication, as they have specialized training in 
                  psychopharmacology. In addition, nurse practitioners and physician 
                  assistants are also equipped to diagnose mental health issues and 
                  prescribe appropriate medications.
                  <br /><br />
                  On the other hand, psychotherapists primarily offer talk-based therapy 
                  and generally do not have the authority to prescribe medications. They 
                  are trained in various therapeutic approaches, such as cognitive behavioral 
                  therapy, hypnosis, and others. For more information on different treatment 
                  approaches, refer to the <span><Link to="/therapy-methods" className="text-blue-600 hover:text-blue-800 underline">
                  Treatments Section,</Link></span> and explore our Therapists section to find someone who suits your needs.
                  Research shows that the most effective mental health care often involves a combination 
                  of medication and psychotherapy.</p>
                </>)
  },
  {
    question: 'How soon can I be seen?',
    answer: `We are currently welcoming new patients, and in most cases, appointments for psychiatric or therapy services are available within a week.`
  },
  {
    question: 'Do you accept insurance?',
    answer: (<>
              <p>Healthwise works with most private insurance providers. 
              We suggest reviewing your insurance benefits before your initial appointment so you’re 
              aware of your co-pay, deductible, any required pre-authorizations, and the number of 
              covered visits. For more details, feel free to reach out through
              our <span><Link to="/contact" className="text-blue-600 hover:text-blue-800 underline">Contact page</Link></span> or 
              call us at +1 (708) 953-5459.</p>
            </>)
                

  },
  {
    question: 'Do you accept self-pay?',
    answer:  `Self-pay is available. For up-to-date pricing, please contact our office directly.`
  },
  {
    question: 'What ages do you treat?',
    answer: `Healthwise Psychiatry & Wellness offers care for individuals of all ages—from young children to older adults.`
  },
  {
    question: 'How do I make an appointment?',
    answer: (<>
              <p>To schedule an appointment, please visit
              our <span><Link to="/book" className="text-blue-600 hover:text-blue-800 underline">Request Appointment page </Link></span>
              where you can choose a date and time that works for you. After submitting 
              your request, a member of our Intake Team will contact you using the phone 
              number you provide. You can also call us directly at +1 (708) 953-5459 to speak
               with a staff member who will connect you with our intake specialist. During 
               the intake process, please have your demographic and insurance details 
               (as listed on your insurance card) ready.</p>
            </>)
  },
  {
    question: 'Do you offer virtual/tele-health appointments?',
    answer: `For your convenience and well-being, Healthwise provides virtual (telehealth) appointments.`
  },
  {
    question: 'What do I bring to my first session?',
    answer: `Bringing a list of your current and previous medications, as well as your treatment history, can be very helpful. To support coordinated care, it’s also useful to provide contact details for any other healthcare providers you’ve seen—though we’ll only reach out to them with your written consent.`
  },
  {
    question: 'How long is my first visit?',
    answer: `The first psychiatry appointment typically lasts between 40 and 60 minutes, while the initial therapy session is about 50 minutes long.`
  },
  {
    question: 'What should I expect during my first visit?',
    answer: `Psychiatrists and therapists often begin with a BioPsychoSocial Assessment to understand your history, symptoms, and stressors.

    Psychiatrists focus on identifying mental health symptoms to prescribe the most suitable medication.

    Therapists explore your background, current challenges, and coping strategies. They may help with trauma, anxiety, parenting, or relationship issues using various therapeutic approaches.`
  },
  {
    question: 'What if I am currently experiencing an emergency?',
    answer: (<>
              <p>If you are experiencing a life-threatening condition or medical emergency,
              please call 911. If you are experiencing an urgent/crisis situation that
              is not immediately life-threatening, call the National Suicide Prevention
              Lifeline at 1-800-273-8255 or visit their chat line 
              at <a target="_blank" href="https://suicidepreventionlifeline.org/" className="text-blue-600 hover:text-blue-800 underline">https://suicidepreventionlifeline.org/.</a></p>
            </>)
  }
]; 