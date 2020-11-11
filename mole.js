const MIN_INTERVAL = 2000;
const MAX_INTERVAL = 20000;
const WAIT_INTERVAL = 500;
const HUNGRY_INTERVAL = 2000;
const wormContainer = document.querySelector(".worm-container");
let score = 0;

const getInterval = () =>
  Date.now() + MIN_INTERVAL + Math.floor(Math.random() * MAX_INTERVAL);
const getWaitInterval = () => Date.now() + WAIT_INTERVAL;
const getKingStatus = () => Math.random() > 0.9;
const getHungryInterval = () => Date.now() + HUNGRY_INTERVAL;

const moles = [
  {
    status: "sad",
    next: getWaitInterval(),
    king: true,
    node: document.getElementById("hole-0")
  },
  {
    status: "sad",
    next: getWaitInterval(),
    king: true,
    node: document.getElementById("hole-1")
  },
  {
    status: "sad",
    next: getWaitInterval(),
    king: true,
    node: document.getElementById("hole-2")
  },
  {
    status: "sad",
    next: getWaitInterval(),
    king: true,
    node: document.getElementById("hole-3")
  },
  {
    status: "sad",
    next: getWaitInterval(),
    king: true,
    node: document.getElementById("hole-4")
  },
  {
    status: "sad",
    next: getWaitInterval(),
    king: true,
    node: document.getElementById("hole-5")
  },
  {
    status: "sad",
    next: getWaitInterval(),
    king: true,
    node: document.getElementById("hole-6")
  },
  {
    status: "sad",
    next: getWaitInterval(),
    king: true,
    node: document.getElementById("hole-7")
  },
  {
    status: "sad",
    next: getWaitInterval(),
    king: true,
    node: document.getElementById("hole-8")
  },
  {
    status: "sad",
    next: getWaitInterval(),
    king: true,
    node: document.getElementById("hole-9")
  }
];

// Mole stages
const getNextStatus = mole => {
  switch (mole.status) {
    
    // mole leaving
    case "sad":
    case "fed":
      mole.next = getWaitInterval();
      if (mole.king) {
        mole.node.children[0].src = "./king-mole-leaving.png";
      } else {
        mole.node.children[0].src = "./mole-leaving.png";
      }
      mole.status = "leaving";
      break;

      // mole gone
    case "leaving":
      mole.next = getInterval();
      mole.king = false;
      mole.node.children[0].classList.add("gone");
      mole.status = "gone";
      break;

      // sad mole
    case "hungry":
      mole.node.children[0].classList.add("hungry");
      if (mole.king) {
        mole.node.children[0].src = "./king-mole-sad.png";
      } else {
        mole.node.children[0].src = "./mole-sad.png";
      }
      mole.status = "sad";
      mole.next = getWaitInterval();
      break;

      // hungry mole      
    case "gone":
      mole.status = "hungry";
      mole.king = getKingStatus();
      mole.next = getHungryInterval();
      mole.node.children[0].classList.add("hungry");
      mole.node.children[0].classList.remove("gone");
      if (mole.king) {
        mole.node.children[0].src = "./king-mole-hungry.png";
      } else {
        mole.node.children[0].src = "./mole-hungry.png";
      }
      break;
  }
};

      // feed mole
const feed = event => {
  if (event.target.tagName !== "IMG" || !event.target.classList.contains("hungry")) {
    return;
  }

  const mole = moles[+event.target.dataset.index];

      //happy mole
  mole.status = "fed";
  mole.next = getWaitInterval();
  mole.node.children[0].classList.remove("hungry");
  if (mole.king) {
    mole.node.children[0].src = "./king-mole-fed.png";
    score += 20;
  } else {
    mole.node.children[0].src = "./mole-fed.png";
    score += 10;
  }

    // win status
  if (score >= 100) {
    win();
    return;
  }

    // Expand worm on fed (const called on line 5)
  wormContainer.style.width = `${score}%`;
};

const win = () => {
  document.querySelector(".background").classList.add("hide");
  document.querySelector(".win").classList.add("show");
};


    // animation
document.querySelector(".background").addEventListener("click", feed);

const nextFrame = () => {
  const now = Date.now();
  for (let i = 0; i < moles.length; i++) {
    if (moles[i].next < now) {
      getNextStatus(moles[i]);
    }
  }
  requestAnimationFrame(nextFrame);
};

requestAnimationFrame(nextFrame);
