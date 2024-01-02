const userDiv = document.querySelector('.user');
const tasksContainer = document.querySelector('.tasks');

/// Window onload load user data
let userId = "";
getUser().then(id => {
   console.log("Current user:", id);
   userId = id;
   readUserJson(id).then(data =>{
    // Update user profile
   user.querySelector('.user-id').value = data.id;
   user.querySelector('.user-name').value = data.name;
      readUserTasksJson(id).then(dataList => {
         dataList.forEach(item => {
            //  alert(item.id);
           createNewTaskUI(item);
         });
       });
   })
 }).catch(error => {
   console.error("Error getting user:", error);
});
 
// Delete user account
function DeleteAcct() {
   deleteUser(userId).then(a=>{
    location.reload();
   })
};

// Update user account
function UpdateUserAcct() {
   document.getElementById('userBtn').style.display="none";
   const userId = userDiv.querySelector('.user-id').value;
   const name = userDiv.querySelector('.user-name').value;
   console.log("update name:", name);
   updateUserName(userId, name);
};

// On creating neww task
function createNewTaskUI(createdTaskData) {
   try {
     // Create a new task element dynamically
     const newTaskElement = document.createElement('div');
     newTaskElement.id = createdTaskData.id+"taskitem";
     newTaskElement.classList.add('row', 'mt-2', 'task');
 
     newTaskElement.innerHTML = `
       <div class="col">
         <div class="form-group id-data" data-toggle="collapse" data-target="#task${createdTaskData.id}task">
           <input type="text" class="form-control title" placeholder="${createdTaskData.title}" readonly>
         </div>
         <div class="collapse mt-3 id" id="task${createdTaskData.id}task">
           <div>
             <div class="form-group">
               <textarea class="form-control description" rows="3" placeholder="${createdTaskData.description}" readonly required></textarea>
             </div>
           </div>
           <button class="btn btn-sm btn-danger task-delete" onclick="deleteTask('${createdTaskData.id}')">Delete Task</button>
         </div>
       </div>
     `;
 
     
     const tasksContainer = document.getElementById('tasksContainer');
     if (tasksContainer) {
       tasksContainer.insertBefore(newTaskElement, tasksContainer.firstChild);
     } else {
       console.error("Tasks container not found");
     }
   } catch (error) {
     console.error("Error creating new task UI:", error);
   }
}
 
// On deleting task
function deleteTask(id){
   document.getElementById(id+"taskitem").style.display = 'none';
   console.log(id);
   deleteUserTask(userId, id);
}

// Create new task
function createTaskForm(event) {
   event.preventDefault();
   const title = document.getElementsByClassName("new-title")[0].value;
   const description = document.getElementsByClassName("new-description")[0].value;
   const newTaskData = {
      'title':title,
      'description':description,
   }
   const id = createUserTaskJson(userId, newTaskData).then(a=>{
   const createdTaskData = {
    'id':id,
    'title':title,
    'description':description,
 }
 createNewTaskUI(createdTaskData);
   });
   title.value = '';
   description.value = '';
   bootstrap.Collapse(document.getElementById("new-title"), {
     toggle: true
   });
};


