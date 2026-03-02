// 1. Data Profile Awal - Minimalis & Bersih
const profileData = {
  name: "Louis Syahputra",
  handle: "@louissxe",
  links: [
    {
      id: "1",
      title: "Digital Portfolio",
      url: "https://louissxe.site/portfolio",
      icon: "layout-grid",
    },
    {
      id: "2",
      title: "Vision Pro Components",
      url: "https://example.com/vision-pro",
      icon: "box",
    },
    {
      id: "3",
      title: "Design Philosophy",
      url: "https://example.com/philosophy",
      icon: "book-open",
    },
    {
      id: "4",
      title: "Consultation",
      url: "https://example.com/consultation",
      icon: "message-square",
    },
  ],
};

// 2. Fungsi Render Links
function renderLinks() {
  const container = document.getElementById("links-container");
  if (!container) return;
  container.innerHTML = "";

  profileData.links.forEach((link) => {
    const linkElement = document.createElement("div");
    linkElement.className = "link-card group relative w-full";

    linkElement.innerHTML = `
            <a href="${link.url}" target="_blank" class="flex items-center gap-4 w-full glass-panel rounded-[1.8rem] p-4 transition-all duration-500 hover:scale-[1.02] active:scale-[0.97] shimmer overflow-hidden">
                <div class="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/20">
                    <i data-lucide="${link.icon}" class="text-white/40 group-hover:text-white transition-colors duration-300 w-6 h-6"></i>
                </div>
                
                <div class="flex-1 relative z-10">
                    <h3 class="font-medium text-[16px] text-white/80 group-hover:text-white transition-colors tracking-tight">
                        ${link.title}
                    </h3>
                </div>
                
                <i data-lucide="chevron-right" class="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all"></i>
            </a>
        `;
    container.appendChild(linkElement);
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

// Initial Render
document.addEventListener("DOMContentLoaded", () => {
  renderLinks();
  if (window.lucide) {
    lucide.createIcons();
  }
});
