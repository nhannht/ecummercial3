
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-8">
          Here are some of the most common questions we receive and their answers. If you have any other questions,
          please don't hesitate to contact us.
        </p>
        <Accordion type="single" collapsible>
          <AccordionItem value="question1">
            <AccordionTrigger className="flex justify-between items-center w-full py-4 border-b border-border">
              <h3 className="text-lg font-medium">What is the return policy for your products?</h3>
            </AccordionTrigger>
            <AccordionContent className="py-4">
              <p className="text-muted-foreground">
                We offer a 30-day return policy on all of our products. If you're not satisfied with your purchase, you
                can return it for a full refund within 30 days of the delivery date. Please contact our customer support
                team for more information.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="question2">
            <AccordionTrigger className="flex justify-between items-center w-full py-4 border-b border-border">
              <h3 className="text-lg font-medium">How long does it take to ship my order?</h3>
            </AccordionTrigger>
            <AccordionContent className="py-4">
              <p className="text-muted-foreground">
                We typically ship all orders within 2-3 business days of receiving the order. Depending on your
                location, you can expect to receive your order within 5-7 business days after it has been shipped. We
                offer expedited shipping options for an additional fee if you need your order sooner.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="question3">
            <AccordionTrigger className="flex justify-between items-center w-full py-4 border-b border-border">
              <h3 className="text-lg font-medium">Do you offer any discounts or promotions?</h3>
            </AccordionTrigger>
            <AccordionContent className="py-4">
              <p className="text-muted-foreground">
                Yes, we offer a variety of discounts and promotions throughout the year. You can find our current offers
                on the Promotions page of our website. We also send out periodic email newsletters with exclusive
                discounts and special offers for our subscribers.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="question4">
            <AccordionTrigger className="flex justify-between items-center w-full py-4 border-b border-border">
              <h3 className="text-lg font-medium">How can I track the status of my order?</h3>
            </AccordionTrigger>
            <AccordionContent className="py-4">
              <p className="text-muted-foreground">
                You can track the status of your order by logging into your account on our website and viewing the order
                details. We also send out email updates with tracking information as your order progresses through the
                shipping process. If you have any questions or concerns about your order, please don't hesitate to
                contact our customer support team.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="question5">
            <AccordionTrigger className="flex justify-between items-center w-full py-4 border-b border-border">
              <h3 className="text-lg font-medium">Do you offer any warranty or guarantee on your products?</h3>
            </AccordionTrigger>
            <AccordionContent className="py-4">
              <p className="text-muted-foreground">
                Yes, we offer a 1-year warranty on all of our products. If you experience any issues with your purchase
                within the first year, please contact our customer support team and we'll be happy to assist you. We
                stand behind the quality of our products and want to ensure you're completely satisfied with your
                purchase.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}