
# 🚀 LambdaCraze: Lets go Serverless



## 📖 Overview
LambdaCraze is a serverless, to-do list application built to learn the basics of AWS Lambda and other cloud services. The project showcases how to create and manage a to-do list using AWS Lambda functions, API Gateway, MongoDB Atlas, and Postman for testing. The primary goal is to provide a hands-on introduction to AWS Lambda for beginners, demonstrating the interaction between different cloud components.

---

## 📚 Features
- CRUD operations for managing to-dos
- Deployed as individual AWS Lambda functions
- MongoDB as a NoSQL database for storing to-do items
- API Gateway for invoking the Lambda functions
- CloudWatch for monitoring Lambda logs
- Serverless and scalable

---

## 🛠️ Technologies Used
- **AWS Lambda**: Serverless compute service to run functions without managing servers.
- **API Gateway**: Used to expose Lambda functions as RESTful APIs.
- **MongoDB Atlas**: Cloud-hosted MongoDB for storing to-do items.
- **CloudWatch**: For monitoring and logging Lambda executions.
- **Postman**: For testing the APIs.
- **Node.js**: Backend language for Lambda functions.

---

## 🏗️ AWS Resources Overview

Here’s a detailed description of the AWS services and how they were configured for the project:

### 1. AWS Lambda
AWS Lambda is the core service used in this project. Each function in the project corresponds to an API operation (create, read, update, delete). These functions are triggered via HTTP requests routed through API Gateway.

#### How to Create a Lambda Function:
1. Go to AWS Management Console and open **Lambda**.
2. Click **Create Function**.
3. Choose **Author from Scratch**.
4. Give your function a name, choose the runtime (Node.js in this case), and set up the role permissions.
5. Click **Create Function**.

> Make sure to use the same runtime as the provided code (Node.js). The Lambda functions for `get`, `create`, `delete`, and `update` to-do items are written in JavaScript.

### 2. API Gateway
API Gateway serves as the entry point for clients to interact with your Lambda functions. Each Lambda function is exposed as an API endpoint using API Gateway.

#### How to Create an API Gateway:
1. Open **API Gateway** from the AWS Management Console.
2. Choose **Create API**.
3. Select **HTTP API** or **REST API**.
4. Give your API a name.
5. Create routes (e.g., `/create-todo`, `/get-todo/{id}`) and link them to their respective Lambda functions.
6. Deploy the API to a stage (such as `dev`).

### 3. MongoDB Atlas
MongoDB Atlas is a cloud-hosted NoSQL database used to store to-do items.

#### How to Set Up MongoDB Atlas:
1. Create a MongoDB Atlas account.
2. Create a new project and cluster.
3. Get your connection string, and add it to your Lambda function's environment variables.
4. Set up IP Whitelisting to allow access from your AWS Lambda functions.

### 4. CloudWatch
CloudWatch is used for monitoring Lambda function executions and logging errors or other useful information.

#### How to Use CloudWatch with Lambda:
1. Open **CloudWatch** from the AWS Console.
2. Go to **Logs** and find the logs for your Lambda function.
3. You can set alarms or triggers based on errors or performance metrics.

---

## 🛠️ Getting Started

### Prerequisites:
1. **AWS Account**: Ensure you have an AWS account to deploy Lambda functions and set up API Gateway.
2. **MongoDB Atlas**: You need a MongoDB Atlas cluster and connection URI.
3. **Postman**: To test the API endpoints.

### Setup:
1. Clone this repository.
2. Create your environment variables in Lambda:
   - `MONGO_URI`: MongoDB connection string.
   - `DB_NAME`: MongoDB database name.
   - `MONGO_COLLECTION`: MongoDB collection name for the to-dos.
3. Deploy the Lambda functions:
   - Use the AWS Console or AWS CLI to deploy your Lambda functions.
   - Attach each Lambda function to its respective API Gateway route.

---

