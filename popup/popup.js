console.log("Clicked!")

const githubIssueButton = document.getElementById("github-issue");
githubIssueButton.addEventListener("click", openGithubIssuesPage);

function openGithubIssuesPage() {
  // open new tab with url
  chrome.tabs.create({url: "https://github.com/VeejaLiu/ConfluenceSideNavbar/issues"});
}
