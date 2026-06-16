/**
 * "Spot the phish" mini-game data. Each item is an email the player judges as
 * phishing or legitimate; `flags` are revealed after they answer. English copy
 * (the emails are the content); surrounding UI is translated.
 */
export const PHISH_EMAILS = [
  {
    id: "e1",
    sender: "Microsoft Account Team",
    address: "security@account-micr0soft.com",
    subject: "Unusual sign-in activity — verify within 24h",
    body: "We detected a sign-in from a new device. Your account will be suspended unless you confirm your password here: http://micr0soft-verify.account-secure.ru/login",
    isPhish: true,
    flags: [
      "Look-alike domain: “micr0soft” uses a zero, and the real domain is replaced by account-secure.ru",
      "Urgency + threat (“suspended within 24h”) to rush you",
      "Asks you to confirm your password via a link — legit providers never do this",
    ],
  },
  {
    id: "e2",
    sender: "GitHub",
    address: "noreply@github.com",
    subject: "[GitHub] A new SSH key was added to your account",
    body: "A new SSH key was added. If this was you, no action is needed. If not, review your security settings from github.com directly.",
    isPhish: false,
    flags: [
      "Legitimate domain: github.com",
      "No password requested, no scare tactics",
      "Tells you to navigate to the site yourself rather than clicking a link",
    ],
  },
  {
    id: "e3",
    sender: "DHL Express",
    address: "info@dhl-delivery-track.com",
    subject: "Your parcel is held — pay 2.99 AED customs fee",
    body: "Your package #DH8842 is on hold. Pay the small customs fee now to release it: click here. Failure to pay in 12 hours returns the parcel.",
    isPhish: true,
    flags: [
      "Unofficial domain (dhl-delivery-track.com, not dhl.com)",
      "Tiny payment request — a classic to harvest card details",
      "Pressure with a countdown (“12 hours”)",
    ],
  },
  {
    id: "e4",
    sender: "Talabat Partner",
    address: "partners@talabat.com",
    subject: "Your weekly performance report is ready",
    body: "Hi Vardges, your branch report for last week is available in the partner portal. Log in at your convenience to review orders and ratings.",
    isPhish: false,
    flags: [
      "Known, correctly-spelled domain (talabat.com)",
      "No urgency, no credentials requested",
      "Addresses you by name with context that fits your actual relationship",
    ],
  },
  {
    id: "e5",
    sender: "IT Helpdesk",
    address: "it-support@company-helpdesk-portal.net",
    subject: "Action required: re-validate your mailbox to avoid deletion",
    body: "Your mailbox has exceeded its quota and will be deleted. Re-validate now using your username and password to keep your emails.",
    isPhish: true,
    flags: [
      "Generic external domain pretending to be internal IT",
      "Threat of data loss to create panic",
      "Explicitly asks for username AND password",
    ],
  },
  {
    id: "e6",
    sender: "LinkedIn",
    address: "messages-noreply@linkedin.com",
    subject: "You appeared in 9 searches this week",
    body: "See who's been looking at your profile. You have 3 new connection requests waiting.",
    isPhish: false,
    flags: [
      "Authentic linkedin.com domain",
      "Routine notification, nothing sensitive requested",
      "No threats, deadlines, or password prompts",
    ],
  },
];
