const { configure } = require("@storybook/react")
const Events = require("../Utils/Events").default
const req = require.context("../", true, /\.story\.tsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)

Events.onEvent(data => {
  console.log("Tracked event", data)
})

// TODO: Fix the below
// setOptions({
//   name: "Reaction",
//   url: "http://artsy.github.io/reaction",
//   showDownPanel: false,
//   sortStoriesByKind: true,
// })
