window.onload = function(){

  // Referencing HTML tags
  var form = document.forms[0];
  var input = form.querySelector("input[type='text']");
  var addContainer = document.getElementById("add-cont");
  var groceriesContainer = document.getElementById("groceries-cont");
  var button = document.querySelector("button");

  // Creating new element
  var ul = document.createElement("ul");

  // Adding event listener for submit
  form.addEventListener("submit", function(e){

      e.preventDefault();

      var value = input.value.toLowerCase().trim();

      // if the value is 0, create a warning alert, apply CSS styles, prepend it and then make it disappear after few seconds
      // else, create new li element, set its text content to the value inserted, add it to the ul tag and alert success message. Make the message disappear after certain seconds
      if(value.length === 0){
          var warning = document.createElement("p");
          warning.textContent = "Please add a grocery";
          warning.classList.add("warning");
          input.style.borderBottom = "2px solid firebrick";
          input.style.transition = "border-bottom 1s";
          addContainer.prepend(warning);
          setTimeout(function(){
              addContainer.removeChild(warning);
          }, 2000);
      } else{
          var success = document.createElement("p");
          success.textContent = "Grocery added to list";
          success.classList.add("success");
          input.style.borderBottom = "2px solid darkcyan";
          input.style.transition = "border-bottom 1s";
          addContainer.prepend(success);
          setTimeout(function(){
              addContainer.removeChild(success);
          }, 2000);
          var li = document.createElement("li");
          var trashIcon = document.createElement("span");
          li.textContent = value;
          trashIcon.innerHTML = "<i class='fas fa-dumpster delete'></i>";
          li.appendChild(trashIcon);
          ul.appendChild(li);
          groceriesContainer.insertBefore(ul, button);
          form.reset();
      }
  });

  // Adding second event listener, when one wants to remove all groceries
  button.addEventListener("click", function(){

      // if innerHTML property of ul tag is truthy value (if exists), reset it to an empty string, and create new alert message, apply CSS styles, and make it disappear after few seconds
      // else, if all groceries have already been removed, and there is ntohing in the ul tag, create warning message, apply CSS styles and make it disappear after few seconds
      if(ul.innerHTML){
      ul.innerHTML = "";
      var success = document.createElement("p");
      success.textContent = "All groceries deleted";
      success.classList.add("success");
      groceriesContainer.prepend(success);
      setTimeout(function(){
          groceriesContainer.removeChild(success);
      }, 2000);
      }
      else{
          var warning = document.createElement("p");
          warning.textContent = "No more groceries to delete";
          warning.classList.add("warning")
          groceriesContainer.prepend(warning);
      setTimeout(function(){
          groceriesContainer.removeChild(warning);
      }, 2000);
      }
  });

  // Adding third event listener, stopping event bubbling, deleteing one item if the icon the mouseclick was pressed on contains delete class, creating an alert message, apply CSS, disappear after few seconds
  ul.addEventListener("click", function(e){

      e.stopPropagation();

      if(e.target.classList.contains("delete")){
          var li = e.target.parentNode.parentNode;
          ul.removeChild(li);
          var success = document.createElement("p");
          success.textContent = "Grocery successfully removed from the list";
          success.classList.add("success");
          groceriesContainer.prepend(success);
          setTimeout(function(){
              groceriesContainer.removeChild(success);
          }, 2000);
      }

  });

}
