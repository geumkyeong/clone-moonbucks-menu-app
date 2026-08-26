const $ = (selector) => document.querySelector(selector);

function App() {
  $("#espresso-menu-list").addEventListener("click", (e) => {
    // 수정 버튼을 클릭하면, 모달창이 뜬다.
    if (e.target.classList.contains("menu-edit-button")) {
      // 수정 버튼에서 가장 가까운 li 엘리먼트를 찾는다.
      const li = e.target.closest(".menu-list-item");
      if (!li) return;

      const span = li.querySelector(".menu-name");

      let name = prompt("수정할 메뉴를 입력해주세요.", span.innerText);

      // 모달창에 내용을 입력하면, 메뉴 이름이 변경된다.
      if (name && name.trim() !== "") {
        span.innerText = name;
      }
    }
  });

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
  };

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addMenuName();
  });

  $("#espresso-menu-name").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") {
      return;
    }

    addMenuName();
  });
}

App();
