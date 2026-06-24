import { useState } from "react";

import {
  Input_text,
  Input_email,
  Input_password,
  Input_number,
  Input_url,
  Input_tel,
  Input_search,
  Input_date,
  Input_textArea,
  Select_static,
  Select_relational,
  Select_multi,
  Select_searchable,
  Select_grouped,
  Select_boolean,
  Toggler,
  Input_checkbox,
  Input_image,
  Input_file,
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
  const SVG_ICON_OPTIONS = [
    // { value: "", label: "", leftIcon: { type: "svg", svg_src: svg_src } },
  ];
  const [textValue, setTextValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [contractKind, setContractKind] = useState("service");
  const [iconOnly, setIconOnly] = useState("");
  const [leftIconPick, setLeftIconPick] = useState("global");
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
  const [telPhone, setTelPhone] = useState("");
  const [telWhatsApp, setTelWhatsApp] = useState("");
  const [telTelegram, setTelTelegram] = useState("");
  const [telegramMode, setTelegramMode] = useState("username");
  const [emailPrimary, setEmailPrimary] = useState("");
  const [emailWork, setEmailWork] = useState("ops@example.com");
  const [pswLogin, setPswLogin] = useState("");
  const [pswAuthKey, setPswAuthKey] = useState("");
  const [pswCreate, setPswCreate] = useState("");
  const [pswCreateConfirm, setPswCreateConfirm] = useState("");
  const [pswChangeCurrent, setPswChangeCurrent] = useState("");
  const [pswChangeNew, setPswChangeNew] = useState("");
  const [pswChangeConfirm, setPswChangeConfirm] = useState("");
  const [numberQty, setNumberQty] = useState("");
  const [numberPrice, setNumberPrice] = useState("19.99");
  const [numberPort, setNumberPort] = useState("3220");
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [monthValue, setMonthValue] = useState("");
  const [weekValue, setWeekValue] = useState("");
  const [dateTimeValue, setDateTimeValue] = useState("");
  const [searchBasic, setSearchBasic] = useState("");
  const [searchWithAction, setSearchWithAction] = useState("italian");
  const [togglerEmail, setTogglerEmail] = useState(true);
  const [togglerSms, setTogglerSms] = useState(false);
  const [checkboxTerms, setCheckboxTerms] = useState(false);
  const [checkboxNewsletter, setCheckboxNewsletter] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileSmall, setImageFileSmall] = useState(null);
  const [imageFilesGallery, setImageFilesGallery] = useState([]);
  const [docFile, setDocFile] = useState(null);
  const [attachmentFiles, setAttachmentFiles] = useState([]);

  const EXISTING_CONTRACT_URL =
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
  const EXISTING_LOGO_PREVIEW =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png";

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
          labelProps={{ isActive: true, message: "Read-only (left icon + text)" }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message: "Shows selected value only — no chevron, no menu. Value still submits.",
          }}
          options={LEFT_ICON_OPTIONS}
          value={leftIconPick}
          onChange={(e) => setLeftIconPick(e.target.value)}
          readOnly
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
        <h2>Input_tel</h2>

        <Input_tel
          kind="phone"
          labelProps={{ isActive: true, message: "Support phone" }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message:
              "Country code select + national number — value stored as +971…",
          }}
          value={telPhone}
          onChange={(e) => setTelPhone(e.target.value)}
        />

        <Input_tel
          kind="whatsApp"
          labelProps={{ isActive: true, message: "WhatsApp line" }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message: "Same country-code shell — opens wa.me on read-only link.",
          }}
          value={telWhatsApp}
          onChange={(e) => setTelWhatsApp(e.target.value)}
        />

        <Input_tel
          kind="telegram"
          labelProps={{
            isActive: true,
            message: "Telegram (username / phone)",
          }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message:
              "User icon = handle · Phone icon = number with country codes.",
          }}
          telegramMode={telegramMode}
          onTelegramModeChange={setTelegramMode}
          value={telTelegram}
          onChange={(e) => setTelTelegram(e.target.value)}
        />

        <Input_tel
          readOnly
          kind="phone"
          labelProps={{
            isActive: true,
            message: "Read-only phone (copy + call)",
          }}
          hintsProps={{ isActive: false }}
          value="+971503734513"
        />

        <Input_tel
          readOnly
          kind="whatsApp"
          labelProps={{ isActive: true, message: "Read-only WhatsApp" }}
          hintsProps={{ isActive: false }}
          value="+971503734513"
        />

        <Input_tel
          readOnly
          kind="telegram"
          labelProps={{ isActive: true, message: "Read-only Telegram @handle" }}
          hintsProps={{ isActive: false }}
          value="vardges_me"
          telegramMode="username"
        />
      </section>

      <section className="emailEnginesTest__section">
        <h2>Input_email</h2>

        <Input_email
          labelProps={{ isActive: true, message: "Primary email" }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message:
              "Default Mail icon on the left — same shell as Input_text.",
          }}
          placeholder="you@example.com"
          value={emailPrimary}
          onChange={(e) => setEmailPrimary(e.target.value)}
        />

        <Input_email
          sizeType="sm"
          labelProps={{ isActive: true, message: "Work email" }}
          hintsProps={{ isActive: false }}
          maxLength={80}
          lengthProps={{ isActive: true }}
          value={emailWork}
          onChange={(e) => setEmailWork(e.target.value)}
        />

        <Input_email
          disabled
          labelProps={{ isActive: true, message: "Disabled" }}
          hintsProps={{ isActive: false }}
          value="noreply@vardges.me"
        />
      </section>

      <section className="emailEnginesTest__section">
        <h2>Input_password</h2>

        <Input_password
          kind="AuthLogIn"
          labelProps={{ isActive: true, message: "Sign in password" }}
          hintsProps={{ isActive: false }}
          placeholder="Enter your password"
          value={pswLogin}
          onChange={(e) => setPswLogin(e.target.value)}
        />

        <Input_password
          kind="AuthLogIn"
          kindOf="authKey"
          labelProps={{ isActive: true, message: "Auth key" }}
          hintsProps={{ isActive: false }}
          placeholder="Paste your auth key"
          value={pswAuthKey}
          onChange={(e) => setPswAuthKey(e.target.value)}
        />

        <Input_password
          kind="createNew"
          labelProps={{ isActive: true, message: "Create password" }}
          confirmLabelProps={{ isActive: true, message: "Confirm password" }}
          hintsProps={{ isActive: false }}
          value={pswCreate}
          confirmValue={pswCreateConfirm}
          onChange={(e) => setPswCreate(e.target.value)}
          onConfirmChange={(e) => setPswCreateConfirm(e.target.value)}
        />

        <Input_password
          kind="change"
          currentLabelProps={{ isActive: true, message: "Current password" }}
          labelProps={{ isActive: true, message: "New password" }}
          confirmLabelProps={{ isActive: true, message: "Repeat new password" }}
          hintsProps={{ isActive: false }}
          currentValue={pswChangeCurrent}
          value={pswChangeNew}
          confirmValue={pswChangeConfirm}
          onCurrentChange={(e) => setPswChangeCurrent(e.target.value)}
          onChange={(e) => setPswChangeNew(e.target.value)}
          onConfirmChange={(e) => setPswChangeConfirm(e.target.value)}
        />
      </section>

      <section className="emailEnginesTest__section">
        <h2>Input_number</h2>

        <Input_number
          labelProps={{ isActive: true, message: "Quantity" }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message:
              "Same shell as Input_text — native up/down spinners hidden.",
          }}
          placeholder="0"
          min={0}
          max={999}
          step={1}
          value={numberQty}
          onChange={(e) => setNumberQty(e.target.value)}
        />

        <Input_number
          sizeType="sm"
          labelProps={{ isActive: true, message: "Unit price (AED)" }}
          leftIconProps={{
            isActive: true,
            type: "lucide",
            lucidIcon: "Banknote",
            decorative: true,
          }}
          hintsProps={{ isActive: false }}
          min={0}
          step={0.01}
          value={numberPrice}
          onChange={(e) => setNumberPrice(e.target.value)}
        />

        <Input_number
          disabled
          labelProps={{ isActive: true, message: "Disabled port" }}
          hintsProps={{ isActive: false }}
          value={numberPort}
        />
      </section>
    </div>
  );
};

