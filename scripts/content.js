// console.log("Matched!");

function generateDiv(headingObjs) {
  // 在整个页面上添加一个div，悬浮在页面右侧，上下保持中央，显示所有标题，点击标题可以跳转到对应的标题
  const div = document.createElement("div");
  div.style.position = "fixed"; // 定位
  div.style.right = "0"; // 位置
  div.style.top = "50%"; // 位置
  div.style.transform = "translateY(-50%)"; // 上下居中
  div.style.width = "15%"; // 宽度
  div.style.maxWidth = "250px"; // 最大宽度
  div.style.height = "50%"; // 高度
  div.style.margin = "auto"; // 左右居中
  div.style.backgroundColor = "rgb(235,236,240)"; // 背景颜色
  div.style.color = "white"; // 字体颜色
  div.style.padding = "10px"; // 内边距
  div.style.overflowY = "scroll"; // 显示垂直滚动条
  div.style.overflowX = "hidden"; // 隐藏水平滚动条
  div.style.zIndex = "99"; // 层级
  div.style.borderRadius = "10px"; // 圆角
  div.innerHTML = headingObjs.map((headingObj) => {
    let result = "";
    /*
     * add #, the number of # is the level of the heading, level 1 is #, level 2 is ##, level 3 is ###, ...
     * if level is 1, keep left padding 0px
     * if level is 2, keep left padding 5px
     * if level is 3, keep left padding 10px
     * ...
     *
     * 如果显示不完，不要换行
     */
    const paddingLeft = (headingObj.level - 1) * 5;
    // result += `<a href="#${headingObj.href}" style="display: block; padding-left: ${paddingLeft}px;">${"#".repeat(headingObj.level)} ${headingObj.text}</a>`;
    result += `<a href="#${headingObj.href}" style="display: block; padding-left: ${paddingLeft}px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${headingObj.text}">${headingObj.text}</a>`;
    return result;
  }).join("");
  return div;
}

function generateButton(div) {
  const button = document.createElement("button");
  button.style.position = "fixed";
  button.style.right = "0";
  button.style.top = "45%";
  button.style.width = "30px";
  button.style.height = "30px";
  button.style.border = "none";
  button.style.backgroundColor = "rgb(235,236,240)";
  button.style.color = "black";
  button.style.transform = "rotate(0deg)";
  button.style.zIndex = "100";
  button.innerHTML = "&#10148;";
  div.style.display = "block";
  button.onclick = () => {
    // console.log("Clicked!")
    // console.log("div.style.display" + div.style.display)
    if (div.style.display === "none") {
      div.style.display = "block";
      button.style.transform = "rotate(0deg)";
    } else {
      div.style.display = "none";
      button.style.transform = "rotate(180deg)";
    }
    // console.log("div.style.display" + div.style.display)
  };
  return button;

}

/**
 * Get all headings' text content, and convert it to an array
 * return value format:
 * [
 *  {text: "heading1", href: "heading1", level: 1},
 *  {text: "heading2", href: "heading2", level: 2},
 *  {text: "heading3", href: "heading3", level: 3},
 *  ...
 *  {text: "headingN", href: "headingN", level: N},
 *  ]
 * @return {*[]}
 * @param content
 */
function getAllHeadingObjects(content) {
  // find all h1, h2, h3, h4 ... h6 elements
  const headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6");
  // console.log("Found headings:", headings);

  // get all headings' text content, and convert it to an array
  const headingObjs = [];
  for (const heading of headings) {
    let text = heading.textContent;
    // href is id of the heading
    const href = heading.id;
    const level = parseInt(heading.tagName[1]);
    headingObjs.push({
      text: text, href: href, level: level,
    });
  }
  // console.log("Heading objects:", headingObjs);
  return headingObjs;
}

function main() {
// find the element with the id "content"
  const content = document.querySelector("#content");
// `document.querySelector` may return null if the selector doesn't match anything.
  if (content) {
    // console.log("Found content!");
    const headingObjs = getAllHeadingObjects(content);
    if (headingObjs.length === 0) {
      // console.log("No heading found.");
      return;
    }
    const div = generateDiv(headingObjs);
    const button = generateButton(div);
    document.body.appendChild(div);
    document.body.appendChild(button);
  } else {
    // console.log("Couldn't find content.");
  }
}

main();
