# **MemeChain**  
A decentralized application (dApp) for uploading, sharing, and managing memes on the Ethereum blockchain. MemeChain leverages blockchain technology to ensure meme ownership, authenticity, and immutability. 🚀

## **Table of Contents**  
- [Introduction](#introduction)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Smart Contract](#smart-contract)  
- [Screenshots](#screenshots)  
- [Future Enhancements](#future-enhancements)  
- [License](#license)

---

## **Introduction**  
MemeChain is a decentralized platform that empowers users to upload and share memes securely on the Ethereum blockchain. By utilizing smart contracts, MemeChain ensures that all memes are stored transparently and cannot be tampered with, providing a fun and secure way to engage with meme culture.

---

## **Features**  
✨ Decentralized meme storage on the Ethereum blockchain  
✨ Upload memes with ownership tied to your Ethereum wallet  
✨ View a collection of uploaded memes in a user-friendly interface  
✨ Seamless integration with MetaMask for blockchain transactions  
✨ Immutability and transparency powered by smart contracts

---

## **Tech Stack**  
**Frontend:**  
- React JS  
- Tailwind CSS  
- MetaMask Integration

**Backend & Blockchain:**  
- Ethereum  
- Hardhat for smart contract development  
- Solidity for smart contract code  

---

## **Installation**  

### **1. Clone the repository**  
```bash  
git clone https://github.com/yourusername/memechain.git  
cd memechain
```

### **2. Install dependencies**  
```bash  
# Navigate to frontend directory
cd frontend
npm install  

# Navigate to backend directory (Hardhat)
cd ../backend
npm install
```

### **3. Configure Environment Variables**  
Create a `.env` file in the backend directory and add the following:  
```bash  
REACT_APP_ADDRESS = "local wallet address"
```

### **4. Compile and Deploy Smart Contracts**  
```bash  
cd backend
npx hardhat compile
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

### **5. Start the Frontend**  
```bash  
cd ../frontend
npm start  
```

---

## **Usage**  
1. Connect your MetaMask wallet to the app.  
2. Upload a meme by selecting a file and submitting it.  
3. The meme is stored on the blockchain and can be viewed in the gallery with associated metadata (owner, upload time, etc.).

---

## **Smart Contract**  
The smart contract for MemeChain is written in Solidity and handles:  
- Meme uploads  
- Storing IPFS hashes for meme images  
- Mapping memes to their respective owners  

You can find the contract in the `contracts/MemeChain.sol` file.

---

## **Screenshots**  
![Meme Upload Screen](https://via.placeholder.com/800x400?text=Screenshot+1)  
*Meme upload page with MetaMask integration*  

![Meme Gallery](https://via.placeholder.com/800x400?text=Screenshot+2)  
*Gallery showcasing uploaded memes*  

## Demo Video

Watch the full demo of **MemeChain** in action below:

<iframe width="560" height="315" src="https://youtu.be/-3vmBqWZXjA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

## **Future Enhancements**  
- Add IPFS for decentralized meme storage  
- Implement meme upvotes/downvotes for community engagement  
- Enable users to trade memes as NFTs  
- Support multiple blockchain networks

---

## **License**  
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Contributing**  
Contributions are welcome! Please fork the repository and submit a pull request for any feature additions or improvements.

---

## **Contact**  
Feel free to reach out with any questions or feedback!  

👤 **M Darshan**  
📧 Email: yourname@example.com  
🔗 LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)
