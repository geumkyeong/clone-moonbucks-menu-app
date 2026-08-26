const $ = (selector) => document.querySelector(selector);

function App() {
  const addMenuName = () => {
    // 예외처리: 사용자 입력값이 빈 값이라면 추가되지 않는다.
    if ($("#espresso-menu-name").value.trim() === "") {
      alert("값을 입력해주세요.");
      return;
    }

    const $espressoMenuName = $("#espresso-menu-name").value;
    const menuItemTemplate = (name) => {
      return `<li class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${name}</span>
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
    };

    // 추가되는 메뉴의 마크업은 ul 태그 안에 삽입 한다.
    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplate($espressoMenuName),
    );

    updateMenuCount();

    // input은 빈 값으로 초기화한다.
    $("#espresso-menu-name").value = "";
    $("#espresso-menu-name").focus();
  };

  const updateMenuName = (e) => {
    const li = e.target.closest(".menu-list-item");
    if (!li) return;

    const span = li.querySelector(".menu-name");

    let name = prompt("수정할 메뉴를 입력해주세요.", span.innerText);

    // 모달창에 내용을 입력하면, 메뉴 이름이 변경된다.
    if (name && name.trim() !== "") {
      span.innerText = name;
    }
  };

  const removeMenuName = (e) => {
    const li = e.target.closest(".menu-list-item");
    if (!li) return;

    // 확인 버튼을 클릭하면, 해당 메뉴가 삭제된다.
    if (window.confirm("정말 삭제하시겠습니까?")) {
      li.remove();
    }
    updateMenuCount();
  };

  // 총 메뉴 갯수를 count하여 상단에 보여준다.
  const updateMenuCount = () => {
    const menuCount = document.querySelectorAll(
      "#espresso-menu-list li",
    ).length;

    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }

    // 메뉴 삭제 버튼을 클릭하면, 삭제 확인 모달창이 뜬다.
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

  $("#espresso-menu-name").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") {
      return;
    }

    addMenuName();
  });
}

App();
