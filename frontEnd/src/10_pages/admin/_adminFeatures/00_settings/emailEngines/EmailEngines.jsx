import { useState } from "react";

import {
  Input_text,
  Input_url,
  Input_date,
  Input_textArea,
  Select_static,
  Select_relational,
  Select_multi,
  Select_searchable,
  Select_grouped,
  Select_boolean,
  Competitors_Icon,
  Employees_Icon,
  Brands_Icon,
  FoodMenu_Icon,
} from "../../../../../01_components/_components.index.js";

import "./testing.css";

/** Full field shell for select demos — label + label icon + L/R icons + hints. */

const SELECT_FULL_SHELL = {
  labelProps: {
    isActive: true,

    iconProps: {
      isActive: true,

      type: "lucide",

      lucidIcon: "Tag",
    },
  },

  leftIconProps: {
    isActive: true,

    type: "lucide",

    lucidIcon: "Filter",
  },

  rightIconProps: {
    isActive: true,

    type: "lucide",

    lucidIcon: "ChevronDown",

    decorative: true,
  },

  hintsProps: {
    isActive: true,

    type: "hint",

    message: "Helper text under the field.",
  },
};

const EmailEngines = () => {
  const [textValue, setTextValue] = useState("");

  const [textareaValue, setTextareaValue] = useState("");

  const [priceRange, setPriceRange] = useState("");

  const [contractKind, setContractKind] = useState("service");

  const [iconOnly, setIconOnly] = useState("");

  const [leftIconPick, setLeftIconPick] = useState("");

  const [rightIconPick, setRightIconPick] = useState("");

  const [fullIconPick, setFullIconPick] = useState("");

  const [relationalPick, setRelationalPick] = useState("");

  const [multiPick, setMultiPick] = useState("");

  const [searchablePick, setSearchablePick] = useState("");

  const [groupedPick, setGroupedPick] = useState("");

  const [booleanPick, setBooleanPick] = useState("");

  const [urlSecure, setUrlSecure] = useState("https://example.com");

  const [urlInsecure, setUrlInsecure] = useState("http://example.com");

  const [urlInvalid, setUrlInvalid] = useState("www.example.com");

  const [dateValue, setDateValue] = useState("");

  const [timeValue, setTimeValue] = useState("");

  const [monthValue, setMonthValue] = useState("");

  const [weekValue, setWeekValue] = useState("");

  const [dateTimeValue, setDateTimeValue] = useState("");

  const PRICE_RANGE_OPTIONS = [
    { value: "budget", label: "Budget" },

    { value: "mid", label: "Mid" },

    { value: "premium", label: "Premium" },
  ];

  const CONTRACT_KIND_OPTIONS = [
    { value: "aggregator", label: "Aggregator" },

    { value: "lease", label: "Lease" },

    { value: "service", label: "Service" },

    { value: "other", label: "Other" },
  ];

  const ICON_ONLY_OPTIONS = [
    { value: "settings", ariaLabel: "Settings", leftIcon: "Settings" },

    { value: "layers", ariaLabel: "Layers", rightIcon: "Layers" },
  ];

  const LEFT_ICON_OPTIONS = [
    {
      value: "global",

      label: "Global channel",

      leftIcon: { type: "svg", svg_src: Competitors_Icon() },
    },

    {
      value: "recipe",

      label: "Recipe engine",

      leftIcon: { type: "svg", svg_src: FoodMenu_Icon() },
    },
  ];

  const RIGHT_ICON_OPTIONS = [
    {
      value: "featured",

      label: "Featured",

      rightIcon: { type: "lucide", lucidIcon: "Star" },
    },

    {
      value: "linked",

      label: "Linked item",

      rightIcon: { type: "svg", svg_src: Brands_Icon() },
    },
  ];

  const FULL_ICON_OPTIONS = [
    {
      value: "link-out",

      label: "Link out",

      leftIcon: { type: "lucide", lucidIcon: "Link" },

      rightIcon: { type: "lucide", lucidIcon: "ExternalLink" },
    },

    {
      value: "star-global",

      label: "Star global",

      leftIcon: { type: "svg", svg_src: Employees_Icon() },

      rightIcon: { type: "svg", svg_src: Competitors_Icon() },
    },
  ];

  const RELATIONAL_OPTIONS = [
    {
      _id: "665a1b2c3d4e5f678901234",

      name: "Dubai Marina Kitchen",

      leftIcon: { type: "lucide", lucidIcon: "Building2" },
    },

    {
      _id: "665a1b2c3d4e5f678901235",

      name: "JLT Express Hub",

      leftIcon: { type: "lucide", lucidIcon: "Store" },
    },

    {
      _id: "665a1b2c3d4e5f678901236",

      name: "Business Bay Central",

      leftIcon: { type: "svg", svg_src: Brands_Icon() },
    },
  ];

  const MULTI_OPTIONS = [
    {
      value: "italian",

      label: "Italian",

      leftIcon: { type: "lucide", lucidIcon: "Pizza" },
    },

    {
      value: "japanese",

      label: "Japanese",

      leftIcon: { type: "lucide", lucidIcon: "Fish" },
    },

    {
      value: "indian",

      label: "Indian",

      leftIcon: { type: "lucide", lucidIcon: "Flame" },
    },

    {
      value: "lebanese",

      label: "Lebanese",

      leftIcon: { type: "lucide", lucidIcon: "Salad" },
    },
  ];

  const SEARCHABLE_OPTIONS = [
    {
      value: "dxb-marina",

      label: "Dubai Marina",

      leftIcon: { type: "lucide", lucidIcon: "MapPin" },

      rightIcon: { type: "lucide", lucidIcon: "Building2" },
    },

    {
      value: "dxb-jlt",

      label: "Jumeirah Lakes Towers",

      leftIcon: { type: "lucide", lucidIcon: "MapPin" },

      rightIcon: { type: "lucide", lucidIcon: "Building" },
    },

    {
      value: "dxb-bb",

      label: "Business Bay",

      leftIcon: { type: "lucide", lucidIcon: "MapPin" },

      rightIcon: { type: "lucide", lucidIcon: "Landmark" },
    },

    {
      value: "dxb-difc",

      label: "DIFC",

      leftIcon: { type: "lucide", lucidIcon: "MapPin" },

      rightIcon: { type: "lucide", lucidIcon: "Banknote" },
    },

    {
      value: "dxb-deira",

      label: "Deira",

      leftIcon: { type: "lucide", lucidIcon: "MapPin" },

      rightIcon: { type: "lucide", lucidIcon: "Ship" },
    },
  ];

  const GROUPED_OPTIONS = [
    {
      label: "Active brands",

      options: [
        {
          value: "brand-alpha",

          label: "Alpha Kitchen",

          leftIcon: { type: "lucide", lucidIcon: "ChefHat" },
        },

        {
          value: "brand-beta",

          label: "Beta Bites",

          leftIcon: { type: "svg", svg_src: FoodMenu_Icon() },
        },
      ],
    },

    {
      label: "Archived",

      options: [
        {
          value: "brand-legacy",

          label: "Legacy Line",

          leftIcon: { type: "lucide", lucidIcon: "Archive" },
        },
      ],
    },
  ];

  return (
    <div className="emailEnginesTest">
      <h1 className="emailEnginesTest__title">Input playground</h1>

      <section className="emailEnginesTest__section">
        <h2>Select_static</h2>

        <Select_static
          optionsType="iconOnly"
          labelProps={{ isActive: true, message: "Icon only" }}
          hintsProps={{
            isActive: true,

            type: "hint",

            message:
              'Lucide string ("Settings") or { type, lucidIcon / svg_src }.',
          }}
          options={ICON_ONLY_OPTIONS}
          placeholder="Pick an icon…"
          value={iconOnly}
          onChange={(e) => setIconOnly(e.target.value)}
        />

        <Select_static
          optionsType="leftIcon"
          labelProps={{ isActive: true, message: "Left icon + text" }}
          options={LEFT_ICON_OPTIONS}
          placeholder="Pick one…"
          value={leftIconPick}
          onChange={(e) => setLeftIconPick(e.target.value)}
        />

        <Select_static
          optionsType="rightIcon"
          labelProps={{ isActive: true, message: "Text + right icon" }}
          options={RIGHT_ICON_OPTIONS}
          placeholder="Pick one…"
          value={rightIconPick}
          onChange={(e) => setRightIconPick(e.target.value)}
        />

        <Select_static
          optionsType="full"
          labelProps={{ isActive: true, message: "Left + text + right" }}
          hintsProps={{
            isActive: true,

            type: "hint",

            message: "Icons use same Field_icon sizes as the select sizeType.",
          }}
          options={FULL_ICON_OPTIONS}
          placeholder="Pick one…"
          value={fullIconPick}
          onChange={(e) => setFullIconPick(e.target.value)}
        />

        <Select_static
          optionsType="textOnly"
          disabled
          labelProps={{ isActive: true, message: "Disabled" }}
          options={PRICE_RANGE_OPTIONS}
          defaultValue="mid"
        />
      </section>

      <section className="emailEnginesTest__section">
        <h2>Other select variants</h2>

        <Select_relational
          {...SELECT_FULL_SHELL}
          labelProps={{
            ...SELECT_FULL_SHELL.labelProps,
            message: "Linked kitchen (MongoDB ref)",
            iconProps: {
              ...SELECT_FULL_SHELL.labelProps.iconProps,
              lucidIcon: "Database",
            },
          }}
          hintsProps={{
            ...SELECT_FULL_SHELL.hintsProps,
            message: "Stores _id, displays name. Rich leftIcon options.",
          }}
          options={RELATIONAL_OPTIONS}
          placeholder="Pick a kitchen…"
          value={relationalPick}
          onChange={(e) => setRelationalPick(e.target.value)}
        />

        <Select_multi
          {...SELECT_FULL_SHELL}
          labelProps={{
            ...SELECT_FULL_SHELL.labelProps,
            message: "Cuisine tags (multi)",
          }}
          hintsProps={{
            ...SELECT_FULL_SHELL.hintsProps,
            message: "Comma-separated value in onChange. Dropdown stays open.",
          }}
          options={MULTI_OPTIONS}
          value={multiPick}
          onChange={(e) => setMultiPick(e.target.value)}
        />

        <Select_searchable
          {...SELECT_FULL_SHELL}
          labelProps={{
            ...SELECT_FULL_SHELL.labelProps,

            message: "Delivery zone (searchable)",

            iconProps: {
              ...SELECT_FULL_SHELL.labelProps.iconProps,

              lucidIcon: "Search",
            },
          }}
          hintsProps={{
            ...SELECT_FULL_SHELL.hintsProps,

            message: "Type inside the dropdown to filter a long list.",
          }}
          options={SEARCHABLE_OPTIONS}
          optionsType="full"
          placeholder="Pick a zone…"
          value={searchablePick}
          onChange={(e) => setSearchablePick(e.target.value)}
        />

        <Select_grouped
          {...SELECT_FULL_SHELL}
          labelProps={{
            ...SELECT_FULL_SHELL.labelProps,

            message: "Brand group",

            iconProps: {
              ...SELECT_FULL_SHELL.labelProps.iconProps,

              lucidIcon: "Layers",
            },
          }}
          hintsProps={{
            ...SELECT_FULL_SHELL.hintsProps,

            message: "Options split into labelled sections (optgroup).",
          }}
          groups={GROUPED_OPTIONS}
          placeholder="Pick from group…"
          value={groupedPick}
          onChange={(e) => setGroupedPick(e.target.value)}
        />

        <Select_boolean
          {...SELECT_FULL_SHELL}
          labelProps={{
            ...SELECT_FULL_SHELL.labelProps,

            message: "Accepts aggregator terms",

            iconProps: {
              ...SELECT_FULL_SHELL.labelProps.iconProps,

              lucidIcon: "ToggleLeft",
            },
          }}
          hintsProps={{
            ...SELECT_FULL_SHELL.hintsProps,

            message: "Tri-state: Yes / No / not set.",
          }}
          triState
          value={booleanPick}
          onChange={(e) => setBooleanPick(e.target.value)}
        />
      </section>

      <section className="emailEnginesTest__section">
        <h2>Input_url</h2>

        <Input_url
          labelProps={{ isActive: true, message: "Secure (https)" }}
          placeholder="https://…"
          value={urlSecure}
          onChange={(e) => setUrlSecure(e.target.value)}
        />

        <Input_url
          labelProps={{ isActive: true, message: "Insecure (http)" }}
          placeholder="http://…"
          value={urlInsecure}
          onChange={(e) => setUrlInsecure(e.target.value)}
        />

        <Input_url
          labelProps={{ isActive: true, message: "Invalid prefix" }}
          placeholder="https://…"
          value={urlInvalid}
          onChange={(e) => setUrlInvalid(e.target.value)}
        />

        <Input_url
          readOnly
          labelProps={{ isActive: true, message: "Read-only (copy + open)" }}
          hintsProps={{ isActive: false }}
          value="https://www.thsreabsjkahsj.com/example-brand-profile"
          readOnlyMaxChars={5}
        />
      </section>
    </div>
  );
};



export default EmailEngines;
