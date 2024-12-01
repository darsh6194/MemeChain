// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract MEMEToken is ERC20, Ownable, ReentrancyGuard {
    // Structs
    struct Meme {
        uint256 id;
        address creator;
        string ipfsHash;
        uint256 likes;
        uint256 shares;
        uint256 comments;
        uint256 timestamp;
        bool isActive;
    }

    // State variables
    uint256 private _memeCounter;
    mapping(uint256 => Meme) public memes;
    mapping(address => uint256[]) public userMemes;
    mapping(uint256 => mapping(address => bool)) public hasLiked;
    mapping(uint256 => mapping(address => bool)) public hasShared;

    // Reward amounts (in tokens)
    uint256 public constant CREATION_REWARD = 5 * 10**18;  // 5 tokens
    uint256 public constant LIKE_REWARD = 1 * 10**18;      // 1 token
    uint256 public constant SHARE_REWARD = 2 * 10**18;     // 2 tokens
    uint256 public constant COMMENT_REWARD = 5 * 10**17;   // 0.5 tokens

    // Events
    event MemeCreated(uint256 indexed memeId, address indexed creator, string ipfsHash);
    event MemeLiked(uint256 indexed memeId, address indexed liker);
    event MemeShared(uint256 indexed memeId, address indexed sharer);
    event MemeCommented(uint256 indexed memeId, address indexed commenter);

    constructor(address initialOwner) 
        ERC20("MemeChain Token", "MEME") 
        Ownable(initialOwner)
    {
        // Mint initial supply to contract creator
        _mint(initialOwner, 1000000 * 10**18); // 1 million tokens
    }

    // Create a new meme
    function createMeme(string memory _ipfsHash) external nonReentrant {
        require(bytes(_ipfsHash).length > 0, "Invalid IPFS hash");
        
        _memeCounter++;
        
        Meme memory newMeme = Meme({
            id: _memeCounter,
            creator: msg.sender,
            ipfsHash: _ipfsHash,
            likes: 0,
            shares: 0,
            comments: 0,
            timestamp: block.timestamp,
            isActive: true
        });
        
        memes[_memeCounter] = newMeme;
        userMemes[msg.sender].push(_memeCounter);
        
        // Reward creator
        _mint(msg.sender, CREATION_REWARD);
        
        emit MemeCreated(_memeCounter, msg.sender, _ipfsHash);
    }

    // Like a meme
    function likeMeme(uint256 _memeId) external nonReentrant {
        require(_memeId <= _memeCounter && _memeId > 0, "Invalid meme ID");
        require(memes[_memeId].isActive, "Meme is not active");
        require(!hasLiked[_memeId][msg.sender], "Already liked this meme");
        require(memes[_memeId].creator != msg.sender, "Cannot like own meme");

        memes[_memeId].likes++;
        hasLiked[_memeId][msg.sender] = true;

        // Reward meme creator
        _mint(memes[_memeId].creator, LIKE_REWARD);

        emit MemeLiked(_memeId, msg.sender);
    }

    // Share a meme
    function shareMeme(uint256 _memeId) external nonReentrant {
        require(_memeId <= _memeCounter && _memeId > 0, "Invalid meme ID");
        require(memes[_memeId].isActive, "Meme is not active");
        require(!hasShared[_memeId][msg.sender], "Already shared this meme");
        require(memes[_memeId].creator != msg.sender, "Cannot share own meme");

        memes[_memeId].shares++;
        hasShared[_memeId][msg.sender] = true;

        // Reward meme creator
        _mint(memes[_memeId].creator, SHARE_REWARD);

        emit MemeShared(_memeId, msg.sender);
    }

    // Comment on a meme
    function commentOnMeme(uint256 _memeId) external nonReentrant {
        require(_memeId <= _memeCounter && _memeId > 0, "Invalid meme ID");
        require(memes[_memeId].isActive, "Meme is not active");
        require(memes[_memeId].creator != msg.sender, "Cannot comment on own meme");

        memes[_memeId].comments++;

        // Reward meme creator
        _mint(memes[_memeId].creator, COMMENT_REWARD);

        emit MemeCommented(_memeId, msg.sender);
    }

    // Deactivate meme (only creator or owner can deactivate)
    function deactivateMeme(uint256 _memeId) external {
        require(_memeId <= _memeCounter && _memeId > 0, "Invalid meme ID");
        require(
            memes[_memeId].creator == msg.sender || owner() == msg.sender,
            "Not authorized"
        );
        require(memes[_memeId].isActive, "Meme already deactivated");

        memes[_memeId].isActive = false;
    }

    // View functions
    function getMeme(uint256 _memeId) external view returns (Meme memory) {
        require(_memeId <= _memeCounter && _memeId > 0, "Invalid meme ID");
        return memes[_memeId];
    }

    function getUserMemes(address _user) external view returns (uint256[] memory) {
        return userMemes[_user];
    }

    function getTotalMemes() external view returns (uint256) {
        return _memeCounter;
    }

    // Override update function for any transfer restrictions
    function _update(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        super._update(from, to, amount);
        // Add any transfer restrictions here if needed
    }
}