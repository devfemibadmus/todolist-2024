# [Todolist-2024](https://todolist-2024.web.app/)

## Overview

Todolist-2024 is a user-friendly task management application designed to facilitate collaboration by allowing users to pair up with others and share task lists seamlessly. The primary goal is to enhance user productivity by providing a simple yet efficient way to manage tasks.

## Features

- **Auto Account Creation**: No need to log in or create an account; your data is associated with your user ID.
- **Easy Name Updates**: Update your name effortlessly within the application.
- **Login Anywhere**: Quick login with your user ID and name.
- **Task Sharing**: Share task with their unique link.
- **Cross-Device Sync**: In future versions, log in with your user ID on any device to access your task lists.

![Features Image](media/WhatsApp%20Image%202024-01-01%20at%2010.55.57%20PM.jpeg?raw=true)

## JSON Structure

The current JSON structure is as follows:

```json
{
  "users": [
    {
      "id": "4",
      "name": "John Doe",
      "tasks": {
        "-Nn5uJ5OynHWxO66-3z8": {
          "description": "watch some good tutorial",
          "id": "-Nn5uJ5OynHWxO66-3z8",
          "title": "become great",
          "date_created": "2024-01-02"
        }
      }
    },
    {
      "id": "3",
      "name": "John Doe",
      "tasks": {
        "-Nn5uJ5OynHWxO66-3z8": {
          "description": "watch some good tutorial on how to fvk before wednesday",
          "id": "-Nn5uJ5OynHWxO66-3z8",
          "title": "Big me",
          "date_created": "2024-01-01"
        },
        "-Nn59syndUq_S-lmTEMc": {
          "description": "test description",
          "id": "-Nn59syndUq_S-lmTEMc",
          "title": "test",
          "date_created": "2024-01-02"
        }
      }
    }
  ]
}
```


### Screenshots and Demonstration:

| Auto Account Setup | Updating Your Name |
|-------------------- | ------------------- |
| ![Auto Account Setup](readme/WhatsApp%20Image%202024-01-05%20at%205.00.02%20PM.jpeg?raw=true) | ![Update Name](readme/WhatsApp%20Image%202024-01-05%20at%205.00.04%20PM.jpeg?raw=true) |

| Add New Task | View, Delete, and Share Tasks |
|-------------- | ---------------------------- |
| ![Add Task](readme/WhatsApp%20Image%202024-01-05%20at%205.00.05%20PM.jpeg?raw=true) | ![Read/Delete Task](readme/WhatsApp%20Image%202024-01-05%20at%205.00.07%20PM.jpeg?raw=true) |

| Copied Sharing Link | View Shared Tasks from Link |
|--------------------- | --------------------------- |
| ![Read/Delete Task](readme/WhatsApp%20Image%202024-01-05%20at%205.00.11%20PM.jpeg?raw=true) | ![Read/Delete Task](readme/WhatsApp%20Image%202024-01-05%20at%205.00.12%20PM.jpeg?raw=true) |

| Signing on New Device | Signed In |
|----------------------- | ---------- |
| ![Read/Delete Task](readme/WhatsApp%20Image%202024-01-05%20at%205.00.12%20PM%20(1).jpeg?raw=true) | ![Read/Delete Task](readme/WhatsApp%20Image%202024-01-05%20at%205.00.13%20PM.jpeg?raw=true) |


## Feedback

We appreciate your feedback! If you have any suggestions, issues, or feature requests, please open an issue on GitHub.

## License

This project is licensed under the MIT License.


We appreciate your feedback! If you have any suggestions, issues, or feature requests, please open an issue on GitHub.

## License

This project is licensed under the MIT License.
