import { AnimatePresence, motion } from 'framer-motion';
import PageTransition from '../../PageTransition';
import Banner from '../../ui/Banner';

export default function TermsOfService() {
  return (
    <PageTransition>
      <Banner
        image="office-3.jpg"
        title="Terms of Service"
        subtitle="Please review the terms and conditions for using our services."
      />
      <motion.section
        className="sm:pt-10 pb-20 bg-white min-h-screen"
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
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Acceptance of Terms</h2>
                <p>
                  By accessing and using our mental health services, website, and related services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Services Description</h2>
                <p className="mb-4">
                  We provide mental health services including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Psychiatric evaluation and treatment</li>
                  <li>Psychotherapy and counseling services</li>
                  <li>Medication management</li>
                  <li>Online appointment scheduling</li>
                  <li>Telehealth services</li>
                  <li>Educational resources and information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">User Responsibilities</h2>
                <p className="mb-4">As a user of our services, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Use our services only for lawful purposes</li>
                  <li>Not attempt to access unauthorized areas of our systems</li>
                  <li>Respect the privacy and rights of other users</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Medical Disclaimer</h2>
                <p className="mb-4">
                  <strong>Important:</strong> Our website and online resources are for informational purposes only and do not constitute medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Medical diagnosis and treatment</li>
                  <li>Emergency medical situations</li>
                  <li>Medication changes or adjustments</li>
                  <li>Specific health concerns</li>
                </ul>
                <p className="mt-4">
                  If you are experiencing a medical emergency, call 911 or go to the nearest emergency room immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Appointment and Cancellation Policy</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-gray-800">Scheduling</h3>
                    <p>Appointments can be scheduled through our online portal or by contacting our office directly.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-gray-800">Cancellations</h3>
                    <p>We require 24-hour notice for appointment cancellations. Late cancellations may result in a fee.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-gray-800">No-Shows</h3>
                    <p>Repeated no-shows may result in termination of services.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Payment Terms</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment is due at the time of service unless other arrangements are made</li>
                  <li>We accept various forms of payment including cash, check, and credit cards</li>
                  <li>Insurance claims will be filed on your behalf</li>
                  <li>You are responsible for any co-pays, deductibles, or non-covered services</li>
                  <li>Late payments may result in additional fees</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Intellectual Property</h2>
                <p>
                  All content on our website, including text, graphics, logos, and software, is the property of our practice and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Limitation of Liability</h2>
                <p>
                  We strive to provide high-quality services, but we cannot guarantee specific outcomes. We are not liable for any indirect, incidental, or consequential damages arising from the use of our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Termination</h2>
                <p>
                  We reserve the right to terminate services at any time for violations of these terms or for other reasons as determined by our clinical judgment. You may also terminate services at any time by providing written notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Changes to Terms</h2>
                <p>
                  We may update these Terms of Service from time to time. We will notify you of any material changes by posting the new terms on our website. Your continued use of our services after such changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us at:
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