const MAX_HOURS_PER_SUBMISSION = 24;
const SCALE = 100; // hours are stored as integer hundredths to avoid float drift

function normalizeName(projectName) {
  if (typeof projectName !== 'string') {
    throw new TypeError('projectName must be a string');
  }
  const trimmed = projectName.trim().replace(/\s+/g, ' ');
  if (trimmed === '') {
    throw new RangeError('projectName must not be empty');
  }
  return trimmed;
}

function toUnits(hours) {
  if (typeof hours !== 'number' || !Number.isFinite(hours)) {
    throw new TypeError('hours must be a finite number');
  }
  if (hours <= 0) {
    throw new RangeError('hours must be greater than 0');
  }
  if (hours > MAX_HOURS_PER_SUBMISSION) {
    throw new RangeError(`hours must not exceed ${MAX_HOURS_PER_SUBMISSION} per submission`);
  }
  const units = Math.round(hours * SCALE);
  if (Math.abs(units / SCALE - hours) > 1e-9) {
    throw new RangeError('hours must have at most 2 decimal places');
  }
  return units;
}

class Timesheet {
  // Private state: cannot be modified from outside except through the API.
  #totals = new Map(); // normalized key -> { projectName, units }
  #entries = []; // immutable submission history (audit trail)

  /**
   * Records hours for a project. Validates input and throws on invalid data;
   * returns true only when the hours were actually stored.
   * Optional `context` ({ employee, date }) is kept in the audit history.
   * The method is fully synchronous, so each update is atomic.
   */
  submit(projectName, hours, context = {}) {
    const name = normalizeName(projectName);
    const units = toUnits(hours);
    const key = name.toLowerCase();

    const existing = this.#totals.get(key);
    if (existing) {
      existing.units += units;
    } else {
      this.#totals.set(key, { projectName: name, units });
    }

    this.#entries.push(
      Object.freeze({
        projectName: this.#totals.get(key).projectName,
        hours: units / SCALE,
        employee: context && context.employee,
        date: context && context.date,
      })
    );
    return true;
  }

  getAll() {
    return Array.from(this.#totals.values(), ({ projectName, units }) => ({
      projectName,
      hours: units / SCALE,
    }));
  }

  /** Returns the total hours for a project, or 0 if it has no timesheets. */
  getTotalTimesheetHours(projectName) {
    const entry = this.#totals.get(normalizeName(projectName).toLowerCase());
    return entry ? entry.units / SCALE : 0;
  }

  /** Copy of every individual submission, so totals can be traced and audited. */
  getHistory() {
    return this.#entries.map((entry) => ({ ...entry }));
  }

  /** Serializable snapshot, so data can be persisted by the caller. */
  toJSON() {
    return this.getHistory();
  }

  /** Rebuilds a Timesheet from a snapshot produced by toJSON(). */
  static fromJSON(entries) {
    const timesheet = new Timesheet();
    for (const { projectName, hours, employee, date } of entries) {
      timesheet.submit(projectName, hours, { employee, date });
    }
    return timesheet;
  }
}

module.exports = Timesheet;
