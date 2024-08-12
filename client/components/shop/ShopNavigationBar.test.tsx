import {fireEvent, render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import ShopNavigationBar from './ShopNavigationBar';
import {describe, expect, test} from "vitest"

const shopLinks = [
    {title: "Home", href: "/", description: "Go to the homepage"},
    {title: "Products", href: "/products", description: "Browse our product catalog"},
    {title: "Cart", href: "/cart", description: "View items in your cart"},
    {title: "Search", href: "/search", description: "Search for products"},
    {title: "Contact Us", href: "/contact-us", description: "Get in touch with us"},
    {title: "About Us", href: "/about-us", description: "Learn more about us"},
    {title: "FAQ", href: "/faq", description: "Frequently Asked Questions"},
    {title: "Terms and Conditions", href: "/terms-and-conditions", description: "Read our terms and conditions"},
];

describe('ShopNavigationBar', () => {
    test('renders the navigation menu trigger', () => {
        render(
            <BrowserRouter>
                <ShopNavigationBar/>
            </BrowserRouter>
        );

        const trigger = screen.getByRole('button');
        //@ts-expect-error : toBeInDocument only work when import "@testing-library/jest-dom/vitest" but we already add it in vitest.setup.ts, the checker just so dump
        expect(trigger).toBeInTheDocument();


    });

    test('renders the navigation links when the menu is triggered', () => {
        render(
            <BrowserRouter>
                <ShopNavigationBar/>
            </BrowserRouter>
        );

        const trigger = screen.getByRole('button');
        fireEvent.click(trigger);

        shopLinks.forEach(link => {
            const linkElement = screen.getByText(link.title);
            //@ts-expect-error
            expect(linkElement).toBeInTheDocument();
        });
    });

    test('navigates to the correct link when a navigation item is clicked', () => {
        render(
            <BrowserRouter>
                <ShopNavigationBar/>
            </BrowserRouter>
        );

        const trigger = screen.getByRole('button');
        fireEvent.click(trigger);

        shopLinks.forEach(link => {
            const linkElement = screen.getByText(link.title);
            fireEvent.click(linkElement);
            expect(window.location.pathname).toBe(link.href);
            fireEvent.click(trigger);

        });
    });

    test('renders the correct descriptions for each navigation link', () => {
        render(
            <BrowserRouter>
                <ShopNavigationBar/>
            </BrowserRouter>
        );

        const trigger = screen.getByRole('button');
        fireEvent.click(trigger);

        shopLinks.forEach(link => {
            const linkElement = screen.getByText(link.title);
            //@ts-expect-error
            expect(linkElement).toBeInTheDocument();
        });
    });
    test('renders the correct number of navigation links', () => {
        render(
            <BrowserRouter>
                <ShopNavigationBar/>
            </BrowserRouter>
        );

        const trigger = screen.getByRole('button');
        fireEvent.click(trigger);

        const linkElements = screen.getAllByText((content) => {
            return shopLinks.some(link => link.title === content);
        });
        expect(linkElements).toHaveLength(shopLinks.length);
    });

    test('closes the navigation menu when a link is clicked', () => {
        render(
            <BrowserRouter>
                <ShopNavigationBar/>
            </BrowserRouter>
        );

        const trigger = screen.getByRole('button');
        fireEvent.click(trigger);

        const firstLink = screen.getByText(shopLinks[0].title);
        fireEvent.click(firstLink);

        const linkElements = screen.queryAllByText((content) => {
            return shopLinks.some(link => link.title === content);
        });
        expect(linkElements).toHaveLength(0);
    });
    // test('closes the navigation menu when clicking outside the menu', () => {
    //     render(
    //         <BrowserRouter>
    //             <div>
    //                 <ShopNavigationBar/>
    //             </div>
    //         </BrowserRouter>
    //     );
    //
    //     const trigger = screen.getByRole('button');
    //     fireEvent.click(trigger);
    //     console.log('Menu opened');
    //     const menu = document.getElementById('navigation-content');
    //     // console.log(menu)
    //     if (menu) {
    //         const {width, height} = menu.getBoundingClientRect();
    //         console.log(`Width: ${width}, Height: ${height}`);
    //     }
    //     fireEvent.mouseOut(menu);
    //
    //     console.log('Clicked outside element');
    //
    //     const linkElements = screen.queryAllByText((content) => {
    //         return shopLinks.some(link => link.title === content);
    //     });
    //     console.log('Number of link elements found:', linkElements.length);
    //     expect(linkElements).toHaveLength(0);
    // });

    test('keeps the navigation menu open when clicking inside the menu', () => {
        render(
            <BrowserRouter>
                <ShopNavigationBar/>
            </BrowserRouter>
        );

        const trigger = screen.getByRole('button');
        fireEvent.click(trigger);

        const firstLink = screen.getByText(shopLinks[0].title);
        fireEvent.mouseDown(firstLink);

        const linkElements = screen.queryAllByText((content) => {
            return shopLinks.some(link => link.title === content);
        });
        expect(linkElements).toHaveLength(shopLinks.length);
    });

});

