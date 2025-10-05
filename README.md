🧠 Interactive SVM Visualizer

An interactive Support Vector Machine (SVM) visualizer built with React, JavaScript, HTML Canvas, and Tailwind CSS.
This tool helps visualize how Linear, Polynomial, and RBF kernels classify data by showing decision boundaries, support vectors, and background gradients dynamically.


🚀 Features

🎨 Interactive Canvas – Add, move, or remove data points with mouse clicks.

⚙️ Three Kernels – Linear, Polynomial, and RBF (Radial Basis Function).

🔍 Real-time Classification – Visualize decision boundaries and support vectors instantly.

🧩 Custom Visual Differentiation

Linear: solid boundary and circular support vectors.

Polynomial: soft curved gradient with square vectors.

RBF: smooth radial gradient with triangular support vectors.

💾 Export and Clear – Save current state as JSON or reset the canvas.

💬 Toast Notifications – Feedback for every user action using sonner.

⚡ Built using Vite for lightning-fast builds.


🛠️ Tech Stack
Technology	Purpose
ReactJS	UI framework for component-based structure
JavaScript (ES6)	Core logic for SVM computation
HTML Canvas API	Drawing points, grids, and decision boundaries
Tailwind CSS	Styling for modern UI
Lucide React	Icons for actions
Sonner	Notification system
ml-svm	Lightweight JavaScript SVM library
Vite	Development environment and bundler


🧩 Project Structure
svm-visualizer/
├── src/
│   ├── components/
│   │   ├── ui/               
│   │   └── svm/
│   │       └── SVMCanvas.jsx  
│   │   └── utils.js           
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── vite.config.js
├── public/
│   
├── package.json
└── README.md



⚙️ Installation & Setup

Clone this repository

git clone https://github.com/DhanujaAnbalagan/svm-visualizer.git
cd svm-visualizer


Install dependencies

npm install

Run the app

npm run dev


🧠 How It Works

Add Data Points:

Click on the canvas to add a point.

Toggle between Class A and Class B using the buttons.

Select Kernel:

Choose one of the three kernels: Linear, Polynomial, or RBF.

Train the Model:

Click “Train SVM” to compute the boundary.

The app uses ml-svm to calculate decision functions.

Visualize Results:

The background color represents class confidence.

Support vectors are marked with unique shapes for each kernel.

Curved and radial gradients show non-linear decision regions.

Export Results:

Download a JSON file of current data points, kernel type, and SVM info.

🎨 Kernel Visualization
Kernel	Decision Boundary	Support Vector Shape	Gradient Style
Linear	Solid straight line	Circle	Uniform color
Polynomial	Dashed curved line	Square	Smooth curved gradient
RBF	Dotted soft curve	Triangle	Radial gradient



🧠 Technical Concepts Used

Support Vector Machines (SVM): Finds the optimal hyperplane that separates two classes.

Kernel Trick: Transforms data into higher-dimensional space to make it linearly separable.

Canvas API: Draws and updates visualization efficiently in real-time.

React Hooks: Manages canvas state and interactions.

Gradient Visualization: Uses pixel-level classification scores to render smooth decision regions.


📈 Learning Outcomes

Understanding of SVM and kernel-based classification.

Implementation of real-time ML visualization using frontend-only tech.

Integration of React with Canvas API for dynamic graphics.

Improved grasp of gradient-based visualization techniques.


🧩 Future Enhancements

Add multi-class classification support.

Implement dynamic parameter tuning for C and gamma values.

Include 3D visualization of decision surfaces.

Optimize for larger datasets using WebAssembly or GPU acceleration.