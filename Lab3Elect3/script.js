// script.js
$(document).ready(function() {
    let taskCount = 0;

    // Form submission handler
    $('#taskForm').submit(function(event) {
        event.preventDefault();

        // Get values from form
        const taskName = $('#taskName').val().trim();
        const taskDesc = $('#taskDesc').val().trim();

        // Validate form fields
        if (!taskName || !taskDesc) {
            alert('Both task name and description are required.');
            return;
        }

        // Increment task count
        taskCount++;

        // Append new task to the table
        const taskRow = `
            <tr>
                <td>${taskCount}</td>
                <td>${taskName}</td>
                <td>${taskDesc}</td>
                <td><button class="deleteTask">Delete</button></td>
            </tr>
        `;

        $('#taskTable tbody').append(taskRow);

        // Clear the form fields
        $('#taskName').val('');
        $('#taskDesc').val('');

        // Update numbering in the table
        updateTaskNumbers();
    });

    // Function to handle task deletion with confirmation
    $('#taskTable').on('click', '.deleteTask', function() {
        // Confirmation prompt before deleting
        const confirmDelete = confirm('Are you sure you want to delete this task?');
        if (confirmDelete) {
            // If confirmed, remove the task
            $(this).closest('tr').remove();

            // Update task numbers after a task is deleted
            updateTaskNumbers();
        }
    });

    // Function to update task numbering
    function updateTaskNumbers() {
        let rowIndex = 1;
        $('#taskTable tbody tr').each(function() {
            $(this).find('td:first').text(rowIndex);
            rowIndex++;
        });

        // Update task count to reflect the correct number of tasks
        taskCount = rowIndex - 1;
    }
});
