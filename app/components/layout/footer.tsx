import { FacebookIcon, InstagramIcon, type LucideIcon } from "lucide-react";
import logoInverted from "~/assets/logo-inverted.png";

type FooterLink = {
  name: string;
  text?: string;
  href: string;
  icon?: LucideIcon;
};

type FooterGroup = {
  group: string;
  type: "text" | "icon";
  links: FooterLink[];
};

const footerLinks: FooterGroup[] = [
  {
    group: "USEFUL INFORMATION",
    type: "text",
    links: [{ name: "FAQ", text: "FAQ", href: "#" }],
  },
  {
    group: "CONTACT US",
    type: "text",
    links: [
      { name: "Contact", text: "Contact Information", href: "#" },
      { name: "Shop", text: "Find our shops", href: "#" },
    ],
  },
  {
    group: "FOLLOW US",
    type: "icon",
    links: [
      { name: "Facebook", icon: FacebookIcon, href: "https://facebook.com" },
      { name: "Instagram", icon: InstagramIcon, href: "https://instagram.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="dark bg-background text-foreground mt-2">
      <div className="flex flex-row m-7 justify-between">
        <div>
          <img src={logoInverted} />
          <div className="text-sm font-semibold">
            Baking with logic, love and magic
          </div>
          <div className="mt-2">Bakeologic © 2025. All rights reserved.</div>
        </div>
        <div className="flex flex-row gap-x-4">
          {footerLinks.map((group) =>
            group.type === "text" ? (
              <div className="flex flex-col space-y-2" key={group.group}>
                <div className="font-semibold">{group.group}</div>
                <hr className="w-full" />
                <div className="flex flex-col gap-y-1">
                  {group.links.map((link) => (
                    <a className="text-sm" href={link.href} key={link.name}>
                      {link.text}
                    </a>
                  ))}
                </div>
              </div>
            ) : group.type === "icon" ? (
              <div className="flex flex-col space-y-2" key={group.group}>
                <div className="font-semibold">{group.group}</div>
                <hr className="w-full" />
                <div className="flex flex-row gap-x-2">
                  {group.links.map((link) => (
                    <a className="text-sm" href={link.href} key={link.name}>
                      {link.icon && <link.icon />}
                    </a>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </footer>
  );
}
