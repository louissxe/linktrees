
const profileData = {
  name: "Louis Syahputra",
  handle: "@louissxe",
  links: [
    {
      id: "1",
      title: "Digital Portfolio",
      url: "https://louissxe.github.io/Main/portfolio/",
      image: "icon/portfolio.png",
    },
    {
      id: "2",
      title: "Tiktok For Business",
      url: "https://www.tiktok.com/@lshub.official",
      image: "icon/tiktok1.png",
    },
    {
      id: "3",
      title: "Discord Community",
      url: "https://discord.gg/VRYpmrm9u",
      image: "icon/community.png",
    },
    {
      id: "4",
      title: "Keyboard yang Mimin pakai",
      url: "https://shopee.co.id/rexusid/26434899366",
      image: "icon/keyboard.png",
    },
    {
      id: "5",
      title: "Mouse yang Mimin pakai",
      url: "https://shopee.co.id/rexusid/21537163852",
      image: "icon/mouse.png",
    },
  ],
};

function renderLinks() {
  const container = document.getElementById("links-container");
  if (!container) return;
  container.innerHTML = "";

  profileData.links.forEach((link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link.url;
    linkElement.target = "_blank";
    linkElement.className = "link-card";
    
    linkElement.innerHTML = `
      <div class="link-icon-container">
        <img src="${link.image}" class="link-image" alt="${link.title}" />
      </div>
      <span class="link-title">${link.title}</span>
      <i data-lucide="external-link" class="external-arrow"></i>
    `;
    
    container.appendChild(linkElement);
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderLinks();
  if (window.lucide) {
    lucide.createIcons();
  }
});
