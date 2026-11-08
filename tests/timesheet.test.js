const Timesheet = require('../src/timesheet');

describe('Timesheet', () => {
  test('submit returns true when given a project name and hours', () => {
    const timesheet = new Timesheet();

    const result = timesheet.submit('Project Alpha', 8);

    expect(result).toBe(true);
  });

  test('timesheets that are added can be retrieved as a list', () => {
    const timesheet = new Timesheet();

    timesheet.submit('Project Alpha', 8);
    timesheet.submit('Project Beta', 4);

    expect(timesheet.getAll()).toEqual([
      { projectName: 'Project Alpha', hours: 8 },
      { projectName: 'Project Beta', hours: 4 },
    ]);
  });

  test('total hours worked can be calculated from timesheets of one project', () => {
    const timesheet = new Timesheet();

    timesheet.submit('Project Alpha', 8);
    timesheet.submit('Project Alpha', 5);
    timesheet.submit('Project Beta', 4);

    expect(timesheet.getTotalHours('Project Alpha')).toBe(13);
  });
});

