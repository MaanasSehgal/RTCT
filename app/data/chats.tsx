export const chatData = [
    {
        chatID: "0101",
        chatName: "Hackathon Group",
        chatType: "group", // personal, group
        latestMsgtime: "2024-01-01T02:21:00Z",
        notifications: 8,
        chats: [
            {
                id: "01",
                senderID: "u001",
                senderName: "Maanas",
                timestamp: "2024-01-01T00:00:00Z",
                content: {
                    msgType: "text", // text, image, file
                    text: "Hello, dekh ye image kesa hai",
                },
                readReceipts: [{userID: "u002", timestamp: "2024-01-01T00:01:00Z"}],
            },
            {
                id: "02",
                senderID: "u002",
                senderName: "Arjun",
                timestamp: "2024-01-01T01:00:00Z",
                content: {
                    msgType: "image",
                    url: "https://media.istockphoto.com/id/1255079689/photo/google-cloud.jpg?s=612x612&w=0&k=20&c=r-WJui19l-8MrBRU3AULo06znDORO9oO7GiTyn69HqE=",
                },
                readReceipts: [{userID: "u001", timestamp: "2024-01-01T01:05:00Z"}],
            },
            {
                id: "03",
                senderID: "u003",
                senderName: "Priya",
                timestamp: "2024-01-01T02:00:00Z",
                content: {
                    msgType: "file",
                    fileName: "project_plan.pdf",
                    url: "http://example.com/project_plan.pdf",
                },
                readReceipts: [
                    {userID: "u001", timestamp: "2024-01-01T02:05:00Z"},
                    {userID: "u002", timestamp: "2024-01-01T02:10:00Z"},
                ],
            },
            {
                id: "04",
                senderID: "u004",
                senderName: "Raj",
                timestamp: "2024-01-01T03:00:00Z",
                content: {
                    msgType: "text",
                    text: "Looks great! When is the next meeting?",
                },
                readReceipts: [{userID: "u001", timestamp: "2024-01-01T03:05:00Z"}],
            },
            {
                id: "05",
                senderID: "u001",
                senderName: "Maanas",
                timestamp: "2024-01-01T04:00:00Z",
                content: {
                    msgType: "text",
                    text: "Tomorrow at 10 AM. Don't be late!",
                },
                readReceipts: [
                    {userID: "u002", timestamp: "2024-01-01T04:05:00Z"},
                    {userID: "u003", timestamp: "2024-01-01T04:06:00Z"},
                ],
            },
        ],
    },
    {
        chatID: "0102",
        chatName: "John Doe",
        chatType: "personal", // personal, group
        latestMsgtime: "2024-01-02T15:30:00Z",
        notifications: 2,
        chats: [
            {
                id: "01",
                senderID: "u001",
                senderName: "Maanas",
                timestamp: "2024-01-02T15:00:00Z",
                content: {
                    msgType: "text",
                    text: "Hey John, how's the project going?",
                },
                readReceipts: [{userID: "u002", timestamp: "2024-01-02T15:05:00Z"}],
            },
            {
                id: "02",
                senderID: "u002",
                senderName: "John Doe",
                timestamp: "2024-01-02T15:15:00Z",
                content: {
                    msgType: "text",
                    text: "Hi Maanas, it's going well. Just finished the initial draft.",
                },
                readReceipts: [{userID: "u001", timestamp: "2024-01-02T15:20:00Z"}],
            },
            {
                id: "03",
                senderID: "u001",
                senderName: "Maanas",
                timestamp: "2024-01-02T15:25:00Z",
                content: {
                    msgType: "file",
                    fileName: "feedback.docx",
                    url: "http://example.com/feedback.docx",
                },
                readReceipts: [],
            },
            {
                id: "04",
                senderID: "u002",
                senderName: "John Doe",
                timestamp: "2024-01-02T15:30:00Z",
                content: {
                    msgType: "image",
                    url: "http://example.com/design.jpg",
                },
                readReceipts: [],
            },
            {
                id: "05",
                senderID: "u001",
                senderName: "Maanas",
                timestamp: "2024-01-02T16:00:00Z",
                content: {
                    msgType: "text",
                    text: "Great! Let's review it tomorrow.",
                },
                readReceipts: [{userID: "u002", timestamp: "2024-01-02T16:05:00Z"}],
            },
        ],
    },
    {
        chatID: "0103",
        chatName: "Family Group",
        chatType: "group",
        latestMsgtime: "2024-01-03T18:00:00Z",
        notifications: 5,
        chats: [
            {
                id: "01",
                senderID: "u005",
                senderName: "Mom",
                timestamp: "2024-01-03T17:00:00Z",
                content: {
                    msgType: "text",
                    text: "Dinner at 8 PM. Everyone must join!",
                },
                readReceipts: [
                    {userID: "u006", timestamp: "2024-01-03T17:05:00Z"},
                    {userID: "u007", timestamp: "2024-01-03T17:06:00Z"},
                ],
            },
            {
                id: "02",
                senderID: "u006",
                senderName: "Dad",
                timestamp: "2024-01-03T17:30:00Z",
                content: {
                    msgType: "text",
                    text: "I'll be there!",
                },
                readReceipts: [
                    {userID: "u005", timestamp: "2024-01-03T17:35:00Z"},
                    {userID: "u007", timestamp: "2024-01-03T17:36:00Z"},
                ],
            },
            {
                id: "03",
                senderID: "u007",
                senderName: "Sibling",
                timestamp: "2024-01-03T18:00:00Z",
                content: {
                    msgType: "text",
                    text: "Can't wait for Mom's special dish!",
                },
                readReceipts: [
                    {userID: "u005", timestamp: "2024-01-03T18:05:00Z"},
                    {userID: "u006", timestamp: "2024-01-03T18:06:00Z"},
                ],
            },
        ],
    },
    {
        chatID: "0104",
        chatName: "Project Team",
        chatType: "group",
        latestMsgtime: "2024-01-04T10:15:00Z",
        notifications: 3,
        chats: [
            {
                id: "01",
                senderID: "u008",
                senderName: "Alice",
                timestamp: "2024-01-04T09:00:00Z",
                content: {
                    msgType: "text",
                    text: "Meeting in 15 minutes.",
                },
                readReceipts: [
                    {userID: "u009", timestamp: "2024-01-04T09:05:00Z"},
                    {userID: "u010", timestamp: "2024-01-04T09:06:00Z"},
                ],
            },
            {
                id: "02",
                senderID: "u009",
                senderName: "Bob",
                timestamp: "2024-01-04T09:15:00Z",
                content: {
                    msgType: "image",
                    url: "http://example.com/presentation_slide.jpg",
                },
                readReceipts: [
                    {userID: "u008", timestamp: "2024-01-04T09:20:00Z"},
                    {userID: "u010", timestamp: "2024-01-04T09:21:00Z"},
                ],
            },
            {
                id: "03",
                senderID: "u010",
                senderName: "Charlie",
                timestamp: "2024-01-04T10:00:00Z",
                content: {
                    msgType: "file",
                    fileName: "meeting_notes.docx",
                    url: "http://example.com/meeting_notes.docx",
                },
                readReceipts: [
                    {userID: "u008", timestamp: "2024-01-04T10:05:00Z"},
                    {userID: "u009", timestamp: "2024-01-04T10:06:00Z"},
                ],
            },
            {
                id: "04",
                senderID: "u008",
                senderName: "Alice",
                timestamp: "2024-01-04T10:15:00Z",
                content: {
                    msgType: "text",
                    text: "Great work today, team!",
                },
                readReceipts: [
                    {userID: "u009", timestamp: "2024-01-04T10:20:00Z"},
                    {userID: "u010", timestamp: "2024-01-04T10:21:00Z"},
                ],
            },
        ],
    },
];
