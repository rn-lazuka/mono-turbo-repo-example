import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export function USDLIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 134.3045 134.3209" {...props}>
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="67.1485"
          y1="90.5627"
          x2="67.1485"
          y2="1.001"
          gradientTransform="translate(0 135.3209) scale(1 -1)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".125" stopColor="#cefd51" />
          <stop offset=".87" stopColor="#21cffa" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="22.3829"
          y1="45.7736"
          x2="22.3829"
          y2="1"
          gradientTransform="translate(0 135.3209) scale(1 -1)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".095" stopColor="#cefd51" />
          <stop offset="1" stopColor="#21cffa" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-3"
          x1="111.9179"
          y1="135.3209"
          x2="111.9179"
          y2="1.001"
          gradientTransform="translate(0 135.3209) scale(1 -1)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#cefd51" />
          <stop offset=".67" stopColor="#21cffa" />
        </linearGradient>
      </defs>
      <g id="Components">
        <g id="b24bb9a7-25be-4f75-85f0-3088f8da0685_1">
          <path
            d="m44.7656,91v43.3199h44.7657V44.7582h-44.7657v46.2418Z"
            fill="url(#linear-gradient)"
          />
          <path
            d="m0,89.5473v1.6528c0,7.3418,2.9137,14.3758,8.1029,19.5728l15.4369,15.445c5.1893,5.189,12.2312,8.103,19.573,8.103h1.6529v-44.766H0v-.0076Z"
            fill="url(#linear-gradient-2)"
          />
          <path
            d="m125.8095,22.2714L102.6465,0h-13.1153v134.3199h1.9681c7.1496,0,14.0222-2.767,19.1812-7.726l15.129-14.545c5.428-5.22,8.495-12.423,8.495-19.9497v-49.8781c0-7.5263-3.067-14.7297-8.495-19.9497Z"
            fill="url(#linear-gradient-3)"
          />
        </g>
      </g>
    </SvgIcon>
  );
}
