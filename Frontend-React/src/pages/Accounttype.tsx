
interface SocialLink {
  name: string;
  url: string;
}

interface Event {
  socialLinks: SocialLink[];
}

let event: Event = {
  socialLinks: [
    { name: "Instagram", url: "https://www.instagram.com/liux.king" },
    { name: "Facebook", url: "Gizin Design" },
    { name: "Twitter", url: "Xhitos/baitter.com/gzilli" },
  ],
};

function updateSocialLink(name: string, url: string) {
  event.socialLinks = event.socialLinks.map((link) =>
    link.name === name ? { ...link, url } : link
  );
}

function addSocialLink(name: string, url: string) {
  event.socialLinks.push({ name, url });
}

function removeSocialLink(name: string) {
  event.socialLinks = event.socialLinks.filter((link) => link.name !== name);
}
