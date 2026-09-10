import { $ } from "./utils/dom.js";
import MenuApi from './api/index.js';

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  this.currentCategory = "espresso";

  this.init = async () => {
    renderingMenuItem();

    initEventListeners();
  };

  const renderingMenuItem = async () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory,
    );
    const template = this.menu[this.currentCategory]
      .map((menuItem) => {
        return `<li data-menu-id="${menuItem.id}" class="menu-list-item d-flex items-center py-2">
              <span class="w-100 pl-2 menu-name ${menuItem.isSoldOut ? "sold-out" : ""}">${menuItem.name}</span>
              <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
              >
                ${menuItem.isSoldOut ? "판매" : "품절"}
              </button>
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

  const addMenuName = async () => {
    if ($("#menu-input").value.trim() === "") {
      alert("값을 입력해주세요.");
      return;
    }

    const duplicatedName = this.menu[this.currentCategory].find((menuItem) => menuItem.name === $("#menu-input").value);

    if (duplicatedName) {
      alert("이미 등록된 메뉴입니다. 다시 입력해주세요.");
      $("#menu-input").value = "";
      return;
    }

    const menuName = $("#menu-input").value;

    await MenuApi.createMenu(this.currentCategory, menuName);

    renderingMenuItem();

    $("#menu-input").value = "";
    $("#menu-input").focus();
  };

  const updateMenuName = async (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const span = li.querySelector(".menu-name");
    const menuId = li.dataset.menuId;

    let name = prompt("수정할 메뉴를 입력해주세요.", span.innerText);
    if (!name || name.trim() === "") return;

    await MenuApi.updateMenu(this.currentCategory, name, menuId);

    renderingMenuItem();
  };

  const removeMenuName = async (e) => {
    const li = e.target.closest(".menu-list-item");
    if (!li) return;
    const menuId = li.dataset.menuId;

    if (window.confirm("정말 삭제하시겠습니까?")) {
      await MenuApi.deleteMenu(this.currentCategory, menuId);
      renderingMenuItem();
    }
  };

  const soldOutMenu = async (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const menuId = li.dataset.menuId;

    await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);

    renderingMenuItem();
  };

  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length;

    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  const changeMenuCategory = async (e) => {
    const isCategoryNameButton =
      e.target.classList.contains("cafe-category-name");
    if (isCategoryNameButton) {
      const category = e.target.dataset.categoryName;
      this.currentCategory = category;
      $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
      renderingMenuItem();
    }
  };

  const initEventListeners = () => {
    $("nav").addEventListener("click", changeMenuCategory);

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

      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(e);
      }
    });
  };
}

const app = new App();
app.init();
