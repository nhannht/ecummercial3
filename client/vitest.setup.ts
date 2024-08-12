import '@testing-library/jest-dom/vitest'

import "@testing-library/dom"
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import { vi } from 'vitest'
afterEach(() => {
  cleanup()
})


const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Stub the global ResizeObserver
vi.stubGlobal('ResizeObserver', ResizeObserverMock);