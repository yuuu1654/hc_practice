let completedTasks = 0
let incompleteTasks = 0

const updateTaskCounts = () => {
  document.getElementById("all-tasks").innerText = completedTasks + incompleteTasks
  document.getElementById("completed-tasks").innerText = completedTasks
  document.getElementById("incomplete-tasks").innerText = incompleteTasks
}

const createTodoItem = (inputText) => {
  const li = document.createElement("li");
  li.style = "list-style: none;"
  li.className = "d-flex align-items-center bg-info-subtle py-2 px-1 border rounded my-3"
  const checkbox = createCheckbox();
  const span = createSpan(inputText);
  const editButton = createEditButton()
  const deleteButton = createDeleteButton(checkbox)
  li.append(checkbox, span, editButton, deleteButton)
  return li
}

const createCheckbox = () => {
  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  checkbox.className = "form-check-input me-2"
  checkbox.addEventListener("change", (e) => {
    /**
     * チェックボタンがチェックされたら、完了済みに+1して、未完了から-1する
     * チェックボタンが空にだったら、完了済みを-1して、未完了を+1する
     */
    if (e.target.checked) {
      completedTasks++
      incompleteTasks--
    } else {
      completedTasks--
      incompleteTasks++
    }
    updateTaskCounts()
  })
  return checkbox
}

const createSpan = (inputText) => {
  const span = document.createElement("span");
  span.innerText = inputText;
  span.className = "form-control"
  span.style.width = "250px"
  return span
}

const createEditButton = () => {
  const editButton = document.createElement("button")
  editButton.className = "btn btn-primary ms-2 me-1"
  editButton.innerText = "編集"
  // 編集ボタンのクリックイベント
  editButton.addEventListener("click", (e) => {
    /**
     * 編集ボタンをクリックしたら保存ボタンに切り替わる
     *   spanタグを入力可能なinputに置換する
     *   spanの中に書いてあった文字をinputに移す (inputは、innerTextではなくvalueを使う)
     * 保存ボタン押したら編集ボタンに表示を切り替える
     *   入力値が空ならメッセージを表示して更新させない
     *   保存ボタン(editButton)の直前のinputを取得
     *   新しいspanタグを作る
     *   inputに書いた文字を新しいspanに移し替える
     */
    const currentElement = editButton.previousElementSibling
    if (editButton.innerText === "編集") {
      editButton.innerText = "保存"
      editButton.className = "btn bg-primary-subtle ms-2 me-1"
      const input = document.createElement("input")
      input.type = "text"
      input.value = currentElement.innerText
      input.className = currentElement.className
      input.style.width = currentElement.style.width
      currentElement.replaceWith(input)
      input.focus(); // すぐ入力できるようフォーカスを当てる
    } else {
      if (currentElement.value === "") {
        alert("TODOを入力してください")
        return
      }
      editButton.innerText = "編集"
      editButton.className = "btn bg-primary text-white ms-2 me-1"
      const span = document.createElement("span")
      span.innerText = currentElement.value
      span.className = currentElement.className
      span.style.width = currentElement.style.width
      currentElement.replaceWith(span)
    }
  })
  return editButton
}

const createDeleteButton = (checkbox) => {
  const deleteButton = document.createElement("button")
  deleteButton.className = "btn btn-danger"
  deleteButton.innerText = "削除"
  // 削除ボタンのクリックイベント
  deleteButton.addEventListener("click", (e) => {
    if (confirm("本当に削除してもよろしいですかご主人様？")) {
      deleteButton.closest("li").remove();
      // checkboxがチェックされてるかで、完了タスクか未完了タスクを-1するか判定
      e.target.checked ? completedTasks-- : incompleteTasks--
      updateTaskCounts()
    }
  })
  return deleteButton
}

const onClickAdd = () => {
  /**
   * 追加ボタン押されたら、入力値を変数に移してフォーム内は空にする
   * 必要な要素 (li, span, 編集button, 削除button)を作成
   * 表示する文字、クラス名などを追加
   * created-todoのidを持つulに、上記要素をくっつける
   */
  const inputText = document.getElementById("input-text").value;
  if (inputText === "") {
    alert("TODOを入力してください")
    return
  }
  document.getElementById("input-text").value = ""; 
  const li = createTodoItem(inputText)
  const ul = document.getElementById("created-todo");
  ul.appendChild(li)
  incompleteTasks++
  updateTaskCounts()
}

// 初期ロード
document.addEventListener("DOMContentLoaded", () => {
  updateTaskCounts();
})

// タスク追加時
document.getElementById("add-todo").addEventListener("click", onClickAdd)