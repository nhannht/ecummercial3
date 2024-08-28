import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {Product} from "@/lib/global.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const faqitemsplacefallback = [
    {
        id: 1,
        question: "What is the return policy?",
        answer: "You can return any item within 30 days for a full refund.",
    },
    {
        id: 2,
        question: "How do I track my order?",
        answer: "You can track your order by logging into your account and going to the orders page.",
    },
    {
        id: 3,
        question: "What payment methods do you accept?",
        answer: "We accept Visa, Mastercard, American Express, and PayPal.",
    },
    {
        id: 4,
        question: "Do you offer free shipping?",
        answer: "Yes, we offer free standard shipping on all orders over $50.",
    },
    {
        id: 5,
        question: "How long does delivery take?",
        answer: "Standard delivery takes 5-7 business days. Expedited delivery is available for an additional fee.",
    },
];
export const productsFallbackForAdminPanel:Product[] = [
    {
        ID: 1,
        Name: "Glimmer Lamps",
        Description: "Comfortable Footwear",
        Price: 19.99,
        UpdatedAt:""
    },


]
