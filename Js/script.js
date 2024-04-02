document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('agentForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get form data
        var formData = new FormData(this);
        var agentNames = formData.get('agentNames');
        var callCenter = formData.get('callCenter');

        // Split agent names by comma and trim whitespace
        var namesArray = agentNames.split(',').map(function(name) {
            return name.trim();
        });

        // Get current date and time
        var currentDate = new Date().toLocaleString();

        // Append each agent name with date to the selected call center column
        var callCenterColumn = document.getElementById(callCenter);
        var agentList = callCenterColumn.querySelector('ul');
        if (!agentList) {
            agentList = document.createElement('ul');
            callCenterColumn.appendChild(agentList);
        }
        namesArray.forEach(function(name) {
            var agentItem = document.createElement('li');
            agentItem.innerHTML = '<span>' + name + '</span> <span class="assignment-date">' + currentDate + '</span>';
            
            // Add delete and edit buttons for each agent
            var deleteEditContainer = document.createElement('div');
            deleteEditContainer.classList.add('delete-edit-container');
            
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.onclick = function() {
                agentList.removeChild(agentItem);
            };
            
            var editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-btn');
            editButton.onclick = function() {
                var newName = prompt('Enter new name:', agentItem.querySelector('span').textContent);
                if (newName !== null && newName.trim() !== '') {
                    agentItem.querySelector('span').textContent = newName.trim();
                }
            };
            
            deleteEditContainer.appendChild(deleteButton);
            deleteEditContainer.appendChild(editButton);
            agentItem.appendChild(deleteEditContainer);

            agentList.appendChild(agentItem);
        });

        // Display confirmation message
        document.getElementById('message').innerHTML = namesArray.length + " agent(s) assigned to " + callCenter + " call center.";

        // Clear form input after submission
        this.reset();
    });
});
