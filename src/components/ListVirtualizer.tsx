import { ListVirtualizerProps } from '@/interfaces/ComponentProps'
import { Box } from '@mui/material'
import { useWindowVirtualizer } from '@tanstack/react-virtual'
import { Suspense, useEffect, useRef } from 'react'

const measurementsCacheKey = 'virtualizer_measurementCache'
const scrollOffsetKey = 'virtualizer_scrollOffset'

export default function ListVirtualizer(props: ListVirtualizerProps) {
  const listRef = useRef<HTMLDivElement | null>(null)

  const virtualizer = useWindowVirtualizer({
    count: props.hasNextPage ? props.listLength + 1 : props.listLength,
    estimateSize: () => 120,
    overscan: 3,
    initialOffset: (() => {
      if (!props.scrollRestore) return
      if (typeof sessionStorage !== 'undefined') {
        return parseInt(sessionStorage.getItem(scrollOffsetKey) || '')
      }
      return 0
    })(),
    initialMeasurementsCache: (() => {
      if (!props.scrollRestore) return
      if (typeof sessionStorage === 'undefined') return
      const savedCache = sessionStorage.getItem(measurementsCacheKey)
      return savedCache ? JSON.parse(savedCache) : undefined
    })(),
  })

  useEffect(() => {
    if (props.scrollRestore) {
      sessionStorage.setItem(
        measurementsCacheKey,
        JSON.stringify(Array.from(virtualizer.measurementsCache)),
      )
    }
  }, [virtualizer.measurementsCache])

  useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse()

    if (!lastItem) return

    if (
      lastItem.index >= props.listLength - 1 &&
      props.hasNextPage &&
      !props.isFetchingNextPage
    ) {
      props.fetchNextPage()
    }
  }, [
    props.hasNextPage,
    props.fetchNextPage,
    props.listLength,
    props.isFetchingNextPage,
    virtualizer.getVirtualItems(),
  ])

  return (
    <Box
      ref={listRef}
      sx={{
        overflowY: 'auto',
      }}
    >
      <Box height={virtualizer.getTotalSize()} width="100%" position="relative">
        <Suspense fallback={props.fallback}>
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const isLoaderRow = virtualItem.index > props.listLength - 1

            return (
              <Box
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={virtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${
                    virtualItem.start - virtualizer.options.scrollMargin
                  }px)`,
                }}
              >
                {isLoaderRow
                  ? props.hasNextPage
                    ? 'Loading more...'
                    : 'End of page'
                  : props.children(virtualItem)}
              </Box>
            )
          })}
        </Suspense>
      </Box>
    </Box>
  )
}
