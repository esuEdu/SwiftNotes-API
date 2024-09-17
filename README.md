# SwiftNotes-API

SwiftNotes-API is a cloud-native backend API for a Swift-based notes application. It leverages AWS services including API Gateway, Lambda, and DynamoDB to provide a scalable and serverless architecture for storing and retrieving user notes.

## Features
- **Serverless Architecture**: API built using AWS Lambda and API Gateway for highly scalable and cost-effective infrastructure.
- **DynamoDB Integration**: DynamoDB is used as the primary NoSQL database for storing user notes.
- **Authentication**: Future plans to integrate authentication using AWS Cognito.
- **CRUD Operations**: Create, Read, Update, and Delete notes via API endpoints.

## Tech Stack
- **API Gateway**: API routing and endpoint management.
- **AWS Lambda**: Compute layer for executing API logic.
- **DynamoDB**: NoSQL database for persistent storage.
- **Swift**: Frontend application built for iOS devices.

## Setup

### Prerequisites
- AWS account
- Swift development environment (Xcode)

### AWS Configuration
1. Set up API Gateway with the necessary endpoints.
2. Deploy Lambda functions to handle each API route.
3. Configure DynamoDB to store note entries with appropriate permissions.

### Swift App Integration
- Configure your Swift app to make HTTP requests to the API Gateway endpoints.
- Parse and display notes in the app.
