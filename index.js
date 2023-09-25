const http = require("http");
const employees = require("./Employee");

console.log("Lab 03 - NodeJs");


const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  let response = {};
  let statusCode = 200;
  let contentType = "application/json";

  if (req.method !== "GET") {
    statusCode = 405;
    response = { error: http.STATUS_CODES[statusCode] };
  } else if (req.url === "/") {
    contentType = "text/html";
    response = "<html><body><h1>Welcome to Lab Exercise 03</h1></body></html>";
  } else if (req.url === "/employee") {
    response = employees;
  } else if (req.url === "/employee/names") {
    const sortedEmployee = employees
      .map((employee) => `${employee.firstName} ${employee.lastName}`)
      .sort();
    response = sortedEmployee;
  } else if (req.url === "/employee/totalsalary") {
    const totalSalary = employees.reduce((sum, employee) => sum + employee.Salary, 0);
    response = { total_salary: totalSalary };
  } else {
    statusCode = 404;
    response = { error: http.STATUS_CODES[statusCode] };
  }

  res.statusCode = statusCode;
  res.setHeader("Content-Type", contentType);
  res.end(typeof response === "string" ? response : JSON.stringify(response));
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
