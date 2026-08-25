const $ = (selector) => document.querySelector(selector);

function App() {
  const addMenuName = (e) => {
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

    // 총 메뉴 갯수를 count하여 상단에 보여준다.
    const menuCount = document.querySelectorAll(
      "#espresso-menu-list li",
    ).length;
    $(".menu-count").innerText = `총 ${menuCount}개`;

    // input은 빈 값으로 초기화한다.
    $("#espresso-menu-name").value = "";
    $("#espresso-menu-name").focus();
  }

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    // form 태그가 자동으로 전송되는 걸 막는다.
    e.preventDefault();
  });

  // 확인 버튼을 눌렀을 때 메뉴가 추가 된다.
  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addMenuName();
  });

  // 엔터키를 눌렀을 때 메뉴가 추가 된다.
  $("#espresso-menu-name").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") {
      return;
    }

    addMenuName();
  });
}

App();
