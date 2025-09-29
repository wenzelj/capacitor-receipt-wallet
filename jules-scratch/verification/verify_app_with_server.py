import asyncio
from playwright.async_api import async_playwright, expect
import http.server
import socketserver
import threading
import os

PORT = 8000

def run_server():
    """Runs a simple HTTP server in a separate thread."""
    # Change directory to the root of the project to serve files correctly
    os.chdir('src')
    Handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()

async def main():
    # Start the server in a daemon thread.
    # This means the thread will automatically exit when the main program does.
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()

    # Give the server a moment to start up
    await asyncio.sleep(1)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Go to the local server URL
        await page.goto(f'http://localhost:{PORT}/index.html')

        # 1. Verify initial state (Home page)
        await expect(page.locator('h1')).to_have_text('Home Page')
        await expect(page.locator('button[data-page="home"]')).to_have_class(/text-blue-600/)
        await expect(page.locator('button[data-page="home"]')).to_have_attribute('aria-current', 'page')

        # 2. Click Search and verify
        await page.click('button[data-page="search"]')
        await expect(page.locator('h1')).to_have_text('Search Page')
        await expect(page.locator('button[data-page="search"]')).to_have_class(/text-blue-600/)

        # 3. Click Settings and verify
        await page.click('button[data-page="settings"]')
        await expect(page.locator('h1')).to_have_text('Settings Page')
        await expect(page.locator('button[data-page="settings"]')).to_have_class(/text-blue-600/)

        await page.screenshot(path="jules-scratch/verification/verification.png")
        await browser.close()

asyncio.run(main())