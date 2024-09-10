let allTasks = 0
let completedTasks = 0

const updateTaskCounts = () => {
  document.getElementById("all-tasks").innerText = allTasks
  document.getElementById("completed-tasks").innerText = completedTasks
  document.getElementById("incomplete-tasks").innerText = allTasks - completedTasks
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
    confirm("TODOを入力してください")
    return
  }
  document.getElementById("input-text").value = ""; 
  const li = document.createElement("li");
  li.style = "list-style: none;"
  li.className = "d-flex align-items-center bg-info py-2"

  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  checkbox.className = "form-check-input me-2"
  checkbox.addEventListener("change", (e) => {
    /**
     * チェックボタンがチェックされたら、完了済みに+1して、未完了から-1する
     * チェックボタンが空にだったら、完了済みを-1して、未完了を+1する
     * 未完了の値は、[全体 - 完了済み] なので、完了済みをいじるだけで済む
     */
    if (e.target.checked) {
      completedTasks++;
    } else {
      completedTasks--
    }
    updateTaskCounts()
  })

  const span = document.createElement("span");
  span.innerText = inputText;
  span.className = "form-control"
  span.style.width = "250px"

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
     *   保存ボタン(editButton)の直前のinputを取得
     *   新しいspanタグを作る
     *   inputに書いた文字を新しいspanに移し替える
     */
    const currentElement = editButton.previousElementSibling
    if (editButton.innerText === "編集") {
      editButton.innerText = "保存"
      const input = document.createElement("input")
      input.type = "text"
      input.value = currentElement.innerText
      input.className = currentElement.className
      input.style.width = currentElement.style.width
      currentElement.replaceWith(input)
      input.focus(); // 入力フィールドにフォーカスを当てる
    } else {
      editButton.innerText = "編集"
      const span = document.createElement("span")
      span.innerText = currentElement.value
      span.className = currentElement.className
      span.style.width = currentElement.style.width
      currentElement.replaceWith(span)
    }
  })

  const deleteButton = document.createElement("button")
  deleteButton.className = "btn btn-danger"
  deleteButton.innerText = "削除"
  // 削除ボタンのクリックイベント
  deleteButton.addEventListener("click", (e) => {
    deleteButton.closest("li").remove();
    allTasks--
    updateTaskCounts()
  })

  li.appendChild(checkbox)
  li.appendChild(span)
  li.appendChild(editButton)
  li.appendChild(deleteButton)

  const ul = document.getElementById("created-todo");
  ul.appendChild(li)
  allTasks++
  updateTaskCounts()
}

// 初期ロード
document.addEventListener("DOMContentLoaded", () => {
  updateTaskCounts();
})

// タスク追加時
document.getElementById("add-todo").addEventListener("click", onClickAdd)