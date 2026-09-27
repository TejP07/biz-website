import { isPlaceholder, site } from "@/content/site";

/**
 * Renders the company email / phone as a link once real values are set in
 * `site.ts`. While a value is still a placeholder it renders as plain text,
 * so the site never links to a fake address or number.
 */
export function EmailLink({ className = "" }: { className?: string }) {
  const email = site.contact.email;
  if (isPlaceholder(email)) return <span className={className}>{email}</span>;
  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}

export function PhoneLink({ className = "" }: { className?: string }) {
  const { phone, phoneE164 } = site.contact;
  if (isPlaceholder(phone) || !phoneE164) return <span className={className}>{phone}</span>;
  return (
    <a href={`tel:${phoneE164}`} className={className}>
      {phone}
    </a>
  );
}
