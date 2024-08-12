
export default function TermsAndConditions() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Terms and Conditions</h1>
          <p className="mt-4 text-muted-foreground">
            Please read these terms and conditions carefully before using our e-commerce platform.
          </p>
        </div>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">User Responsibilities</h2>
            <div className="mt-4 space-y-2 text-muted-foreground">
              <p>By using our e-commerce platform, you agree to the following responsibilities:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Provide accurate and up-to-date information when creating an account or placing an order.</li>
                <li>Protect your account credentials and keep them confidential.</li>
                <li>Use our platform in compliance with all applicable laws and regulations.</li>
                <li>Refrain from engaging in any illegal or fraudulent activities.</li>
              </ul>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Payment Policies</h2>
            <div className="mt-4 space-y-2 text-muted-foreground">
              <p>
                Our e-commerce platform accepts various payment methods, including credit cards, debit cards, and
                digital wallets. Please note the following payment policies:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>All payments are processed securely and in accordance with industry standards.</li>
                <li>Payment information is stored securely and is not shared with third parties.</li>
                <li>Prices displayed on our platform are inclusive of any applicable taxes and fees.</li>
                <li>We reserve the right to update our pricing at any time without prior notice.</li>
              </ul>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Refund Policies</h2>
            <div className="mt-4 space-y-2 text-muted-foreground">
              <p>
                We strive to provide a satisfactory shopping experience for all our customers. However, we understand
                that sometimes things may not go as planned. Here are our refund policies:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Customers have the right to request a refund within 14 days of receiving their order.</li>
                <li>Refunds will be processed within 7 business days of receiving the request.</li>
                <li>Refunds will be issued in the same form of payment as the original purchase.</li>
                <li>Certain items, such as personalized or custom-made products, may not be eligible for a refund.</li>
              </ul>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Intellectual Property Rights</h2>
            <div className="mt-4 space-y-2 text-muted-foreground">
              <p>
                Our e-commerce platform and all its content, including but not limited to text, graphics, images, and
                logos, are the property of our company and are protected by copyright and trademark laws. You agree to
                the following:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  You will not reproduce, distribute, or modify any content from our platform without our prior written
                  consent.
                </li>
                <li>You will not use our trademarks or logos without our prior written permission.</li>
                <li>You will respect the intellectual property rights of our company and our partners.</li>
              </ul>
            </div>
          </section>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground">
            By using our e-commerce platform, you agree to these terms and conditions. If you have any questions or
            concerns, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  )
}