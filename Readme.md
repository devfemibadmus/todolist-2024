# [Todolist-2024](https://todolist-2024.web.app/)

## Overview

Todolist-2024 is a user-friendly task management application designed to facilitate collaboration by allowing users to pair up with others and share task lists seamlessly. The primary goal is to enhance user productivity by providing a simple yet efficient way to manage tasks.

![Overview Image](media/WhatsApp%20Image%202024-01-01%20at%2010.55.57%20PM.jpeg?raw=true)

## Features

- **User Pairing**: Pair with other users using their unique user ID.
- **List Sharing**: Share task lists with paired users.
- **Auto Account Creation**: No need to log in or create an account; your data is associated with your user ID.
- **Easy Name Updates**: Update your name effortlessly within the application.
- **Cross-Device Sync**: In future versions, log in with your user ID on any device to access your task lists.

![Features Image](media/WhatsApp%20Image%202024-01-01%20at%2010.55.57%20PM.jpeg?raw=true)

## JSON Structure

The current JSON structure is as follows:

```json
{
    "users": [
        {
            "id": "user123",
            "name": "John Doe",
            "tasks": [
                {
                    "title": "Integrate Reminders",
                    "description": "Add the ability for users to assign priority levels to tasks."
                },
                {
                    "id": 2,
                    "title": "Integrate Reminders",
                    "description": "Implement reminders and notifications for upcoming deadlines."
                }
            ]
        }
    ]
}
```

## Upcoming Features

In future updates, the JSON structure will include:

- **Password Protection**: Enhanced security with password protection for user accounts.
- **Pairing Information**: Pairing information to associate specific users with tasks.
- **Additional Features**: Exciting new features to further improve the user experience.

## Usage

1. Pair with a user using their unique user ID.
2. Create and share task lists with paired users.
3. Update your name easily within the application.
4. Enjoy the intuitive and easy-to-navigate UI.

### Screenshots and Video Demonstration:


#### Adding a new task to the list.
  ![Add Task](media/WhatsApp%20Image%202024-01-01%20at%2010.55.53%20PM.jpeg?raw=true)


#### Updating your name within the application.

  ![Update Name](media/WhatsApp%20Image%202024-01-01%20at%2010.55.54%20PM.jpeg?raw=true)


#### Reading and deleting tasks from the list.

  ![Read/Delete Task](media/WhatsApp%20Image%202024-01-01%20at%2010.55.56%20PM.jpeg?raw=true)


#### Auto account setup functionality on application load.

  ![Auto Acct Setup Onload](media/WhatsApp%20Image%202024-01-01%20at%2010.55.57%20PM.jpeg?raw=true)

[Watch the Video Demonstration](media/WhatsApp%20Video%202024-01-01%20at%2010.56.14%20PM.mp4?raw=true)

## Feedback

We appreciate your feedback! If you have any suggestions, issues, or feature requests, please open an issue on GitHub.

## License

This project is licensed under the MIT License.


We appreciate your feedback! If you have any suggestions, issues, or feature requests, please open an issue on GitHub.

## License

This project is licensed under the MIT License.
