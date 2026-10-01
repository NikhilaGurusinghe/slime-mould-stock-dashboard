import clsx from "clsx";

export default function ThreeBarsIcon(props: {
  size?: string;
  className?: string;
  strokeWidth?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={props.strokeWidth}
      stroke="currentColor"
      aria-hidden={true}
      className={clsx(props.size ?? "size-5", props.className)}
    >
      <path
        strokeLinecap="square"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}
