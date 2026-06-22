import { useState, useRef, useEffect, useCallback } from "react";
import "../../_styles/cK_setup_shared/cK_stp_cuisineTag_platformIconStack.css";

const STACK_PLATFORM_THRESHOLD = 2;
const MAX_COLLAPSED_SLOTS = 3;
const STACK_CLOSE_DELAY_MS = 180;

const getStackLayout = (itemCount, canAdd) => {
  const totalSlots = itemCount + (canAdd ? 1 : 0);
  const shouldStack =
    itemCount > STACK_PLATFORM_THRESHOLD || totalSlots > MAX_COLLAPSED_SLOTS;

  if (!shouldStack) {
    return {
      shouldStack: false,
      leadingCount: itemCount,
      overflowCount: 0,
      showAddCollapsed: canAdd,
      showAddExpanded: canAdd,
    };
  }

  const leadingCount = Math.min(2, itemCount);
  const overflowCount = Math.max(0, itemCount - leadingCount);

  return {
    shouldStack: true,
    leadingCount,
    overflowCount,
    showAddCollapsed: canAdd && overflowCount === 0,
    showAddExpanded: canAdd,
  };
};

const CK_stp_cuisineTag_platformIconStack = ({
  items = [],
  canAdd = false,
  addSlot = null,
  sizeType = "md",
  iconClassName = "",
  missingIconClassName = "",
  onOpenChange,
}) => {
  const hasAdd = canAdd && Boolean(addSlot);
  const layout = getStackLayout(items.length, hasAdd);
  const leadingItems = items.slice(0, layout.leadingCount);
  const visibleCount = items.length + (hasAdd ? 1 : 0);
  const extraSlotCount = Math.max(0, visibleCount - MAX_COLLAPSED_SLOTS);
  const [isOpen, setIsOpen] = useState(false);
  const closeTimerRef = useRef(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const setOpen = useCallback(
    (nextOpen) => {
      setIsOpen(nextOpen);
      onOpenChange?.(nextOpen, {
        extraSlotCount: nextOpen ? extraSlotCount : 0,
      });
    },
    [onOpenChange, extraSlotCount],
  );

  const handleOpen = useCallback(() => {
    if (!layout.shouldStack) return;
    clearCloseTimer();
    setOpen(true);
  }, [layout.shouldStack, clearCloseTimer, setOpen]);

  const handleClose = useCallback(() => {
    if (!layout.shouldStack) return;
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      closeTimerRef.current = null;
    }, STACK_CLOSE_DELAY_MS);
  }, [layout.shouldStack, clearCloseTimer, setOpen]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  const trackClass = [
    "cK_stp_cuisineTag_platformIconStack",
    `cK_stp_cuisineTag_platformIconStack--${sizeType}`,
    layout.shouldStack && "cK_stp_cuisineTag_platformIconStack--stacked",
    isOpen && "cK_stp_cuisineTag_platformIconStack--open",
  ]
    .filter(Boolean)
    .join(" ");

  const renderItem = (item, stackIndex = 0) => (
    <span
      key={item.key}
      className="cK_stp_cuisineTag_platformIconStack__item"
      style={{ zIndex: stackIndex }}
      title={item.count != null ? `${item.label} (${item.count})` : item.label}>
      {item.src ? (
        <img
          className={[
            "cK_stp_cuisineTag_platformIconStack__icon",
            iconClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          src={item.src}
          alt={item.label}
        />
      ) : (
        <span
          className={[
            "cK_stp_cuisineTag_platformIconStack__missing",
            missingIconClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          aria-label={item.label}>
          ?
        </span>
      )}
      {item.count != null ? (
        <span className="cK_stp_cuisineTag_platformIconStack__count">
          {item.count}
        </span>
      ) : null}
    </span>
  );

  const renderAdd = () =>
    hasAdd ? (
      <span className="cK_stp_cuisineTag_platformIconStack__item cK_stp_cuisineTag_platformIconStack__item--add">
        {addSlot}
      </span>
    ) : null;

  const renderCollapsedTrack = () => (
    <>
      {leadingItems.map((item, index) =>
        renderItem(item, items.length - index),
      )}
      {layout.overflowCount > 0 ? (
        <span
          className="cK_stp_cuisineTag_platformIconStack__overflow"
          title={`${layout.overflowCount} more platform(s)`}>
          +{layout.overflowCount}
        </span>
      ) : null}
      {layout.showAddCollapsed ? renderAdd() : null}
    </>
  );

  const renderExpandedTrack = () => (
    <>
      {items.map((item, index) => renderItem(item, items.length - index))}
      {layout.showAddExpanded ? renderAdd() : null}
    </>
  );

  if (!layout.shouldStack) {
    return (
      <span className={trackClass}>
        {items.map((item, index) => renderItem(item, items.length - index))}
        {renderAdd()}
      </span>
    );
  }

  const shellStyle = {
    "--cK_platformStack-visible-count": visibleCount,
    "--cK_platformStack-extra-slots": extraSlotCount,
  };

  return (
    <span
      className={[
        "cK_stp_cuisineTag_platformIconStack__shell",
        `cK_stp_cuisineTag_platformIconStack__shell--${sizeType}`,
        isOpen && "cK_stp_cuisineTag_platformIconStack__shell--open",
      ]
        .filter(Boolean)
        .join(" ")}
      style={shellStyle}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}>
      <span
        className={`${trackClass} cK_stp_cuisineTag_platformIconStack--base`}
        aria-hidden={isOpen}>
        {renderCollapsedTrack()}
      </span>
      <span
        className={[
          trackClass,
          "cK_stp_cuisineTag_platformIconStack--expanded",
          isOpen && "cK_stp_cuisineTag_platformIconStack--expandedVisible",
        ]
          .filter(Boolean)
          .join(" ")}
        role="group"
        aria-label="Platforms"
        aria-hidden={!isOpen}>
        {renderExpandedTrack()}
      </span>
    </span>
  );
};

export default CK_stp_cuisineTag_platformIconStack;
