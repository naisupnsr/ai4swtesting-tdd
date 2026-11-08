const Timesheet = require('../src/timesheet');

describe('Timesheet', () => {
  test('submit returns true when given a project name and hours', () => {
    const timesheet = new Timesheet();

    const result = timesheet.submit('Project Alpha', 8);

    expect(result).toBe(true);
  });
});

