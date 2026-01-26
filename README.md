# TaskMaster – Accessible To-Do List

## Description
TaskMaster is a simple, accessible to-do list application that helps users manage daily tasks. Users can add tasks, mark them as completed, delete tasks, and filter tasks based on their status. Tasks are saved locally so they remain available after refreshing the page.

This project emphasizes clean JavaScript logic, accessibility best practices, and usability.

---

## How to Use

1. Type a task into the input field labeled "New Task".
2. Click the **Add Task** button or press **Enter** on your keyboard.
3. Your task will appear in the list below.
4. Use the checkbox next to a task to mark it as **completed**.
5. Use the filter buttons:
   - **All** – shows all tasks
   - **Active** – shows only incomplete tasks
   - **Completed** – shows only completed tasks
6. Click the **trash (🗑️) icon** to permanently delete a task.

Tasks automatically save and reload when the page is refreshed.

---

## Completed Tasks vs Deleted Tasks

- **Completed tasks**:
  - Are marked using the checkbox.
  - Remain visible under the **Completed** filter.
  - Can be marked as active again by unchecking the box.

- **Deleted tasks (trash icon)**:
  - Are permanently removed from the list.
  - Cannot be restored once deleted.
  - This button functions as a delete action, not a temporary archive.

If a task is deleted accidentally, it must be re-added manually.

---

## Accessibility Features

TaskMaster was built with accessibility in mind:

- All interactive elements are keyboard accessible.
- Labels and aria-label attributes provide context for screen readers.
- Validation messages are announced using `aria-live`.
- Focus is automatically placed on the task input when the page loads.
- Clear visual indicators distinguish completed tasks.

---

## JavaScript Overview

Tasks are stored as objects in an array, allowing the app to scale beyond basic DOM manipulation. Each task includes a unique ID, text content, and a completion state.

The app uses:
- Reusable render logic to update the interface
- Array methods such as `filter()` for task filtering
- localStorage to persist data across page refreshes

This structure improves maintainability and reflects real-world application patterns.

---

## Testing

This project was retested on January 26, 2026 after improvements were made. Core functionality, keyboard navigation, accessibility behavior, filtering, and localStorage persistence were verified.

---

## Future Improvements

Possible future enhancements include:
- Edit-in-place task updates
- Task priority levels
- Confirmation before deleting tasks
- Visual feedback when filters are applied

All core functions (adding, completing, deleting, filtering, and persistence) were tested and function as expected.


