// Initialize Matter.js
const Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

// Create an engine
const engine = Engine.create();

// Create a renderer
const render = Render.create({
  element: document.querySelector(".canvas-physics"),
  engine: engine,
  options: {
    width: 400,
    height: 300,
    wireframes: false,
    background: "transparent"
  },
});

// tech stack icons
const techStack = [];

for (let i = 0; i <= 6; i++) {
  techStack.push(
    Bodies.rectangle(200+(i*2), 200+(i*2), 45, 45, {
      render: {
        sprite: {
          texture: `./assets/svg/techStack${i}.svg`,
        },
      },
    })
  );
}

// Create walls
const wallOptions = {
  isStatic: true,
  render: {
    fillStyle: "transparent"
  },
};
const leftWall = Bodies.rectangle(0, 400 / 2, 20, 400, wallOptions);
const rightWall = Bodies.rectangle(400, 400 / 2, 20, 400, wallOptions);
const topWall = Bodies.rectangle(400 / 2, 0, 400, 20, wallOptions);
const bottomWall = Bodies.rectangle(400 / 2, 400, 400, 20, wallOptions);
const ground = Bodies.rectangle(400 / 2, 300, 400, 20, wallOptions);

World.add(engine.world, [
  ...techStack,
  leftWall,
  rightWall,
  topWall,
  bottomWall,
  ground,
]);

// Add gravity
engine.world.gravity.y = 0.5;

// Make shapes draggable
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false,
    },
  },
});

World.add(engine.world, mouseConstraint);

// Run the engine
Matter.Runner.run(engine);

// Run the renderer
Render.run(render);

// form
const message = document.querySelector(".message");
const submitBtn = document.querySelector(".send-button");

submitBtn.addEventListener("click", () => {
  if (message.value.length >= 10) {
    window.location.href = `mailto:pradish@sandbox.com.np?subject=Sandbox.com.np!&body=${message.value}!`;
  }
});
