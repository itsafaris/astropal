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
          <stop stopColor={color} stopOpacity="0.8" />
          <stop offset="0.5" stopColor="white" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ChartItemStrokeSVG({
  width = `180px`,
  height = `180px`,
}: {
  width?: string;
  height?: string;
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
        d="M163.649 117.512C160.02 143.886 147.756 159.358 133.365 168.253C118.952 177.162 102.36 179.5 90.0662 179.5C77.8382 179.5 61.2128 177.162 46.7497 168.253C32.3095 159.357 19.98 143.885 16.3509 117.512C13.4043 96.0997 18.4365 75.3906 26.4341 57.9707C34.4328 40.5487 45.3827 26.4498 54.2223 18.2702C58.0666 14.7129 63.7474 10.2621 70.1191 6.70375C76.4986 3.14098 83.5224 0.5 90.0662 0.5C96.6096 0.5 103.6 3.14071 109.946 6.70321C116.285 10.2614 121.933 14.7121 125.778 18.2702C134.617 26.4498 145.567 40.5487 153.566 57.9707C161.564 75.3906 166.596 96.0997 163.649 117.512Z"
        stroke="white"
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
      viewBox="0 0 435 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M217.506 0V500M434.013 125L1 375M434.013 375L1 125"
        stroke="white"
        strokeWidth="0.5"
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
      viewBox="0 0 434 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.25 125.144L216.506 0.288675L432.763 125.144V374.856L216.506 499.711L0.25 374.856V125.144Z"
        stroke="white"
        strokeWidth="0.5"
      />
    </svg>
  );
}
