
import logo from "/1.png"
export const chapters = [
    {
        name: "Introduction",
        link: "introduction"
    },
    {
        name: "Getting Started",
        link: "getting-started"
    },
    {
        name: "Database Access and Security",
        link: "database-info"
    },
    {
        name: "API Integration",
        link: "api-info"
    },
    {
        name: "User Interface Overview",
        link: "userinterface-overview"
    },
    {
        name: "Features and Functions",
        link: "features"
    },
    {
        name: "Troubleshooting and FAQs",
        link: "faqs"
    },
    {
        name: "Support and Resources",
        link: "support"
    }
]


export const coverPageData = {

    title: "Captify",
    version: "Beta",
    docDate: "10/29/24",
    logo: logo,
    contactInfo: {
        email: "Odulanahammed@captify.live",
        address: "Suite 21, 120 Bloomfield Street, Brisbane, Queensland, Australia 4163"
    }

}

export const introductionData = [

    {
        title: "Overview",
        description: "Captify is a MERN stack application that enhances accessibility and communication through real-time, AI-driven transcription. It provides high-accuracy captions and translations, allowing users to upload or record meetings, summarize, and take notes with ease. Captify supports live transcriptions, meeting recordings, and seamless integration with virtual meetings, such as Zoom."

    },
    {
        title: "Purpose of the Manual",
        description: "This manual provides comprehensive guidance for Captify users, detailing setup procedures, configuration, and usage instructions to help users maximize the application's capabilities in delivering accurate, accessible captions and transcriptions. "

    },
    {
        title: "Audience",
        description: "This manual is intended for new users, administrators, and technical support teams involved with configuring, using, and troubleshooting Captify. "

    },
    {
        title: "Prerequisites",
        description: "Basic familiarity with web-based applications and knowledge of video/audio transcription concepts will be beneficial for users of this manual."

    }

]


export const gettingStarted = [
    {
        title: "System Requirements:",
        points: [
            {
                description: "Operating System: Compatible with macOS, Windows, and Linux."
            },
            {
                description: "Web Browser: Google Chrome, Firefox, Safari, or Edge (latest versions)."
            },
            {
                description: "Operating System: Compatible with macOS, Windows, and Linux."
            }
        ]
    },
    {
        title: "User Account Setup:",
        points: [
            {
                description: "On the login screen, click “Sign Up” to create a new account."
            },
            {
                description: "Complete required information and verify the account through email."
            },
            {
                description: "Log in with your new credentials to access Captify."
            }

        ]
    },
    {
        title: "Installation Instructions::",
        points: [
            {
                description: "Access the Captify website"
            },
            {
                description: "Follow on-screen instructions to complete the installation."
            },
            {
                description: "For web access, navigate to the Captify URL (captifylive.online), sign up, and log in."
            }
        ]
    }
]



export const databaseInfo = [

    {
        title: "Database Overview:",
        points: [
            {
                description: "Captify uses a secure, cloud-hosted database to store transcriptions, meeting data, and user notes. This ensures that all user information remains accessible while protected by encryption and access controls."
            }

        ]

    },
    {
        title: "Usernames and Passwords:",
        points: [
            {
                description: "Database Credentials: User credentials are encrypted, ensuring security and restricted access."
            },
            {
                description: "Access Levels: Different user roles allow selective access to various features (e.g., admins manage users and permissions)."
            }

        ]

    }


]




export const apiInfoData = [

    {
        title: "API Overview:",
        points: [
            {
                description: "Captify integrates third-party APIs for transcription and meeting capture, including Rev.AI, AssemblyAI, ZoomOAuth, OpenAI, and Recall.AI, to provide transcription, summarization, and meeting recording services."
            }

        ]

    },

]

