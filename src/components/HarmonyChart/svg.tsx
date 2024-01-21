export function ChartItemFillSVG({
  id = "id",
  width = `180px`,
  height = `180px`,
  color = "white",
}: {
  id?: string;
  width?: string;
  height?: string;
  color?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M69.5457 6.35519C75.9281 2.77805 83.1623 0 90.0649 0C96.9687 0 104.171 2.77886 110.522 6.35677C116.896 9.94787 122.557 14.4258 126.415 18.009C135.276 26.2378 146.161 40.322 154.105 57.6878C162.052 75.06 167.099 95.8089 164.148 117.334C160.515 143.83 148.178 159.569 133.558 168.638C119.004 177.666 102.328 180 90.0649 180C77.8663 180 61.1593 177.666 46.5571 168.639C31.8899 159.572 19.4857 143.833 15.8521 117.334C12.9006 95.8089 17.9476 75.06 25.895 57.6878C33.8394 40.322 44.7238 26.2378 53.5848 18.009C57.4458 14.4235 63.1395 9.94562 69.5457 6.35519Z"
        fill={`url(#${id})`}
      />
      <defs>
        <linearGradient id={id} x1="90" y1="0" x2="90" y2="180" gradientUnits="userSpaceOnUse">
          <stop stopColor={color} stopOpacity="1" />
          <stop offset="0.5" stopColor={color} stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ChartItemStrokeSVG({
  width = `180px`,
  height = `180px`,
  color = "white",
  strokeWidth = 1,
}: {
  width?: string;
  height?: string;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M164.095 117.574C160.448 144.077 148.11 159.668 133.602 168.636C119.092 177.605 102.407 179.95 90.0662 179.95C77.7911 179.95 61.0733 177.605 46.5137 168.636C31.9563 159.668 19.5521 144.077 15.9051 117.574C12.9437 96.0535 18.0027 75.2568 26.0252 57.783C34.0477 40.3089 45.0322 26.1611 53.9166 17.9399C57.7823 14.3629 63.4915 9.88961 69.8996 6.31086C76.3085 2.73168 83.4116 0.05 90.0662 0.05C96.7207 0.05 103.791 2.73165 110.166 6.31081C116.541 9.88953 122.218 14.3628 126.083 17.9399C134.968 26.1611 145.952 40.3089 153.975 57.783C161.997 75.2568 167.056 96.0535 164.095 117.574Z"
        stroke={color}
        strokeWidth={`${strokeWidth}px`}
      />
    </svg>
  );
}

export function ChartGridInnerSVG({
  width = `435px`,
  height = `500px`,
}: {
  width?: string;
  height?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 477 453"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M238.764 0V250M476.528 172.746L238.764 250M385.71 452.254L238.764 250M91.8178 452.254L238.764 250M1 172.746L238.764 250"
        stroke="white"
        stroke-width="0.5"
      />
    </svg>
  );
}

export function ChartGridOuterSVG({
  width = `435px`,
  height = `500px`,
}: {
  width?: string;
  height?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 476 453"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.529733 172.841L238 0.309014L475.47 172.841L430.117 312.423L384.765 452.004H91.2353L45.8825 312.423L0.529733 172.841Z"
        stroke="white"
        stroke-width="0.5"
      />
    </svg>
  );
}
