const user = document.querySelector('.user');
const userDeleteButton = user.querySelector('.user-delete');
const userUpdateButton = user.querySelector('.user-update');
const tasksContainer = document.querySelector('.tasks');
const taskElements = tasksContainer.querySelectorAll('.task');


let userId = "";
getUser().then(id => {
   console.log("Current user:", id);
   userId = id;
   readUserJson(id).then(data =>{
      updateUserProfile(user, data);
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
 

userDeleteButton.addEventListener('click', async function () {
   await deleteUser(userId);
   location.reload();
});

userUpdateButton.addEventListener('click', async function () {
   var userBtn = document.getElementById('userBtn');
   const userId = user.querySelector('.user-id').value;
   const name = user.querySelector('.user-name').value;
   console.log("update name:", name);
   userBtn.style.display="none";
   await createOrUpdateUser(userId, name).then(a=>{
      readUserTasksJson(userId).then(dataList => {
         dataList.forEach(item => {
            //  alert(item.id);
           createNewTaskUI(item);
         });
       });
   })
});

function updateUserProfile(user, userProfile) {
   user.querySelector('.user-id').value = userProfile.id;
   user.querySelector('.user-name').value = userProfile.name;
}

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
 

function deleteTask(id){
   document.getElementById(id+"taskitem").style.display = 'none';
   console.log(id);
   deleteUserTask(userId, id);
}

function toggleNewTitle() {
   document.querySelector('.new-title').value = '';
    document.querySelector('.new-description').value = '';
   var newTitleCollapse = new bootstrap.Collapse(document.getElementById("new-title"), {
     toggle: true
   });
 }

document.getElementById("createTaskForm").addEventListener("click", async function (event) {
   event.preventDefault();
   const title = document.getElementsByClassName("new-title")[0].value;
   const description = document.getElementsByClassName("new-description")[0].value;

   // Now you can use these variables to create or process your task as needed
   const newTaskData = {
      'title':title,
      'description':description,
   }
   const id = await createUserTaskJson(userId, newTaskData);
   const createdTaskData = {
      'id':id,
      'title':title,
      'description':description,
   }
   createNewTaskUI(createdTaskData);
   
   toggleNewTitle();
});



