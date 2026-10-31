import { expect, test, type Page } from '@playwright/test'

const shot = (page: Page, name: string, project: string) =>
  page.screenshot({ path: `e2e/screenshots/${project}-${name}.png`, fullPage: false })

test('map: pins, filters, focus card and the time slider', async ({ page }, info) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Lebanon Through Time/)
  const pins = page.locator('.pin')
  await expect(pins.first()).toBeVisible({ timeout: 20_000 })
  await page.waitForTimeout(2500)
  await shot(page, 'map', info.project.name)

  await page.getByRole('button', { name: 'Baalbek' }).first().click()
  await expect(page.locator('.focus-card h2')).toHaveText('Baalbek')
  await page.waitForTimeout(2200)
  await shot(page, 'map-focus', info.project.name)

  // Scrub the year back to antiquity: Baalbek has a story by then, Anjar does not.
  const slider = page.locator('.scrubber input[type=range]')
  await slider.focus()
  await slider.fill('470')
  const yearLabel = page.locator('.scrubber__year')
  await expect(yearLabel).toContainText(/AD|BC/)
  await expect(page.locator('.pin--dim').first()).toBeAttached()
  await shot(page, 'map-year', info.project.name)
})

test('site page: hero, timeline, gallery and lightbox', async ({ page }, info) => {
  await page.goto('/sites/baalbek')
  await expect(page.locator('.site__hero h1')).toHaveText('Baalbek')
  await expect(page.locator('.stl__tick')).toHaveCount(11)
  await page.locator('.stl__tick').nth(7).click()
  await expect(page.locator('.stl__big-year')).toHaveText('1759')
  await page.waitForTimeout(500)
  await shot(page, 'site', info.project.name)

  await page.locator('.gallery__item').first().click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)

  const timeline = page.locator('.site__timeline')
  await timeline.scrollIntoViewIfNeeded()
  await shot(page, 'site-timeline', info.project.name)
})

test('3D experience loads, flies to a hotspot and plays history', async ({ page }, info) => {
  await page.goto('/sites/sidon-sea-castle/3d')
  await expect(page.locator('canvas')).toBeVisible({ timeout: 20_000 })
  await expect(page.locator('.timeline')).toBeVisible()
  await page.waitForTimeout(3000)
  await shot(page, '3d-sidon-today', info.project.name)

  const range = page.locator('.timeline input[type=range]')
  await range.fill('1')
  await page.waitForTimeout(1200)
  await shot(page, '3d-sidon-1228', info.project.name)

  await page.locator('.places button').nth(1).click()
  await expect(page.locator('.info h2')).toBeVisible()
  await page.waitForTimeout(2200)
  await shot(page, '3d-sidon-hotspot', info.project.name)
})

test('arabic layout is right-to-left and remembered', async ({ page }, info) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'العربية' }).click()
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await expect(page.locator('.brand h1')).toHaveText('لبنان عبر الزمن')
  await page.waitForTimeout(2000)
  await shot(page, 'map-ar', info.project.name)
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
})

for (const id of ['baalbek', 'anjar', 'tyre', 'cedars-of-god']) {
  test(`3D experience: ${id} renders at its first and last era`, async ({ page }, info) => {
    test.skip(info.project.name === 'mobile', 'desktop only')
    await page.goto(`/sites/${id}/3d`)
    await expect(page.locator('canvas')).toBeVisible({ timeout: 20_000 })
    await page.waitForTimeout(3000)
    await shot(page, `3d-${id}-today`, info.project.name)
    await page.locator('.timeline input[type=range]').fill('0')
    await page.waitForTimeout(1500)
    await shot(page, `3d-${id}-start`, info.project.name)
  })
}
