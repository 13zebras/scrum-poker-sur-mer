import { createFileRoute } from '@tanstack/react-router'

import HostPage from '@/pages/HostPage'

// Room creation reads and writes localStorage, so it renders in the browser only.
export const Route = createFileRoute('/host/')({ ssr: false, component: HostPage })