export default EmailEngines;

/*
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

      <section className="emailEnginesTest__section">
        <h2>Input_search</h2>

        <Input_search
          labelProps={{ isActive: true, message: "Default (search + clear)" }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message: "Left Search and right Clear are always on by default.",
          }}
          placeholder="Search…"
          value={searchBasic}
          onChange={(e) => setSearchBasic(e.target.value)}
        />

        <Input_search
          labelProps={{ isActive: true, message: "With optional 2nd-right icon" }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message: "SlidersHorizontal sits left of Clear; both are clickable.",
          }}
          placeholder="Search cuisine tags…"
          value={searchWithAction}
          onChange={(e) => setSearchWithAction(e.target.value)}
          secondaryRightIconProps={{
            isActive: true,
            type: "lucide",
            lucidIcon: "SlidersHorizontal",
            title: "Open filters",
            onClick: () => window.alert("Filter action clicked"),
          }}
        />
      </section> 

      <section className="emailEnginesTest__section">
        <h2>Toggler</h2>

        <Toggler
          fullWidth
          labelProps={{
            isActive: true,
            message: "Email notifications",
            position: "inline",
            iconProps: {
              isActive: true,
              type: "lucide",
              lucidIcon: "Mail",
            },
          }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message: "Standard switch — purple (light) / orange (dark) when on.",
          }}
          checked={togglerEmail}
          onChange={(e) => setTogglerEmail(e.target.checked)}
        />

        <Toggler
          sizeType="sm"
          labelProps={{
            isActive: true,
            message: "SMS alerts (sm)",
            position: "inline",
          }}
          checked={togglerSms}
          onChange={(e) => setTogglerSms(e.target.checked)}
        />

        <Toggler
          labelProps={{ isActive: true, message: "Disabled switch" }}
          hintsProps={{ isActive: true, type: "hint", message: "Off and not interactive." }}
          disabled
          defaultChecked={false}
        />
      </section>

      <section className="emailEnginesTest__section">
        <h2>Input_checkbox</h2>

        <Input_checkbox
          fullWidth
          labelProps={{
            isActive: true,
            message: "I accept the terms and conditions",
            position: "inline",
            inlinePosition: "after",
          }}
          hintsProps={{
            isActive: true,
            type: checkboxTerms ? "success" : "hint",
            message: checkboxTerms
              ? "Terms accepted."
              : "Required before submitting the form.",
          }}
          checked={checkboxTerms}
          onChange={(e) => setCheckboxTerms(e.target.checked)}
        />

        <Input_checkbox
          sizeType="sm"
          labelProps={{
            isActive: true,
            message: "Subscribe to newsletter (sm)",
            position: "inline",
            inlinePosition: "after",
          }}
          checked={checkboxNewsletter}
          onChange={(e) => setCheckboxNewsletter(e.target.checked)}
        />

        <Input_checkbox
          labelProps={{
            isActive: true,
            message: "Disabled checkbox",
            position: "inline",
            inlinePosition: "after",
          }}
          hintsProps={{ isActive: true, type: "hint", message: "Checked and locked." }}
          disabled
          defaultChecked
        />
      </section>

      <section className="emailEnginesTest__section">
        <h2>Input_image</h2>

        <Input_image
          labelProps={{ isActive: true, message: "Brand logo" }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message: "Single upload — preview panel is opt-in via showPreviewPanel.",
          }}
          simulateUpload
          showPreviewPanel
          file={imageFile}
          onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
        />

        <Input_image
          sizeType="sm"
          labelProps={{ isActive: true, message: "Avatar (max 2 MB)" }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message: "No preview panel — meta row + progress only.",
          }}
          simulateUpload
          maxSizeBytes={2 * 1024 * 1024}
          file={imageFileSmall}
          onChange={(event) =>
            setImageFileSmall(event.target.files?.[0] ?? null)
          }
        />

        <Input_image
          multiple
          maxFiles={4}
          labelProps={{ isActive: true, message: "Gallery (multiple)" }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message: "Append images on each pick/drop — remove individually from meta or preview.",
          }}
          simulateUpload
          showPreviewPanel
          previewPanelLabel="Gallery preview"
          files={imageFilesGallery}
          onChange={(event) => setImageFilesGallery([...event.target.files])}
        />

        <Input_image
          labelProps={{ isActive: true, message: "Existing logo (edit mode)" }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message: "previewUrl only — enable showPreviewPanel to show the current server image.",
          }}
          showPreviewPanel
          previewUrl={EXISTING_LOGO_PREVIEW}
          previewPanelLabel="Current logo"
        />
      </section>

      <section className="emailEnginesTest__section">
        <h2>Input_file</h2>

        <Input_file
          labelProps={{ isActive: true, message: "Contract (PDF only)" }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message: "Single upload — meta row + progress. Preview panel is opt-in.",
          }}
          accept=".pdf,application/pdf"
          acceptHint="PDF only · max 10 MB"
          maxSizeBytes={10 * 1024 * 1024}
          simulateUpload
          file={docFile}
          onChange={(event) => setDocFile(event.target.files?.[0] ?? null)}
        />

        <Input_file
          labelProps={{ isActive: true, message: "Attachments (mixed types)" }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message: "Multiple append — images get thumbnails, other files show icon cards.",
          }}
          multiple
          maxFiles={5}
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp,image/*"
          acceptHint="PDF, Word, or images"
          simulateUpload
          showPreviewPanel
          previewPanelLabel="Attachment preview"
          files={attachmentFiles}
          onChange={(event) => setAttachmentFiles([...event.target.files])}
        />

        <Input_file
          labelProps={{ isActive: true, message: "Existing contract (edit mode)" }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message: "previewUrl + showPreviewPanel — non-image files render as a file card with open link.",
          }}
          showPreviewPanel
          previewUrl={EXISTING_CONTRACT_URL}
          previewFileName="signed-contract.pdf"
          previewPanelLabel="Current file"
        />
      </section>*/
