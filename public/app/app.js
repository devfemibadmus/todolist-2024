const userDiv = document.querySelector('.user');
const tasksContainer = document.querySelector('.tasks');

/// Window onload load user data
let userId = "";
let userName = ""
// Function to extract query parameters from the URL
function getQueryParameter(parameterName) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(parameterName);
}

window.onload = function (){
  //
  const id = getQueryParameter('id') || 'Not specified';
  const name = getQueryParameter('name') || 'Not specified';
  const taskId = getQueryParameter('taskId') || 'Not specified';
  if(id!='Not specified' && name!='Not specified' && taskId==='Not specified'){
    userId = id;
    userName = name
    readUserJson(id).then(data =>{
      if(data.name.replace(/\s+/g, '')===name.replace(/\s+/g, '')){
      // Update user profile
      userDiv.querySelector('.user-id').value = data.id;
      userDiv.querySelector('.user-name').value = data.name;
        readUserTasksJson(id).then(dataList => {
           dataList.forEach(item => {
              //  alert(item.id);
             createNewTaskUI(item);
           });
         });}
         else{
          // console.log(data.name);
          // console.log(name);
          $('body').html("<p style='text-align: center;'>Invalid credentials</p>");
         }
     })
  }
  else if(id!='Not specified' && taskId!='Not specified'){
    // alert("HI")
    readUserJson(id).then(data =>{
      // Update user profile
      userName = data.name;
      userDiv.querySelector('.user-id').value = data.id;
      userDiv.querySelector('.user-name').value = data.name;
      userDiv.querySelector('.user-name').removeAttribute('onclick');
      document.getElementsByClassName('createTask')[0].style.display="none";
      readUserTaskByIdJson(id, taskId).then(data => {
        // alert(data)
        createNewTaskUI(data);
        document.getElementsByClassName('task-delete')[0].style.display="none";
        document.getElementsByClassName('collapse')[0].style.display="none";
         });
     })
  }
  else{
    // alert("NOPE")
    getUser().then(id => {
      // console.log("Current user:", id);
      userId = id;
      readUserJson(id).then(data =>{
       // Update user profile
       userName = data.name;
       userDiv.querySelector('.user-id').value = data.id;
       userDiv.querySelector('.user-name').value = data.name;
         readUserTasksJson(id).then(dataList => {
            dataList.forEach(item => {
               //  alert(item.id);
              createNewTaskUI(item);
            });
          });
      })
    }).catch(error => {
      // console.error("Error getting user:", error);
   });
  }
}


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
   // console.log("update name:", name);
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
           <button class="btn btn-sm btn-primary " onclick="myFunction('${createdTaskData.id}')" onmouseout="outFunc('${createdTaskData.id}')"><span class="tooltiptext" id="${createdTaskData.id}tooltiptext">Copy to clipboard</span></button>
         </div>
       </div>
     `;
 
     
     const tasksContainer = document.getElementById('tasksContainer');
     if (tasksContainer) {
       tasksContainer.insertBefore(newTaskElement, tasksContainer.firstChild);
     } else {
       // console.error("Tasks container not found");
     }
   } catch (error) {
     // console.error("Error creating new task UI:", error);
   }
}
function myFunction(id) {
  var copytext = "https://todolist-2024.web.app/?id="+userId+"&taskId="+id
  navigator.clipboard.writeText(copytext);
  
  var tooltip = document.getElementById(id+"tooltiptext");
  tooltip.innerHTML = copytext;
}

function outFunc(id) {
  var tooltip = document.getElementById(id+"tooltiptext");
  tooltip.innerHTML = "Copy to clipboard";
}
// On deleting task
function deleteTask(id){
   document.getElementById(id+"taskitem").style.display = 'none';
   // console.log(id);
   deleteUserTask(userId, id);
}

// Create new task
async function createTaskForm(event) {
   event.preventDefault();
   const title = document.getElementsByClassName("new-title")[0].value;
   const description = document.getElementsByClassName("new-description")[0].value;
   const newTaskData = {
      'title':title,
      'description':description,
   }
   document.getElementsByClassName("new-title")[0].value = '';
   document.getElementsByClassName("new-description")[0].value = '';
   var a = new bootstrap.Collapse(document.getElementById("new-title"), {
     toggle: true
   });
   const id = await createUserTaskJson(userId, newTaskData);
   
   const createdTaskData = {
    'id':id,
    'title':title,
    'description':description,
 }
 createNewTaskUI(createdTaskData);
};