export const userInterfaceData = [

    {
        title: "Dashboard Explanation:",
        points: [
            {
                description: "The dashboard provides quick access to our feature like live transcriptions , virtual meeting, in-person meeting, Audio Transcriptions, Resyncing AI, Note Case and Summariazation Deposition."
            }

        ]

    },
    // {
    //     title: "Menu and Toolbar:",
    //     points: [
    //         {
    //             description: "The main menu includes options for Transcriptions, Recordings, Summaries, Settings, and Help."
    //         }

    //     ]

    // },

]
export const featuresData = [

    {
        title: "Audio Transcriptions:",
        points: [
            {
                description: "Upload audio/video files for transcription",
                steps: [
                    {
                        name: "step 1",
                        description: "Upload the file "
                    },
                    {
                        name: "step 2",
                        description: "Click on Transcribe"
                    },
                    {
                        name: "step 3",
                        description: "After transribing, you can edit"
                    },
                ]
            }

        ]

    },
    {
        title: "Real-time Transcriptions:",
        points: [
            {
                description: "Live captions and transcription during events.",
                steps: [
                    {
                        name: "step 1",
                        description: "Upload the file "
                    },
                    {
                        name: "step 2",
                        description: "Click on Transcribe"
                    },
                    {
                        name: "step 3",
                        description: "After transribing, you can edit"
                    },
                ]
            }

        ]

    },
    {
        title: "Meeting Transcriptions:",
        points: [
            {
                description: "Integration with Zoom allows Captify-Copilot to record and transcribe virtual meetings.",
                steps: [
                    {
                        name: "step 1",
                        description: "Upload the file "
                    },
                    {
                        name: "step 2",
                        description: "Click on Transcribe"
                    },
                    {
                        name: "step 3",
                        description: "After transribing, you can edit"
                    },
                ]
            }

        ]

    },
    {
        title: "Summaries: ",
        points: [
            {
                description: "Generate concise summaries for meetings or cases.",
                steps: [
                    {
                        name: "step 1",
                        description: "Upload the file "
                    },
                    {
                        name: "step 2",
                        description: "Click on Transcribe"
                    },
                    {
                        name: "step 3",
                        description: "After transribing, you can edit"
                    },
                ]
            }

        ]

    },
    {
        title: "Case Note",
        points: [
            {
                description: "Keep organized notes for each session, including legal cases.",
                steps: [
                    {
                        name: "step 1",
                        description: "Upload the file "
                    },
                    {
                        name: "step 2",
                        description: "Click on Transcribe"
                    },
                    {
                        name: "step 3",
                        description: "After transribing, you can edit"
                    },
                ]
            }

        ]

    },
    {
        title: "Resyncing AI",
        points: [
            {
                description: "Correct sync issues between audio and transcription.",
                steps: [
                    {
                        name: "step 1",
                        description: "Upload the file "
                    },
                    {
                        name: "step 2",
                        description: "Click on Transcribe"
                    },
                    {
                        name: "step 3",
                        description: "After transribing, you can edit"
                    },
                ]
            }

        ]

    },
    {
        title: "Audio Playback and Synchronization",
        points: [
            {
                description: "Listen the audio aligns with the words of transcript",
                steps: [
                    {
                        name: "step 1",
                        description: "Upload the file "
                    },
                    {
                        name: "step 2",
                        description: "Click on Transcribe"
                    },
                    {
                        name: "step 3",
                        description: "After transribing, you can edit"
                    },
                ]
            }

        ]

    },

]





export const faqData = [

    {
        title: "Database and API Error Codes:",
        points: [
            {
                description: "Something went wrong: This error usually come while transcribing and it means there is some issue temporary issue in our system. Report it at Odulanahammed@captify.live"
            },
            {
                description: "In-sufficient Balance: This means you dont have enough credit in your account for transcriptions. Buy more credit from User profile >> Billing Section"
            },
            {
                description: "Invalid credentials: This error means your credentials are incorrect while login"
            },
            {
                description: "User already exist: This error means the email address you provided is already regestered on captify"
            }

        ]

    },
    {
        title: "FAQ:",
        points: [
            {
                description: "Q. How do I connect Captify to Zoom?",
                ans: "Ans. Go to Dashboard >> Live Transcriptions >> Virtual Meeting >> Connect Zoom"

            },
            {
                description: "Q. Can I edit transcriptions?",
                ans: "Ans. Yes, Captify allows users to perform various type of editing after transcribing"
            }

        ]

    }


]

export const supportData = [

    {
        title: "Contact Information:",
        points: [
            {
                description: "For technical support, contact Odulanahammed@captify.live"
            }
        ]

    },
    {
        title: "Knowledge Base or Help Center:",
        points: [
            {
                description: "Access our online help center at captifylive.online/contact-us for any help."

            }

        ]

    }


]