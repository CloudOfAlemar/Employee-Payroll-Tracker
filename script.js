// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = function() {
  // TODO: Get user input to create and return an array of employee objects

  // Collect employees
  const employees = [];

  // Continue collecting while true
  let keepCollecting = true;
  while( keepCollecting ) {

    // Build employee object
    const employeeObj = {};

    // First name ( if null, break from loop )
    let fname = prompt( "Enter first name?" );
    if( !fname ) break;

    // Last name ( if null, break from loop )
    let lname = prompt( "Enter last name" );
    if( !lname ) break;

    // Salary ( if null, break from loop )
    let salary = prompt( "Enter salary" );
    if( !salary ) break;

    // add properties to object
    employeeObj.firstName = fname;
    employeeObj.lastName = lname;
    employeeObj.salary = isNaN( Number( salary ) ) ? 0 : Number( salary );
    employees.push( employeeObj );

    // Set keep collecting to false if addEmployee is false
    const addEmployee = confirm( "Do you want to add another employee?" );
    if( !addEmployee ) keepCollecting = false;
  }

  // return employees array
  return employees;
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  // TODO: Calculate and display the average salary

  // Store total amount of employees
  const totalEmployees = employeesArray.length;

  // Start the total salary at 0
  let total = 0;

  // Sum up all salaries
  for( const { salary } of employeesArray ) {
    total += salary;
  }

  // Store the average of the salaries
  const average = total / totalEmployees;

  // Store the USD Currency style of the average salary
  const usCurrency = average ? average.toLocaleString("en-US",{
    style:"currency",
    currency:"USD"
  }) : "$0";

  // Store average text to display in console
  const averageText = `The average employee salary between our ${ totalEmployees } employee(s) is ${ usCurrency }`;
  console.log( averageText );
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  // TODO: Select and display a random employee

  // Get random index
  const randomIndex = Math.floor( Math.random() * employeesArray.length );
  
  // Store random employee
  const employee = employeesArray[ randomIndex ];

  if( employee ) {
  
    // Store congrats text
    const congratsText = `Congratulations to ${ employee.firstName } ${ employee.lastName }, our random drawing winner!`;
  
    // Console congrats text
    console.log( congratsText );
  }
}
/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();
  console.log( employees );

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
