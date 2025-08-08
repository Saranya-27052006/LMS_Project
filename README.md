
# A modern Learning Management System (LMS) for delivering, managing, and tracking online courses with ease.
## 🛠 Tech Stack
  - Frontend: Next.js, Tailwind CSS
  - Backend: Node.js, Express.js, MongoDB

## Getting Started with the Frontend:
After cloning the repository, follow these steps to get the project running:

1. Run `npm install` to install all the required dependencies.
2.  Set up your `.env` file in the root directory with the necessary environment variables.
3. Start the development server by running `npm run dev`.

Access the Application: Open your browser and navigate to http://localhost:3000 to view the running project.

 **Note:**
   ```plaintext
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id_here
   ```


## Backend Setup

After cloning the repository, follow these steps to get the project running:

1. Run `npm install` to install all the required dependencies.
2.  Set up your `.env` file in the root directory with the necessary environment variables.
3. Start the development server by running `npm run dev`.

Once the server is running, you can access the application in your browser at [http://localhost:5000](http://localhost:5000).

  **Note:**
   ```plaintext
   DB=mongodb+srv://<username>:<password>@cluster0.mvum2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   PORT=5000
   CLIENT_ID=your_client_id_here
   CLIENT_SECRET=your_client_secret_here
   CLIENT_URL=http://localhost:3000/
   JWT_SECRET=your_jwt_secret_here
  ```
  
## 🐳 Running with Docker

After cloning the repository:

1. Make sure you have Docker installed → [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

2. Create a `.env` file in both `frontend` and `backend` folders (same as above).

3. Build the Docker image:
   
    ```bash
    docker build -t frontend .
    docker build -t backend .
    ```
    
5. Run the Docker image:
    ```bash
    docker run -p 3000:3000 frontend
    docker run -p 5000:5000 backend
    ```
---

✅ Done! You can now access:
- Frontend → [http://localhost:3000](http://localhost:3000)
- Backend → [http://localhost:5000](http://localhost:5000)

---

## 📌 Notes
- Make sure your `.env` files are present before building the Docker image.
