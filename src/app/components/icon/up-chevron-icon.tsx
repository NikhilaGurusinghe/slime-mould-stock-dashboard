import clsx from "clsx";

export default function UpChevronIcon(props: {
  size?: string;
  className?: string;
  strokeWidth?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="145"
      height="85"
      viewBox="0 0 145 85"
      aria-hidden={true}
      className={clsx(props.size ?? "size-5", props.className)}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={props.strokeWidth}
    >
      <path
        d="M72.6648 1.06641L143.728 72.542L144.06 72.876L143.747 73.2266C141.275 76.0021 138.499 78.4568 135.957 81.0742C135.141 81.9137 134.259 82.8706 133.219 83.5771L132.876 83.8096L132.584 83.5166L72.4617 23.1221L11.9548 83.6172L11.5984 83.9736L11.2449 83.6133L1.04858 73.2275L0.702881 72.875L1.05054 72.5254L71.9558 1.06641L72.3103 0.709961L72.6648 1.06641Z"
      />
    </svg>
  );
}
