import { expect, test } from '@playwright/test'

/**
 * Regenerates the social preview (public/og.jpg) and the README screenshots.
 * Opt in with IMAGES=1 so ordinary test runs do not rewrite committed files:
 *   IMAGES=1 npx playwright test e2e/images.spec.ts --project=desktop
 */
test.describe('images', () => {
  test.skip(!process.env.IMAGES, 'set IMAGES=1 to regenerate images')

  test('social preview and README screenshots', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'desktop only')
    const settle = () => page.waitForTimeout(2800)

    await page.setViewportSize({ width: 1200, height: 630 })
    await page.goto('/')
    await expect(page.locator('.pin').first()).toBeVisible({ timeout: 20_000 })
    await settle()
    await page.screenshot({ path: 'public/og.jpg', type: 'jpeg', quality: 82 })

    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    await expect(page.locator('.pin').first()).toBeVisible({ timeout: 20_000 })
    await settle()
    await page.screenshot({ path: 'docs/map.jpg', type: 'jpeg', quality: 80 })

    await page.goto('/sites/byblos')
    await page.locator('.stl__tick').nth(3).click()
    await page.waitForTimeout(600)
    await page.screenshot({ path: 'docs/site.jpg', type: 'jpeg', quality: 80 })

    await page.goto('/sites/sidon-sea-castle/3d')
    await expect(page.locator('canvas')).toBeVisible({ timeout: 20_000 })
    await settle()
    await page.screenshot({ path: 'docs/sidon-3d.jpg', type: 'jpeg', quality: 80 })
  })
})
