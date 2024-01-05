firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const tasksRef = database.ref('tasks');

// Function to create task for user
async function createUserTaskJson(userId, newTask) {
  try {
    const userTasksRef = firebase.database().ref(`users/${userId}/tasks`);

    // Add the new task to Firebase as part of an array
    const newTaskRef = userTasksRef.push();
    const taskId = newTaskRef.key;

    // Set the new task data with the taskId
    await newTaskRef.set({ ...newTask, id: taskId });

    // console.log(`Task added for user ${userId} with ID: ${taskId}`);
    return taskId;
  } catch (error) {
    // console.error("Error adding task to Firebase:", error);
    return null;
  }
}
// Function to read user tasks
async function readUserTasksJson(userId) {
  try {
    const userTasksRef = firebase.database().ref(`users/${userId}/tasks`);
    const snapshot = await userTasksRef.once('value');
    const tasksData = snapshot.val();
    return tasksData ? Object.values(tasksData) : [];
  } catch (error) {
    // console.error("Error fetching user tasks from Firebase:", error);
    return [];
  }
}
// Function to read a single user task by taskId
async function readUserTaskByIdJson(userId, taskId) {
  try {
    // alert(taskId)
    const userTaskRef = firebase.database().ref(`users/${userId}/tasks/${taskId}`);
    const snapshot = await userTaskRef.once('value');
    const taskData = snapshot.val();
    return taskData ? taskData : null;
  } catch (error) {
    // console.error("Error fetching user task from Firebase:", error);
    return null;
  }
}
// Function to delete user tasks
async function deleteUserTask(userId, taskId) {
  try {
    const userTaskRef = firebase.database().ref(`users/${userId}/tasks/${taskId}`);
    const existingTask = await userTaskRef.once('value');

    if (existingTask.exists()) {
      // Delete the task
      await userTaskRef.remove();
      // console.log(`Task ${taskId} deleted for user ${userId}`);
    } else {
      // console.error(`Task with ID ${taskId} not found for user ${userId}.`);
    }
  } catch (error) {
    // console.error("Error deleting task in Firebase:", error);
  }
}

// Function to create user
async function createUser(userId, userName) {
  try {
    const userRef = firebase.database().ref(`users/${userId}`);
    await userRef.set({ id: userId, name: userName });
    // console.log(`User ${userId} created or updated with name: ${userName}`);
  } catch (error) {
    // console.error("Error creating/updating user in Firebase:", error);
  }
}
// Function to read user data
async function readUserJson(userId) {
  try {
    const userRef = firebase.database().ref(`users/${userId}`);
    const userSnapshot = await userRef.once('value');

    if (userSnapshot.exists()) {
      const userData = userSnapshot.val();
      // console.log(`User data for ${userId}:`, userData);
      return userData;
    } else {
      // console.error(`User with ID ${userId} not found.`);
      return null;
    }
  } catch (error) {
    // console.error("Error reading user data from Firebase:", error);
    return null;
  }
}
// Function to update user's name
async function updateUserName(userId, newName) {
  try {
    const userRef = firebase.database().ref(`users/${userId}/name`);
    await userRef.set(newName);
    // console.log(`User ${userId}'s name updated to: ${newName}`);
  } catch (error) {
    // console.error("Error updating user name in Firebase:", error);
  }
}
// Function to delete user
async function deleteUser(userId) {
  try {
    const userRef = firebase.database().ref(`users/${userId}`);
    const existingUser = await userRef.once('value');

    if (existingUser.exists()) {
      // Delete the user document
      await userRef.remove();
      // console.log(`User ${userId} deleted from Firebase.`);
    } else {
      // console.error(`User with ID ${userId} not found.`);
    }
  } catch (error) {
    // console.error("Error deleting user from Firebase:", error);
  }
}

// Function to generate unique userId
async function generateUniqueUserId() {
  try {
    const usersRef = firebase.database().ref('users');
    
    // Get the current user count
    const userCountSnapshot = await usersRef.once('value');
    const userCount = userCountSnapshot.numChildren();

    // Generate a unique userId (increment the user count)
    const userId = userCount + 1;

    // console.log(`Generated unique userId: ${userId}`);
    return userId.toString(); // Convert to string if needed
  } catch (error) {
    // console.error("Error generating unique userId:", error);
    return null;
  }
}
// Function to get user(local) else create
async function getUser() {
  try {
    // Check if userId is cached in local storage
    const cachedUserId = localStorage.getItem('userId');

    if (cachedUserId) {
      // If userId is cached, check if the user exists
      const user = await readUserJson(cachedUserId);

      if (user) {
        // console.log(`User found using cached userId: ${cachedUserId}`);
        return cachedUserId;
      }
    }

    // If userId is not cached or the user doesn't exist, generate a new userId
    const newUserId = await generateUniqueUserId();

    if (newUserId) {
      // Create a new user with the generated userId
      const userName = "John Doe"; // Replace with the actual user name
      await createUser(newUserId, userName);

      // Save the new userId to local storage
      localStorage.setItem('userId', newUserId);

      // console.log(`New user created with userId: ${newUserId}`);
      return newUserId;
    } else {
      // console.error("Failed to generate a unique userId.");
      return null;
    }
  } catch (error) {
    // console.error("Error getting user:", error);
    return null;
  }
}
