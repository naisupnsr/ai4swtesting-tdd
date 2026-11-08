**Accuracy**

1. **What happens when time worked doesn't fall on a half-hour boundary?** - Features say time is tracked in half hour units. If someone works 20 or 45 minutes, is it rounded up, rounded down, to the nearest half hour, or rejected? Without a rule, totals can differ from the real time worked.

2. **What are the minimum and maximum amounts of time that can be entered?** - Can a user enter 0, a negative value, or more than 24 hours in a day? We need limits to define valid and invalid inputs.

3. **How is "a project" validated when a timesheet is completed?** - Must the project already exist, be active, and be assigned to this user? Can time be logged against a closed or archived project?

4. **When is a timesheet considered "complete"?** - Is it complete per entry, per day, or per week? Does completing it lock the data, or can it still be edited afterwards?

5. **How is the total time per project calculated for the history?** - Should totals be summed across days and weeks, and how are partial units and edited entries handled? We need this to verify that the history reflects the actual time spent.

**Consistency**

6. **How should time be displayed and entered across the application?** - Is it shown as hours (1.5), hours and minutes (1h 30m), or units (3 units)? The format should be the same on the entry form, history, and reports.

7. **Who counts as "I" in "Only I should be able to see my tracked time"?** - Can managers, project owners, or admins view it? If yes, the rule needs to be applied the same way on every screen, report, and API.

8. **Where else can tracked time appear, and does the privacy rule hold there too?** - Exports, aggregated project totals, notifications, and shared dashboards may reveal individual time. We need the access rule to be the same everywhere.

9. **When the same project and day is entered more than once, what happens?** - Are the entries merged, kept as separate records, or rejected as duplicates? The history and totals must behave the same however the entries were made.

10. **What happens to existing history when a project is renamed, deleted, or reassigned?** - Past entries must stay consistent with the project data. Do they keep the old name, update to the new one, or become orphaned?