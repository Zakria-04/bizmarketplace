"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export function useHorizontalCarousel(itemCount: number) {
  const containerRef = useRef<HTMLUListElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const [isMeasured, setIsMeasured] = useState(false);

  const maxStartIndex = Math.max(
    0,
    itemCount - visibleItems,
  );

  const measureVisibleItems = useCallback(() => {
    const container = containerRef.current;
    const firstItem = container?.firstElementChild as HTMLElement | null;

    if (!container || !firstItem) return;

    const styles = window.getComputedStyle(container);
    const gap = Number.parseFloat(styles.columnGap) || 0;

    const itemsPerView = Math.max(
      1,
      Math.floor(
        (container.clientWidth + gap) /
          (firstItem.offsetWidth + gap),
      ),
    );

    setVisibleItems(itemsPerView);
    setIsMeasured(true);

    setCurrentIndex((previousIndex) =>
      Math.min(
        previousIndex,
        Math.max(0, itemCount - itemsPerView),
      ),
    );
  }, [itemCount]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    measureVisibleItems();

    const resizeObserver = new ResizeObserver(
      measureVisibleItems,
    );

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [measureVisibleItems]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const safeIndex = Math.max(
        0,
        Math.min(index, maxStartIndex),
      );

      const targetItem = containerRef.current?.children[
        safeIndex
      ] as HTMLElement | undefined;

      targetItem?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });

      setCurrentIndex(safeIndex);
    },
    [maxStartIndex],
  );

  const goBack = () => {
    scrollToIndex(currentIndex - visibleItems);
  };

  const goForward = () => {
    scrollToIndex(currentIndex + visibleItems);
  };

  const handleScroll = useCallback(() => {
    const container = containerRef.current;

    if (!container) return;

    const direction = window.getComputedStyle(container).direction;
    const isRtl = direction === "rtl";
    const containerRect = container.getBoundingClientRect();

    const containerStart = isRtl
      ? containerRect.right
      : containerRect.left;

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    Array.from(container.children).forEach(
      (child, index) => {
        const itemRect = child.getBoundingClientRect();

        const itemStart = isRtl
          ? itemRect.right
          : itemRect.left;

        const distance = Math.abs(
          itemStart - containerStart,
        );

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      },
    );

    setCurrentIndex(
      Math.min(nearestIndex, maxStartIndex),
    );
  }, [maxStartIndex]);

  return {
    containerRef,
    handleScroll,
    goBack,
    goForward,
    canGoBack: currentIndex > 0,
    canGoForward: currentIndex < maxStartIndex,
    hasOverflow: isMeasured && itemCount > visibleItems,
  };
}