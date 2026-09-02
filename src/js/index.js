const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = "espresso";

  this.init = () => {
    const menuItems = store.getLocalStorage();

    if (menuItems) {
      this.menu = menuItems;
    }

    renderingMenuItem();
  };

  const renderingMenuItem = () => {
    const template = this.menu[this.currentCategory]
      .map((menuItem, index) => {
        return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
              <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
              <button
                  type="button"
                  class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
              >
                  수정
              </button>
              <button
                  type="button"
                  class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
              >
                  삭제
              </button>
              </li>`;
      })
      .join("");

    $("#menu-list").innerHTML = template;

    updateMenuCount();
  };

  const addMenuName = () => {
    if ($("#menu-input").value.trim() === "") {
      alert("값을 입력해주세요.");
      return;
    }

    const menuName = $("#menu-input").value;

    this.menu[this.currentCategory].push({ name: menuName });

    store.setLocalStorage(this.menu);

    renderingMenuItem();

    $("#menu-input").value = "";
    $("#menu-input").focus();
  };

  const updateMenuName = (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const span = li.querySelector(".menu-name");
    const menuId = Number(li.dataset.menuId);

    const existingMenu = this.menu[this.currentCategory].find(
      (menuItem, index) => index === menuId,
    );
    if (!existingMenu) return;

    let name = prompt("수정할 메뉴를 입력해주세요.", span.innerText);
    if (!name || name.trim() === "") return;

    existingMenu.name = name;

    store.setLocalStorage(this.menu);
    span.innerText = name;
  };

  const removeMenuName = (e) => {
    const li = e.target.closest(".menu-list-item");
    if (!li) return;
    const menuId = Number(li.dataset.menuId);

    if (window.confirm("정말 삭제하시겠습니까?")) {
      // 해당 메뉴 아이템을 삭제한다.
      this.menu[this.currentCategory].splice(menuId, 1);
      store.setLocalStorage(this.menu);

      li.remove();
    }
    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCount = document.querySelectorAll("#menu-list li").length;

    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  $("nav").addEventListener("click", (e) => {
    const isCategoryNameButton =
      e.target.classList.contains("cafe-category-name");
    if (isCategoryNameButton) {
      const category = e.target.dataset.categoryName;
      this.currentCategory = category;
      $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
      renderingMenuItem();
    }
  });

  $("#menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#menu-submit-button").addEventListener("click", addMenuName);

  $("#menu-input").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") {
      return;
    }

    addMenuName();
  });

  $("#menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }

    // 메뉴 삭제 버튼을 클릭하면, 삭제 확인 모달창이 뜬다.
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });
}

const app = new App();
app.init();
