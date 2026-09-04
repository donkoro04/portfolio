// =================================================
// c-header（SPハンバーガーメニュー）の開閉制御
// Figma: node-id=4103-1098「l-header」（close/open状態）
//
// .c-header__menu-btn クリックで、親の.c-headerに.c-header--openを
// トグルし、ボタンのaria-expanded/aria-labelも同期させる。
// =================================================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-c-header-toggle]").forEach((btn) => {
    const header = btn.closest(".c-header");
    if (!header) return;

    btn.addEventListener("click", () => {
      const isOpen = header.classList.toggle("c-header--open");
      btn.setAttribute("aria-expanded", String(isOpen));
      btn.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
    });
  });
});

// =================================================
// p-interest-modal（写真詳細モーダル）の開閉制御
// Figma: node-id=4409-1295「p-interest-modal」
//
// [data-modal-open]クリックで、同じidを持つ[data-modal]要素に
// .p-interest-modal-overlay--openを付与して表示する。
// [data-modal-close]・オーバーレイ自体のクリック・Escapeキーで閉じる。
// 開いている間はbody側のスクロールを止める。
// =================================================
document.addEventListener("DOMContentLoaded", () => {
  const modals = document.querySelectorAll("[data-modal]");
  if (!modals.length) return;

  const openModal = (modal) => {
    modal.classList.add("p-interest-modal-overlay--open");
    document.body.style.overflow = "hidden";
  };

  const closeModal = (modal) => {
    modal.classList.remove("p-interest-modal-overlay--open");
    document.body.style.overflow = "";
  };

  document.querySelectorAll("[data-modal-open]").forEach((btn) => {
    const modal = document.getElementById(btn.dataset.modalOpen);
    if (!modal) return;

    btn.addEventListener("click", () => openModal(modal));
  });

  modals.forEach((modal) => {
    // オーバーレイの背景部分（パネルの外側）をクリックしたら閉じる
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal);
    });

    modal.querySelectorAll("[data-modal-close]").forEach((btn) => {
      btn.addEventListener("click", () => closeModal(modal));
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    document.querySelectorAll(".p-interest-modal-overlay--open").forEach(closeModal);
  });
});
