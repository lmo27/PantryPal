let query = "";
var ingr = [];
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  //printArray();
  ingr.push(ev.target.id);
  query= query + ev.target.id + ",";
}

function drop(ev) {
  ev.preventDefault();
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
   // Push the dropped data into the array
  console.log(ingr);
}

function printArray() {
  var outputElement = document.getElementById('output');
  outputElement.innerHTML = '<p>Array Content:</p><ul>';
  ingr.forEach(function(item) {
    outputElement.innerHTML += '<li>' + item + '</li>';
  });
  outputElement.innerHTML += '</ul>';
}

function generateRecipe() {
  const apiBaseUrl = "https://api.edamam.com/search";
  const ingredientsInput = document.getElementById("ingredients");
  const recipeContainer = document.getElementById("recipe");
  
  const ingredients = ingredientsInput.value.trim().split(",");
  const apiKey = "a684a78ffb4f07b579b1fe9a5bc8bc0b";
  const appID = "c15ba7dc";
  const queryText = ingredients.join(",");
  const apiUrl = `${apiBaseUrl}?q=${query}&app_id=${appID}&app_key=${apiKey}`;

  // Make an API request to fetch recipes based on ingredients
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
      // Display the recipe
      if (data.hits && data.hits.length > 0) {
          const recipe = data.hits[0].recipe; // You can choose a specific recipe from the results
          recipeContainer.innerHTML = `
              <h3>${recipe.label}</h3>
              <p>Ingredients: ${recipe.ingredientLines.join(", ")}</p>
              <p>Instructions: ${ "\n" + recipe.url}</p>
          `;
      } else {
          recipeContainer.innerHTML = "No recipes found with these ingredients.";
      }
  })
  .catch(error => {
      console.error("Error fetching data:", error);
      recipeContainer.innerHTML = "An error occurred while fetching data.";
  });

}


// import interact from 'interactjs'

// // enable draggables to be dropped into this
// interact('.dropzone').dropzone({
//     // only accept elements matching this CSS selector
//     accept: '#yes-drop',
//     // Require a 75% element overlap for a drop to be possible
//     overlap: 0.75,
  
//     // listen for drop related events:
  
//     ondropactivate: function (event) {
//       // add active dropzone feedback
//       event.target.classList.add('drop-active')
//     },
//     ondragenter: function (event) {
//       var draggableElement = event.relatedTarget
//       var dropzoneElement = event.target
  
//       // feedback the possibility of a drop
//       dropzoneElement.classList.add('drop-target')
//       draggableElement.classList.add('can-drop')
//       draggableElement.textContent = 'Dragged in'
//     },
//     ondragleave: function (event) {
//       // remove the drop feedback style
//       event.target.classList.remove('drop-target')
//       event.relatedTarget.classList.remove('can-drop')
//       event.relatedTarget.textContent = 'Dragged out'
//     },
//     ondrop: function (event) {
//       event.relatedTarget.textContent = 'Dropped'
//     },
//     ondropdeactivate: function (event) {
//       // remove active dropzone feedback
//       event.target.classList.remove('drop-active')
//       event.target.classList.remove('drop-target')
//     }
//   })
  
//   interact('.drag-drop')
//     .draggable({
//       inertia: true,
//       modifiers: [
//         interact.modifiers.restrictRect({
//           restriction: 'parent',
//           endOnly: true
//         })
//       ],
//       autoScroll: true,
//       // dragMoveListener from the dragging demo above
//       listeners: { move: dragMoveListener }
//     })
