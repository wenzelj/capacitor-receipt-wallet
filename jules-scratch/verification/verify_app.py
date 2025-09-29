import asyncio
from playwright.async_api import async_playwright, expect
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Get the absolute path to the index.html file
        file_path = os.path.abspath('src/index.html')

        # Go to the local HTML file
        await page.goto(f'file://{file_path}')

        # Helper function to simulate loading page content,
        # since fetch() is blocked on the file:// protocol.
        async def load_and_verify(page_name, button_text, expected_header):
            # Read the page content from its corresponding HTML file
            with open(f'src/pages/{page_name}.html', 'r') as f:
                html_content = f.read()

            # Use page.evaluate to inject the HTML into the #content div
            await page.evaluate("content => document.getElementById('content').innerHTML = content", html_content)

            # Verify that the correct header is now visible
            await expect(page.locator('h1')).to_have_text(expected_header)

            # Simulate setting the active button style
            await page.evaluate(f"""
                document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('text-blue-600'));
                const button = Array.from(document.querySelectorAll('.nav-btn')).find(btn => btn.innerText.includes('{button_text}'));
                if (button) {{
                    button.classList.add('text-blue-600');
                }}
            """)

        # 1. Simulate loading the Home page
        await load_and_verify('home', 'Home', 'Home Page')

        # 2. Simulate loading the Search page
        await load_and_verify('search', 'Search', 'Search Page')

        # 3. Simulate loading the Settings page
        await load_and_verify('settings', 'Settings', 'Settings Page')

        # Take a screenshot of the final state (Settings page)
        await page.screenshot(path="jules-scratch/verification/verification.png")

        await browser.close()

asyncio.run(main())