class Timesheet {
  constructor() {
    this.timesheets = new Map();
  }

  submit(projectName, hours) {
    if (this.timesheets.has(projectName)) {
      this.timesheets.set(projectName, this.timesheets.get(projectName) + hours);
    } else {
      this.timesheets.set(projectName, hours);
    }
    return true;
  }

  getAll() {
    return Array.from(this.timesheets, ([projectName, hours]) => ({
      projectName,
      hours,
    }));
  }

  getTotalTimesheetHours(projectName) {
    return this.timesheets.get(projectName);
  }
}

module.exports = Timesheet;