## 🌐 API Endpoints
- **Base URL**: `https://1teptkpgy1.execute-api.ap-southeast-1.amazonaws.com/dev`

| HTTP Method | Endpoint                                      | Description                          |
| ----------- | --------------------------------------------- | ------------------------------------ |
| `POST`      | `/api/lambda_craze/create-to-do`              | Create a new to-do                   |
| `GET`       | `/api/lambda_craze/get-to-do/{id}`            | Get a specific to-do by ID           |
| `GET`       | `/api/lambda_craze/get-all-todos`             | Retrieve all to-dos                  |
| `PUT`       | `/api/lambda_craze/update-todo/{id}`          | Update a specific to-do by ID        |
| `DELETE`    | `/api/lambda_craze/delete-todo/{id}`          | Delete a specific to-do by ID        |
| `DELETE`    | `/api/lambda_craze/delete-all-todo`           | Delete all to-dos                    |

---

## 💻 CURL Commands for Testing

### 1. **Get API Root** 🏠
Retrieve the root of the API to verify that it's up and running.

```bash
curl --location 'https://1teptkpgy1.execute-api.ap-southeast-1.amazonaws.com/dev/'
```

### 2. **Create a New To-Do** ➕
Create a new to-do item with details like `title`, `description`, `dueDate`, and `completed` status.

```bash
curl --location 'https://1teptkpgy1.execute-api.ap-southeast-1.amazonaws.com/dev/api/lambda_craze/create-to-do' \
--header 'Content-Type: application/json' \
--data '{
  "title": "Buy groceries",
  "description": "Need to pick up milk, eggs, and bread",
  "dueDate": "2024-10-25",
  "completed": false
}'
```

### 3. **Delete a Specific To-Do** 🗑️
Delete a to-do item by its unique ID. Replace \`{id}\` with the actual to-do ID.

```bash
curl --location --request DELETE 'https://1teptkpgy1.execute-api.ap-southeast-1.amazonaws.com/dev/api/lambda_craze/delete-todo/6714e7e7e2a4b5495c06848f'
```

### 4. **Delete All To-Dos** 🚮
Delete all to-do items in the collection.

```bash
curl --location --request DELETE 'https://1teptkpgy1.execute-api.ap-southeast-1.amazonaws.com/dev/api/lambda_craze/delete-all-todo'
```

### 5. **Get a Specific To-Do by ID** 🔍
Fetch a single to-do by its unique ID. Replace \`{id}\` with the actual to-do ID.

```bash
curl --location 'https://1teptkpgy1.execute-api.ap-southeast-1.amazonaws.com/dev/api/lambda_craze/get-to-do/6714ecffc4d38e7803313f5f'
```

### 6. **Update a Specific To-Do** 🔄
Update a to-do's \`completed\` status. Replace \`{id}\` with the actual to-do ID.

```bash
curl --location --request PUT 'https://1teptkpgy1.execute-api.ap-southeast-1.amazonaws.com/dev/api/lambda_craze/update-todo/6714e7e7e2a4b5495c06848f' \
--header 'Content-Type: application/json' \
--data '{
  "completed": false
}'
```

### 7. **Retrieve All To-Dos** 📋
Fetch all the to-do items from the collection.

```bash
curl --location 'https://1teptkpgy1.execute-api.ap-southeast-1.amazonaws.com/dev/api/lambda_craze/get-all-todos'
```

---

## 📝 Summary

This project serves as a beginner-friendly introduction to AWS Lambda, illustrating how to build and manage serverless applications. The to-do app integrates various AWS services such as Lambda, API Gateway, and CloudWatch, along with MongoDB for data storage. Postman was used for testing the APIs. By completing this project, you will have a better understanding of how to structure and deploy serverless applications using AWS.

---

## 🎯 Useful Links
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [API Gateway Documentation](https://docs.aws.amazon.com/apigateway/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Postman](https://www.postman.com/)

---

**Enjoy learning AWS Lambda and happy coding! 💻**
