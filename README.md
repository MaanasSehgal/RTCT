# RTCT (Real Time Collaboration Tool)

RTCT is designed to streamline remote teamwork. In today's era, many people prefer working from home or remotely, relying heavily on platforms like GitHub for collaboration. However, users often need to switch between multiple platforms like WhatsApp for chatting and Google Meet for meetings. RTCT overcomes these obstacles by enabling seamless collaboration on code, documents, spreadsheets, and projects, all within one web-based platform.

## Features

-   **Authentication**

    -   Login and signup through Email Auth, Google, and GitHub using "Kinde"
    -   Storing user information in PostgreSQL via SupaBase
    -   Supports 2 Factor Authentication (2FA)

-   **User Dashboard**

    -   View created projects and those shared with you
    -   Manage project updates and deletions

-   **Navigation Bar**

    -   Customized navbars for each page for seamless navigation and improved UX

-   **Project Dashboard**

    -   Access a project dashboard with multiple tabs after selecting a project:
        -   **Configuration**: Admins can edit project details like name, logo, GitHub repo, and delete the project
        -   **Team Members Management**: Add or remove members
        -   **Commits Tracking**: Track daily commits via the provided GitHub repo using the GitHub API, with access checks for private repos
        -   **Kanban Board**: Manage tasks efficiently
        -   **Invite Links**: Generate invite links for meetings or projects, allowing users to request access, which the admin must approve for added security

-   **Community Chat**

    -   Automatic project group chats for team members
    -   Individual direct messaging
    -   Implemented using Socket.IO with ExpressJS backend on Oracle Cloud Infrastructure (OCI)
    -   Chat history saved in MongoDB
    -   Supports file and image uploads

-   **Video Conferencing**

    -   Organize in-app meetings with features like toggling mic, video, screen sharing, and viewing participants
    -   Integrated with LiveKit SDK and Socket.IO
    -   In-meet chat implemented by Socket.IO

-   **Codespace**

    -   Online cloud environment for code collaboration using open VS Code server
    -   Docker, Docker Python SDK, Nginx reverse proxy
    -   Controlled by ExpressJS backend with Redis PubSub messaging

-   **Workspace**

    -   Integrates Excalidraw and Editor.js for live documentation and workflow creation
    -   Documents stored in PostgreSQL
    -   Custom library extensions for enhanced user customization

-   **Security and UX**

    -   Validates user access during backend requests to ensure data security

-   **Feedback Section**
    -   Feedback form allowing users to send feedback to website administrators via email using Nodemailer

Overall, this web app is a one-stop solution for all your remote collaborations.

## Repository Links

-   [Frontend Repository](https://github.com/MaanasSehgal/RTCT/)
-   [Backend Repository](https://github.com/MrF1yn/RTCT_BACKEND)
-   [Documentation](https://github.com/MrF1yn/docker-container-manager)

## Team

-   **Maanas Sehgal** - Project Lead
-   **Dibyajyoti Dey** - Member
-   **Devendra Suryavanshi** - Member
