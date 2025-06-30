import { motion } from 'framer-motion';
import Banner from '../../ui/Banner';
import PageTransition from '../../PageTransition';

export default function PrivacyPolicy() {
  return (
    <PageTransition>
      <Banner
        image="office-4.jpg"
        title="Privacy Policy"
        subtitle="Learn how we handle your information and keep your data safe."
      />
      <motion.section
        className="py-20 bg-white min-h-screen"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-4xl mx-auto px-4">  
          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="space-y-8 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Introduction</h2>
                <p>
                  This Privacy Policy describes how we collect, use, and handle your information when you use our mental health services, website, and related services. We are committed to your privacy and the security of your data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-gray-800">Personal Information</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Name, address, phone number, and email address</li>
                      <li>Date of birth and social security number</li>
                      <li>Insurance information and payment details</li>
                      <li>Medical history and treatment information</li>
                      <li>Emergency contact information</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-gray-800">Website Usage Information</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>IP address and browser information</li>
                      <li>Pages visited and time spent on our website</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">How We Use Your Information</h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Deliver and manage mental health services and treatment</li>
                  <li>Communicate with you about appointments, care, and updates</li>
                  <li>Process payments and insurance claims</li>
                  <li>Analyze website usage and improve our services</li>
                  <li>Maintain the security and integrity of our systems</li>
                  <li>Comply with legal and regulatory requirements</li>
                  <li>Protect your health and safety</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Opt-Out Policy</h2>
                <p>
                  You may receive communications from us about updates, research, promotions, or new services. If you prefer not to receive these, you can opt out at any time by following the unsubscribe instructions in our emails or by contacting us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Children's Privacy</h2>
                <p>
                  Our services and website are not intended for individuals under 18. We do not knowingly collect information from children. If we learn that we have received data from a minor, we will promptly remove it. If you are under 18, please do not submit any information through our site or services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Legal Compliance & Information Sharing</h2>
                <p>
                  We may share your information only as required by law (such as in response to court orders, subpoenas, or regulatory obligations), to protect the safety of our users or the public, with your explicit consent, or with healthcare providers and insurance companies involved in your care and billing. We do not sell, trade, or rent your personal information to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Third-Party Websites</h2>
                <p>
                  Our website may include links to external sites operated by third parties. We do not control these sites and are not responsible for their privacy practices. Accessing third-party websites is at your own risk and subject to their respective privacy policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Data Storage & Security</h2>
                <p>
                  Your information may be stored and processed in the United States. We use reasonable technical and organizational measures to help keep your data safe from unauthorized access, alteration, or disclosure. However, no method of transmission or storage is completely secure, so please use caution when sharing sensitive information online.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Your Rights</h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Request corrections to your information</li>
                  <li>Request deletion of your information (subject to legal requirements)</li>
                  <li>Opt out of certain communications</li>
                  <li>File a complaint with relevant authorities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">Heealthwise Psychiatry & Wellness</p>
                  <p>Email: info@healthisepw.com</p>
                  <p>Phone: +1 (708) 953-5459
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </PageTransition>
  );
} 