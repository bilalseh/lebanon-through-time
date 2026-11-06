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
  const first = await page.locator('.lightbox img').getAttribute('src')
  await page.locator('.lightbox__next').click()
  await expect(page.getByRole('dialog')).toBeVisible()
  expect(await page.locator('.lightbox img').getAttribute('src')).not.toBe(first)
  await page.locator('.lightbox__prev').click()
  await expect(page.getByRole('dialog')).toBeVisible()
  expect(await page.locator('.lightbox img').getAttribute('src')).toBe(first)
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
  // With narration on and no Arabic voice on this machine, the app explains itself instead of staying silent.
  await page.getByRole('button', { name: 'سرد صوتي' }).click()
  await page.waitForTimeout(500)
  await shot(page, 'map-ar-narration', info.project.name)
  await page.getByRole('button', { name: 'سرد صوتي' }).click()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
})

test('narrated map tour flies to each place as its story begins', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.pin').first()).toBeVisible({ timeout: 20_000 })
  const narration = page.getByRole('button', { name: 'Narration' })
  await narration.click()
  await expect(narration).toHaveAttribute('aria-pressed', 'true')
  await page.locator('.scrubber .btn--round').first().click()
  await expect(page.locator('.focus-card h2')).not.toBeEmpty({ timeout: 10_000 })
  const skip = page.getByRole('button', { name: 'Skip' })
  await expect(skip).toBeVisible()
  await skip.click()
  await expect(page.locator('.focus-card')).toBeVisible()
  await page.reload()
  await expect(page.getByRole('button', { name: 'Narration' })).toHaveAttribute('aria-pressed', 'true')
})

for (const lang of ['en', 'ar']) {
  test(`map pins sit exactly on their places (${lang})`, async ({ page }) => {
    await page.addInitScript((l) => localStorage.setItem('ltt-lang', l), lang)
    await page.goto('/')
    await expect(page.locator('.pin').first()).toBeVisible({ timeout: 20_000 })
    await page.waitForTimeout(1500)
    // drei moves each wrapper to the projected point; the dot's centre must be exactly there.
    const offsets = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>('.overlay > div')]
        .filter((el) => el.querySelector('.pin__dot, .cluster__button'))
        .map((el) => {
          const [x, y] = el.style.transform.match(/-?[\d.]+/g)!.slice(1, 3).map(Number)
          const dot = el.querySelector('.pin__dot, .cluster__button')!.getBoundingClientRect()
          return Math.hypot(dot.x + dot.width / 2 - x, dot.y + dot.height / 2 - y)
        }),
    )
    expect(offsets.length).toBeGreaterThan(5)
    for (const d of offsets) expect(d).toBeLessThan(2)
  })
}

test('3D markers never show through the panels while the scene turns', async ({ page }, info) => {
  test.skip(info.project.name === 'mobile', 'desktop only')
  await page.setViewportSize({ width: 1280, height: 720 })
  await page.goto('/sites/baalbek/3d')
  await expect(page.locator('.marker').first()).toBeVisible({ timeout: 20_000 })
  let sawHidden = false
  for (let step = 0; step < 14; step++) {
    // Drag to orbit, so markers sweep across the left-hand panel.
    await page.mouse.move(700, 450)
    await page.mouse.down()
    await page.mouse.move(760, 450, { steps: 6 })
    await page.mouse.up()
    await page.waitForTimeout(700)
    const { shownUnder, hidden } = await page.evaluate(() => {
      const panels = [...document.querySelectorAll('.places, .info, .timeline')].map((p) => p.getBoundingClientRect())
      let shownUnder = 0
      let hidden = 0
      for (const el of document.querySelectorAll('.overlay > div')) {
        if (el.classList.contains('is-under-panel')) {
          hidden += 1
          continue
        }
        const r = el.querySelector('.marker')!.getBoundingClientRect()
        const cx = r.x + r.width / 2
        const cy = r.y + r.height / 2
        if (panels.some((p) => cx > p.left && cx < p.right && cy > p.top && cy < p.bottom)) shownUnder += 1
      }
      return { shownUnder, hidden }
    })
    expect(shownUnder).toBe(0)
    if (hidden > 0) sawHidden = true
  }
  expect(sawHidden).toBe(true)
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
