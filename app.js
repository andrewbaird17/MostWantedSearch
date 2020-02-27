/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){

  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      // TODO: search by name
      // Call the function of searchByName pass in the people array 
      var person = searchByName(people);
      mainMenu(person,people);
      break;
    case 'no':
      // TODO: search by traits
      var person = searchByTraits(people); //master function to take people, choose a trait to narrow down by, display that list of people, ask to narrow down by more traits (yes or no prompt), repeat process until only one person is left 
      mainMenu(person,people);
      break;
    default:
      alert("Invalid input. Please try again!");
      app(people); // restart app
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      // TODO: get person's info
      displayPerson(person);
      mainMenu(person,people);
      break;
    case "family":
      // TODO: get person's family
      break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

// search by multiple traits works except the recursive call back kills the end result and makes it the final result
// may have to return each list to the 'no' option of app() function, do the check for length === 1 and then pass the person if true otherwise recursively call searchbyTraits with filteredlist
function searchByTraits(people){
  var person;
  var traitType = promptFor("Which trait would you like to search for? Choose one of the following: gender, dob, height, weight, eyecolor, occupation",chars).toLowerCase();
  switch(traitType){
    // utilize displayPeople to display the list of narrowed down people
    // need to check for if fileterPeople.length === 1, then break and return the person
    // need to use recursion to let person which trait to sort by next if filterPeople.length > 1
    case 'gender':
      var response = promptFor("Which gender to filter by? male or female", chars).toLowerCase();
      var filteredPeople = searchBySingleTrait(people,response,"gender");
      displayPeople(filteredPeople);
      if(filteredPeople.length === 1){
        person = filteredPeople[0];
      } else if(filteredPeople.length > 1){
        // return the filteredPeople array to use elsewhere to narrow down search
        searchByTraits(filteredPeople);
      } else{ 
        person = null;
      }
      break;
    case 'dob':
      var response = promptFor("Type in the Date of Birth in m/d/year format", chars);
      var filteredPeople = searchBySingleTrait(people,response,"dob");
      displayPeople(filteredPeople);
      if(filteredPeople.length === 1){
        var person = filteredPeople[0];
      } else if(filteredPeople.length > 1){
        // return the filteredPeople array to use elsewhere to narrow down search
        searchByTraits(filteredPeople);
      } else{ 
        var person = null;
      }
      break;
    case 'height':
      var response = parseInt(promptFor("Enter height:", chars));
      var filteredPeople = searchBySingleTrait(people,response,"height");
      displayPeople(filteredPeople);
      if(filteredPeople.length === 1){
        var person = filteredPeople[0];
      } else if(filteredPeople.length > 1){
        // return the filteredPeople array to use elsewhere to narrow down search
        searchByTraits(filteredPeople);
      } else{ 
        var person = null;
      }
      break;
    case 'weight':
      var response = parseInt(promptFor("Enter weight", chars));
      var filteredPeople = searchBySingleTrait(people,response,"weight");
      displayPeople(filteredPeople);
      if(filteredPeople.length === 1){
        var person = filteredPeople[0];
      } else if(filteredPeople.length > 1){
        // return the filteredPeople array to use elsewhere to narrow down search
        searchByTraits(filteredPeople);
      } else{ 
        var person = null;
      }
      break;
    case 'eyecolor':
      var response = promptFor("Enter the eye color to filter by: ", chars).toLowerCase();
      var filteredPeople = searchBySingleTrait(people,response,"eyeColor");
      displayPeople(filteredPeople);
      if(filteredPeople.length === 1){
        var person = filteredPeople[0];
      } else if(filteredPeople.length > 1){
        // return the filteredPeople array to use elsewhere to narrow down search
        searchByTraits(filteredPeople);
      } else{ 
        var person = null;
      }
      break;
    case 'occupation':
      var response = promptFor("Enter the occupation to filter by: ", chars).toLowerCase();
      var filteredPeople = searchBySingleTrait(people,response,"occupation");
      displayPeople(filteredPeople);
      if(filteredPeople.length === 1){
        var person = filteredPeople[0];
      } else if(filteredPeople.length > 1){
        // return the filteredPeople array to use elsewhere to narrow down search
        searchByTraits(filteredPeople);
      } else{ 
        var person = null;
      }
      break;
    default:
      alert("Invalid input. Please try again!");
      searchByTraits(people);
  }
  return person;
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  let filteredPeople = people.filter(function(el) {
    if(el.firstName === firstName && el.lastName === lastName) {
      return el;
    }
  });

  // TODO: What to do with filteredPeople?
  // Use below two lines if figure out how to handle check of object vs array in searchByTraits function
  //var person = checkFilteredList(filteredPeople);
  //return person
  if(filteredPeople.length === 1){
    var person = filteredPeople[0];
    return person;
  } else if(filteredPeople.length > 1){
    // return the filteredPeople array to use elsewhere to narrow down search
    return filteredPeople;
  } else{ 
    var person = null;
    return person;
  }
}

/* function checkFilteredList(filteredPeople){
  if(filteredPeople.length === 1){
    let person = filteredPeople[0];
    return person;
  } else if(filteredPeople.length > 1){
    // return the filteredPeople array to use elsewhere to narrow down search
    return filteredPeople;
  } else{ 
    let person = null;
    return person;
  }
} */

function searchBySingleTrait(people,response,trait){

  let filteredPeople = people.filter(function(el) {
    if(el[trait] === response){
      return el;
    }
  });
  return filteredPeople;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation;
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, callback){
  do{
    var response = prompt(question).trim();
  } while(!response || !callback(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}