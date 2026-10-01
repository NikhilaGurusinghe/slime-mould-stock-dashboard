import clsx from "clsx";

export default function ArrowDownRightIcon(props: {
  size?: string;
  className?: string;
  strokeWidth?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="171"
      height="171"
      viewBox="0 0 171 171"
      aria-hidden={true}
      className={clsx(props.size ?? "size-5", props.className)}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={props.strokeWidth}
    >
      <path d="M28.791 11.1952L140.312 122.987L140.319 56.8085V51.7919L145.336 51.8094L160.084 51.8593L165.065 51.8768L165.066 56.8583L165.098 160.039L165.099 165.04L160.099 165.041L56.9492 165.056L51.7588 165.057L51.9521 159.87C52.1221 155.311 52.0173 150.158 52.0479 145.251L52.0791 140.283L57.0469 140.282L122.818 140.27L11.2334 28.7909L7.38379 24.9452L11.542 21.4335C13.5385 19.7474 19.7655 13.449 21.4512 11.4774L24.9688 7.36316L28.791 11.1952Z" />
    </svg>
  );
}
