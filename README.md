# 🧠 Interactive SVM Visualizer

An interactive Support Vector Machine (SVM) visualizer built using React, HTML Canvas, and Tailwind CSS to demonstrate how different kernels classify data in real time.

This tool helps students and developers understand how Linear, Polynomial, and RBF kernels form decision boundaries and identify support vectors.

---

## 🚀 Features

- Interactive canvas for adding and removing data points
- Real-time decision boundary visualization
- Three kernel options:
  - Linear
  - Polynomial
  - RBF
- Visual differentiation of support vectors
- Gradient-based decision region rendering
- Export current dataset as JSON
- Canvas reset functionality
- Toast notifications for user actions

---

## 🛠 Tech Stack

| Technology | Purpose |
|----------|--------|
| ReactJS | UI framework |
| JavaScript (ES6) | SVM logic |
| HTML Canvas API | Visualization rendering |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| Sonner | Notifications |
| ml-svm | SVM computation |
| Vite | Build tool |

---

## 🧩 Project Structure

<img width="326" height="419" alt="image" src="https://github.com/user-attachments/assets/eb3fbd96-156e-46c7-8f47-58e27f569eaa" />


---

## ⚙️ Installation

Clone the repository:

git clone https://github.com/DhanujaAnbalagan/svm-visualizer.git

cd svm-visualizer

Install dependencies:

npm instal

Run the application:

npm run dev


---

## 🧠 How It Works

### Add Data Points
Click on the canvas to add training samples.

Toggle between Class A and Class B using controls.

---

### Train the Model
Click **Train SVM** to compute:
- decision boundary
- support vectors
- classification regions

The application uses the `ml-svm` library internally.

---

### Kernel Visualization

| Kernel | Decision Boundary | Support Vector Shape | Gradient Style |
|-------|------------------|----------------------|---------------|
| Linear | Straight line | Circle | Uniform |
| Polynomial | Curved | Square | Smooth gradient |
| RBF | Soft radial | Triangle | Radial gradient |

---

## 📈 Learning Outcomes

This project demonstrates:

- Support Vector Machine classification
- Kernel-based learning
- Real-time visualization using Canvas
- React state management
- Gradient-based classification rendering

---

## 🔮 Future Improvements

- Multi-class classification
- Dynamic hyperparameter tuning
- 3D decision surface visualization
- GPU/WebAssembly acceleration

---

## Author
Dhanuja Anbalagan
