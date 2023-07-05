  

# SafetyCredit Dapp Project

  

This project was developed as a part of my research project in the Myers-Lawson School of Construction under the supervision of Dr. Alireza Shojaei.

  Read the full paper in the link below:
[https://doi.org/10.1016/j.autcon.2023.104959]



## What is SafetyCredit Dapp?

A decentralized application (dapp) aiming to automatically reward construction companies with Fungible Tokens (FTs) and Non-Fungible Tokens (NFTs) based on their safe behavior through the integration of smart contracts and computer-vision techniques.

Read the full paper in the link below:
[https://doi.org/10.1016/j.autcon.2023.104959](https://doi.org/10.1016/j.autcon.2023.104959 "Persistent link using digital object identifier")

  

[![Version](https://img.shields.io/badge/version-2.5-%1b365c)](https://img.shields.io/badge/version-2.5-%2300ff80)

  

[![NFT](https://img.shields.io/badge/NFT-ERC721-%1b365c)](https://img.shields.io/badge/NFT-ERC721-%2300ff80)

  

[![Token](https://img.shields.io/badge/Token-ERC20-%1b365c)](https://img.shields.io/badge/Token-ERC20-%2300ff80)

  

## Demo

This is a functional Demo presenting how the SafetyCredit Dapp works.

![SCTDemo_function (2)](https://user-images.githubusercontent.com/92793682/196040022-73c599b9-2ecb-439b-af85-ab5a942c6717.gif)

  
  

## Authors

  

- Hossein Naderi ([LinkedIn](https://www.linkedin.com/in/h-naderi/), [gitHub](https://github.com/h-naderi))

- Alireza Shojaei ([Profile](https://www.bc.vt.edu/people/shojaei), [GoogleScholar](https://scholar.google.com/citations?user=XaobvDoAAAAJ&hl=en))

- ReachSak Ly ([LinkedIn](https://kh.linkedin.com/in/reachsak))

  
  

## Structure

Codes and contracts can be found in the following structure:

  
  

```

`-- src

`-- components

|-- Contractor.jsx ..................... 1.

|-- Home.jsx ........................... 2.

|-- MyNav.jsx .......................... 3.

|-- Owner.jsx .......................... 4.

`-- contracts

|-- SCOperator.sol ..................... 5.

|-- SCTFactory.sol ..................... 6.

|-- SCNFTMinter.sol .................... 7.

`-- computerVisionModule....................

|-- README.md

|-- package.JSON

```

1. A React component developed to serve as Contractor Portal for the Dapp.

![2](https://user-images.githubusercontent.com/92793682/196046378-9726718a-8c00-43b1-919d-49eb1041e216.JPG)

2. A React component developed to serve as Home Portal for the Dapp.

![1](https://user-images.githubusercontent.com/92793682/196046373-0facc201-cad5-4eb5-80c5-ff2ed34f3162.JPG)

  

3. Navigation bar.

  

4. A React component developed to serve as Home Portal for the Dapp.

![3](https://user-images.githubusercontent.com/92793682/196046383-0e7017f5-c3b6-48ee-9b9a-98510f422e1c.JPG)

  

5. A smart contract developed in solidity to interact with users (detailed in paper)

  

6. A smart contract developed in solidity to generate

## Deployment

  
To deploy and run this React project locally on your computer, follow these steps:

1.  **Install Node.js**: If you don't have Node.js installed on your computer, you'll need to download and install it. Node.js is required to run the project and manage its dependencies. You can download Node.js from the official website: [https://nodejs.org](https://nodejs.org/)
    
2.  **Clone the repository**: Clone this repository to your local machine using the following command:

```
    `git clone <https://github.com/h-naderi/SafetyCredit-Dapp>`
```
3.  **Navigate to the project directory**: Open a terminal or command prompt, navigate to the directory where your React project is located. Use the `cd` command to change directories:
```    
    `cd project-directory` 
   ``` 
4.  **Install project dependencies**: In the terminal, run the following command to install the project dependencies specified in the `package.json` file:
    
```    
    `npm install 
   ``` 

    
5.  **Start the development server**: After the dependencies are installed, run the following command to start the development server:
    
```    
    `npm start 
   ``` 
    
6.  **View your React application**: Once the development server has started, you should see a message in the terminal indicating the local server address (usually [http://localhost:3000](http://localhost:3000/)). Open your web browser and navigate to that address to view your React application.
