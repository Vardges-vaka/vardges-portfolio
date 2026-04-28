import { useThemeContext } from "../../../02_context/context.index.js";

const OrderCoverage_Icon = () => {
  const { strokeColor } = useThemeContext();

  const svgString = `

<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">Delivery Coverage Area Icon</title>
  <desc id="desc">A stylized map with a dashed delivery coverage boundary, route line, delivery scooter, parcel, and location marker.</desc>

  <defs>
    <radialGradient id="mapGlow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#D8E8FF"/>
      <stop offset="75%" stop-color="#EEF6FF"/>
      <stop offset="100%" stop-color="#F7FBFF"/>
    </radialGradient>

    <linearGradient id="pinGradient" x1="512" y1="130" x2="512" y2="565" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#FF6A58"/>
      <stop offset="1" stop-color="#F04438"/>
    </linearGradient>

    <linearGradient id="blueGradient" x1="340" y1="430" x2="690" y2="740" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#5B9DFF"/>
      <stop offset="1" stop-color="#155EEF"/>
    </linearGradient>

    <linearGradient id="parcelGradient" x1="138" y1="648" x2="242" y2="731" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#F8C56A"/>
      <stop offset="1" stop-color="#D9912F"/>
    </linearGradient>

    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#0B3B8C" flood-opacity="0.16"/>
    </filter>

    <filter id="pinShadow" x="-30%" y="-20%" width="160%" height="160%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#B42318" flood-opacity="0.24"/>
    </filter>
  </defs>

  <!-- Main map coverage shape -->
  <path d="M140 500C135 398 205 298 322 266C434 235 492 291 577 269C718 232 850 300 895 416C952 565 899 742 741 803C595 860 500 790 399 815C272 847 152 758 137 631C132 587 143 545 140 500Z" fill="url(#mapGlow)" filter="url(#softShadow)"/>

  <!-- Coverage dashed boundary -->
  <path d="M140 500C135 398 205 298 322 266C434 235 492 291 577 269C718 232 850 300 895 416C952 565 899 742 741 803C595 860 500 790 399 815C272 847 152 758 137 631C132 587 143 545 140 500Z"
        stroke="#155EEF" stroke-width="13" stroke-linecap="round" stroke-dasharray="26 24" fill="none"/>

  <!-- Roads -->
  <g stroke="#FFFFFF" stroke-width="17" stroke-linecap="round" stroke-linejoin="round" opacity="0.95">
    <path d="M181 383C300 474 430 507 569 536C681 560 776 606 866 687"/>
    <path d="M226 663C361 594 472 560 596 481C693 420 759 339 807 276"/>
    <path d="M132 532H343C454 532 563 545 669 580C753 608 825 652 895 713"/>
    <path d="M300 273C386 350 457 400 536 431C620 465 704 461 823 445"/>
    <path d="M412 807C424 691 461 583 514 493C562 412 631 341 719 279"/>
    <path d="M221 342C271 390 316 423 364 452"/>
    <path d="M686 290L637 369L712 416"/>
  </g>

  <!-- Parks/water -->
  <path d="M731 395C765 376 817 351 841 377C866 404 888 450 870 467C851 486 772 471 743 457C715 443 702 412 731 395Z" fill="#76E29B" opacity="0.85"/>
  <path d="M610 724C633 689 679 676 705 702C731 727 754 778 733 795C712 813 630 800 604 780C580 762 588 756 610 724Z" fill="#76E29B" opacity="0.85"/>
  <ellipse cx="814" cy="666" rx="67" ry="47" fill="#7DB7FF" opacity="0.65"/>

  <!-- Coverage radius -->
  <circle cx="512" cy="512" r="207" fill="#2E90FA" opacity="0.15"/>
  <circle cx="512" cy="512" r="105" fill="#2E90FA" opacity="0.18"/>

  <!-- Route line -->
  <path d="M474 780C520 779 562 766 590 729C616 696 653 699 670 653C690 599 632 592 578 592C524 592 509 568 512 514"
        stroke="#155EEF" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="20 22" fill="none"/>
  <circle cx="474" cy="780" r="19" fill="#155EEF"/>

  <!-- Location target -->
  <circle cx="512" cy="512" r="87" fill="#FFFFFF"/>
  <circle cx="512" cy="512" r="68" fill="url(#blueGradient)"/>
  <circle cx="512" cy="512" r="27" fill="#FFFFFF"/>

  <!-- Pin -->
  <g filter="url(#pinShadow)">
    <path d="M512 134C433 134 369 198 369 277C369 388 483 476 505 547C508 556 516 556 519 547C541 476 655 388 655 277C655 198 591 134 512 134Z" fill="url(#pinGradient)"/>
    <circle cx="512" cy="276" r="58" fill="#FFFFFF"/>
  </g>

  <!-- Delivery scooter group -->
  <g transform="translate(132 586)">
    <!-- parcel -->
    <rect x="25" y="57" width="95" height="75" rx="10" fill="url(#parcelGradient)"/>
    <rect x="66" y="57" width="23" height="29" rx="4" fill="#8B5A1E" opacity="0.7"/>

    <!-- scooter platform/body -->
    <path d="M43 171H235C256 171 275 185 281 205H62C44 205 32 190 43 171Z" fill="#155EEF"/>
    <path d="M40 133H155C198 133 230 161 240 201H31C34 168 18 145 40 133Z" fill="#2E90FA"/>
    <path d="M205 143C232 143 257 169 265 201H180C181 169 184 143 205 143Z" fill="#155EEF"/>

    <!-- wheels -->
    <circle cx="80" cy="215" r="39" fill="#1D2939"/>
    <circle cx="80" cy="215" r="22" fill="#CBD5E1"/>
    <circle cx="254" cy="215" r="39" fill="#1D2939"/>
    <circle cx="254" cy="215" r="22" fill="#CBD5E1"/>

    <!-- handlebar -->
    <path d="M223 114C239 113 250 119 256 133" stroke="#1D2939" stroke-width="11" stroke-linecap="round"/>
    <circle cx="225" cy="116" r="11" fill="#1D2939"/>

    <!-- rider body -->
    <path d="M150 66C178 70 198 93 205 128L173 132C166 110 151 100 132 98L150 66Z" fill="#155EEF"/>
    <path d="M155 127C180 124 206 130 223 148" stroke="#1D2939" stroke-width="20" stroke-linecap="round"/>
    <path d="M154 129C169 149 178 170 177 197" stroke="#1D2939" stroke-width="22" stroke-linecap="round"/>
    <path d="M132 97C156 100 174 106 197 125" stroke="#155EEF" stroke-width="22" stroke-linecap="round"/>

    <!-- rider head/helmet -->
    <circle cx="154" cy="47" r="28" fill="#FFC4A4"/>
    <path d="M125 49C125 18 147 4 174 8C196 12 209 30 207 50H177C168 50 161 58 161 67V75C141 78 125 66 125 49Z" fill="#155EEF"/>
    <path d="M178 51C184 51 191 50 201 48" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" opacity="0.7"/>
  </g>
</svg>
`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

export default OrderCoverage_Icon;
