import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type CarouselControlsProps = {
  isRtl: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  previousLabel: string;
  nextLabel: string;
  onBack: () => void;
  onForward: () => void;
};

const buttonStyles =
  "flex size-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-700";

export default function CarouselControls({
  isRtl,
  canGoBack,
  canGoForward,
  previousLabel,
  nextLabel,
  onBack,
  onForward,
}: CarouselControlsProps) {
  const PreviousIcon = isRtl ? FaChevronRight : FaChevronLeft;

  const NextIcon = isRtl ? FaChevronLeft : FaChevronRight;

  return (
    <div className="hidden items-center gap-2 lg:flex">
      <button
        type="button"
        onClick={onBack}
        disabled={!canGoBack}
        aria-label={previousLabel}
        className={buttonStyles}
      >
        <PreviousIcon className="size-3.5" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={onForward}
        disabled={!canGoForward}
        aria-label={nextLabel}
        className={buttonStyles}
      >
        <NextIcon className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
