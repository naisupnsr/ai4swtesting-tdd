class Timesheet {
  constructor() {
    this.timesheets = new Map();
  }

  submit(projectName, hours) {
    this.timesheets.set(projectName, hours);
    return true;
  }

  getAll() {
    return Array.from(this.timesheets, ([projectName, hours]) => ({
      projectName,
      hours,
    }));
  }
}

module.exports = Timesheet;
