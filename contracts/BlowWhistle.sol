// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.3;

contract BlowWhistle {

    string private story; // tell who the latest story is by.

    event CreatorGotPaid();

    event NewStoryPublished(string story);

    constructor(string memory initStory) {
      story = initStory;
    }

    function newStory(string memory _newStory) public {
        story = _newStory;
        emit NewStoryPublished(_newStory);
    }

    function latestStory() public view returns (string memory) {
        return story;
    }

}