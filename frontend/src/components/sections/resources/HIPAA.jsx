import { motion } from 'framer-motion';
import Banner from '../../ui/Banner';
import PageTransition from '../../PageTransition';

export default function HIPAA() {
  return (
    <PageTransition>
      <Banner
          image="office-3.jpg"
          title="HIPAA Notice of Privacy Practices"
          subtitle="Understand your rights and our responsibilities under HIPAA."
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
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Introduction</h2>
                <p>
                  This Notice of Privacy Practices describes how we may use and disclose your protected health information (PHI) and your rights regarding your health information. We are required by law to maintain the privacy of your health information and to provide you with this notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Uses and Disclosures of Health Information</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-3 text-gray-800">Treatment</h3>
                    <p>
                      We may use and disclose your health information to provide, coordinate, or manage your health care and related services. This includes sharing information with other health care providers involved in your care.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-3 text-gray-800">Payment</h3>
                    <p>
                      We may use and disclose your health information to obtain payment for services we provide to you. This includes billing your insurance company, or other third-party payers.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-3 text-gray-800">Health Care Operations</h3>
                    <p>
                      We may use and disclose your health information for our health care operations, such as quality assessment, employee training, and practice management.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Other Uses and Disclosures</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-gray-800">With Your Authorization</h3>
                    <p>
                      We will obtain your written authorization before using or disclosing your health information for purposes not described in this notice, except as otherwise permitted or required by law.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-gray-800">Without Your Authorization</h3>
                    <p className="mb-3">We may use or disclose your health information without your authorization in the following situations:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>When required by law</li>
                      <li>For public health activities</li>
                      <li>To report abuse, neglect, or domestic violence</li>
                      <li>For health oversight activities</li>
                      <li>For judicial and administrative proceedings</li>
                      <li>For law enforcement purposes</li>
                      <li>To avert a serious threat to health or safety</li>
                      <li>For specialized government functions</li>
                      <li>For workers' compensation</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Your Rights Regarding Your Health Information</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-gray-800">Right to Inspect and Copy</h3>
                    <p>
                      You have the right to inspect and copy your health information, with certain exceptions. We may charge a reasonable fee for copying and postage.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-gray-800">Right to Request Amendment</h3>
                    <p>
                      You have the right to request that we amend your health information if you believe it is incorrect or incomplete. We may deny your request under certain circumstances.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-gray-800">Right to an Accounting of Disclosures</h3>
                    <p>
                      You have the right to request an accounting of certain disclosures of your health information made by us.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-gray-800">Right to Request Restrictions</h3>
                    <p>
                      You have the right to request restrictions on certain uses and disclosures of your health information. We are not required to agree to all restrictions.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-gray-800">Right to Request Confidential Communications</h3>
                    <p>
                      You have the right to request that we communicate with you about health matters in a certain way or at a certain location.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-gray-800">Right to a Paper Copy of This Notice</h3>
                    <p>
                      You have the right to receive a paper copy of this notice at any time, even if you have agreed to receive it electronically.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Breach Notification</h2>
                <p>
                  We are required to notify you if there is a breach of your unsecured health information that poses a significant risk of financial, reputational, or other harm to you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Complaints</h2>
                <p className="mb-4">
                  If you believe your privacy rights have been violated, you may file a complaint with us or with the Secretary of the Department of Health and Human Services. You will not be retaliated against for filing a complaint.
                </p>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-2">To file a complaint with us:</p>
                  <p>Contact our Privacy Officer at:</p>
                  <p>Email: info@healthwissepw.com</p>
                  <p>Phone: +1 (708) 953-5459</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Changes to This Notice</h2>
                <p>
                  We reserve the right to change this notice and to make the revised notice effective for health information we already have about you as well as any information we receive in the future. We will post a copy of the current notice in our office and on our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Information</h2>
                <p>
                  If you have any questions about this notice or our privacy practices, please contact our Privacy Officer:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">Privacy Officer</p>
                  <p className="font-medium">Heealthwise Psychiatry & Wellness</p>
                  <p>Email: info@healthisepw.com</p>
                  <p>Phone: +1 (708) 953-5459
                  </p>
                </div>
              </section>

              <section className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Acknowledgment</h2>
                <p>
                  By receiving services from our practice, you acknowledge that you have received a copy of this Notice of Privacy Practices and understand your rights regarding your health information.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </PageTransition>
  );
} 