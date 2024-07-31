//using BepuPhysics.Entities.Prefabs;
using BepuPhysics;
//using BepuPhysics; // https://github.com/bepu/bepuphysics2
//using ConversionHelper;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using BepuPhysics.CollisionRuleManagement;
//using BEPUphysics.Entities;
using BepuUtilities; // https://github.com/bepu/bepuphysics2
//using DemoRenderer; // https://github.com/bepu/bepuphysics2
using System.Reflection.Metadata;
using BepuPhysics.Collidables;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.Xna.Framework.Audio;
using BepuPhysics.CollisionDetection;
using System.Diagnostics;
//using DemoRenderer;
//using BEPUPhysics.Collidables;
//using DemoRenderer;
//using BepuPhysics.Collidables; // https://github.com/bepu/bepuphysics2


namespace SpaceRace3D
{
    public class Game1 : Game
    {
        private GraphicsDeviceManager _graphics;
        private SpriteBatch _spriteBatch;

        SpriteFont defaultFont;
        Texture2D sliderTexture;
        Texture2D backgroundTexture;

        // sound effect variables
        private SoundEffect collisionSoundEffect;
        private SoundEffect cheerSoundEffect;
        private SoundEffect engineSoundEffect;
        private SoundEffectInstance collisionSoundInstance;
        private SoundEffectInstance cheerSoundInstance;
        private SoundEffectInstance engineSoundInstance;

        KeyboardState keyboardState; // holds what your keyboard is doing

        private ScrollingBackground scrollingBackground; // displays space background

        private float timeSeconds; // keeps track of the amount of seconds passed since the start of the game
        private float finalTimeSeconds; // keeps track of the amount of seconds passed since the start of the game and adds the penalty time on top
        private bool hasFinished; // keeps track of whether the player has finished the race or not. is true when the last goal/checkpoint has been triggered
        private float penaltySeconds; // the amount of seconds a penalty adds
        private int amountPenalty; // the amount of penalties the player has

        private Microsoft.Xna.Framework.Matrix _worldMatrix;

        //private Sphere _playerEntity;
        private Model _playerShip;
        private Vector3 _playerPosition;

        private bool collisionoccurred = false; // for testing

        private Model goalHole;
        private Vector3[] goalPosition = new Vector3[100]; // handles up to 100 goals... can obviously be easily changed here
        private Vector3[] goalRotation = new Vector3[100];
        private bool[] goalMade = new bool[100];
        private int goalCount; // number of goals made
        private int numGoals;

        Vector3 cameraPosition;
        Vector3 cameraTarget; // == _playerPosition but up (relative to the top of the ship) by 100
        Vector3 cameraUpVector;

        private float _aspectRatio;

        private float throttleAmount; // also correlates the volume of the engine sound
        private float pitchAmount; // up and down relative to ship. represents the amount of "throttle" in the direction of pitch
        private float yawAmount; // left and right relative to ship. represents the amount of "throttle" in the direction of yaw
        private float rollAmount; // do a barrel roll! represents the amount of "throttle" in the direction of roll

        private float stopThrottleTime; // amount of time before the player can turn on the engine again

        private bool controllerThrottleUsed; // whether or not the controller throttle buttons are being used at the moment

        //private float playerRotationX, playerRotationY, playerRotationZ;

        private Vector3 shipVelocity;
        private Vector3 shipRotation; // represents the rotation of each axis (0 - 2pi). X = roll axis, Y = yaw axis, Z = pitch axis
        //private float shipRollPosition; // if the ship is facing its default position, roll would be pi/2

        private Vector3 playerPointDir = new Vector3(1, 0, 0);

        //private Camera _camera;
        public Game1()
        {
            _graphics = new GraphicsDeviceManager(this);
            Content.RootDirectory = "Content";
            IsMouseVisible = true;
        }
        
        /*
        public PlayerIndex(Game game) : base(game)
        {
            Space s = (Space)game.Services.GetService(typeof(Space));
            _playerEntity = new Sphere(new BEPUutilities.Vector3(0, 0, -1000), 200.0f, 1);
            _playerEntity.Material.Bounciness = 1;
            s.Add(_enemyEntity);
        }
        */
        /*
        public Entity MyEntity
        {
            get { return _playerEntity; }
        }
        */

        protected override void Initialize()
        {
            timeSeconds = 0;
            penaltySeconds = 25;
            amountPenalty = 0;
            hasFinished = false;

            goalCount = 0;

            stopThrottleTime = 0;

            // define goals
            numGoals = 0;
            goalPosition[numGoals] = new Vector3(1500, 0, 0); goalRotation[numGoals] = new Vector3(0, 0, (float)(Math.PI / 2)); goalMade[numGoals] = false; numGoals++;
            goalPosition[numGoals] = new Vector3(5500, -500, 500); goalRotation[numGoals] = new Vector3(0, (float)(Math.PI / 6), (float)(Math.PI / 2)); goalMade[numGoals] = false; numGoals++;
            goalPosition[numGoals] = new Vector3(7000, -1000, 8500-4000); goalRotation[numGoals] = new Vector3(0, (float)(Math.PI), (float)(Math.PI / 2)); goalMade[numGoals] = false; numGoals++;
            goalPosition[numGoals] = new Vector3(8000, -1500, 12500-4000); goalRotation[numGoals] = new Vector3(0, (float)(Math.PI / 2), (float)(Math.PI / 4)); goalMade[numGoals] = false; numGoals++;
            goalPosition[numGoals] = new Vector3(9000, -3500, 15000 - 4000); goalRotation[numGoals] = new Vector3(0, (float)(Math.PI / 2), (float)(Math.PI / 8)); goalMade[numGoals] = false; numGoals++;
            goalPosition[numGoals] = new Vector3(9000, -5500, 15000 - 4000); goalRotation[numGoals] = new Vector3(0, (float)(Math.PI / 2), 0); goalMade[numGoals] = false; numGoals++;
            goalPosition[numGoals] = new Vector3(9000, -7500, 15000 - 4000); goalRotation[numGoals] = new Vector3(0, (float)(Math.PI / 2), 0); goalMade[numGoals] = false; numGoals++;

            cameraPosition = new Vector3(0.0f, 100.0f, 0.0f);
            cameraTarget = new Vector3(500, 100, 0);
            cameraUpVector = new Vector3(0, 500, 0);

            shipVelocity = new Vector3(0, 0, 0);
            shipRotation = new Vector3(0, 0, 0);

            controllerThrottleUsed = false;

            throttleAmount = 0;
            pitchAmount = 0;
            yawAmount = 0;
            rollAmount = 0;
            //shipRollPosition = (float)(Math.PI / 2);
            //playerRotationX = 0; playerRotationY = 0; playerRotationZ = 0;

            _playerPosition = new Vector3(500, 0, 0);
            //_playerEntity = new Sphere(100);

            if (engineSoundInstance != null)
            {
                engineSoundInstance.Volume = 0;
            }
            

            base.Initialize();
        }

        protected override void LoadContent()
        {
            _spriteBatch = new SpriteBatch(GraphicsDevice);
            //_spriteBatch = new SpriteBatch(_graphics.GraphicsDevice);

            //_playerShip = Content.Load<Model>("paper-fireworks-rocket-001"); // courtesy freepik
            _playerShip = Content.Load<Model>("doughnutmonogame");
            goalHole = Content.Load<Model>("doughnutmonogame");
            defaultFont = Content.Load<SpriteFont>("Arial16");
            sliderTexture = Content.Load<Texture2D>("GolfWallColsen");

            backgroundTexture = Content.Load<Texture2D>("SpaceBackground"); // courtesy space.com
            scrollingBackground = new ScrollingBackground();
            scrollingBackground.Load(GraphicsDevice, backgroundTexture);

            cheerSoundEffect = Content.Load<SoundEffect>("SoundCheer");
            collisionSoundEffect = Content.Load<SoundEffect>("SoundCollision");
            engineSoundEffect = Content.Load<SoundEffect>("428461__theearthcollective__engine_6"); // courtesy TheEarthCollective
            engineSoundInstance = engineSoundEffect.CreateInstance();
            engineSoundInstance.Volume = 0;
            engineSoundInstance.IsLooped = true;
            engineSoundInstance.Play();

            //_camera = Services.GetService<Camera>();

            //_aspectRatio = ((GraphicsDeviceManager)Services.GetService(typeof(GraphicsDeviceManager))).GraphicsDevice.Viewport.AspectRatio;
            _aspectRatio = _graphics.GraphicsDevice.Viewport.AspectRatio;

            base.LoadContent();
            
        }

        protected override void Update(GameTime gameTime)
        {
            if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed || Keyboard.GetState().IsKeyDown(Keys.Escape) || collisionoccurred)
                Exit();

            keyboardState = Keyboard.GetState();

            if (keyboardState.IsKeyDown(Keys.R) || GamePad.GetState(PlayerIndex.One).Buttons.Start == ButtonState.Pressed)
            {
                Initialize();
            }

            if (!hasFinished)
            {
                float pitchMultiplier = 5; float pitchLimit = 10;
                float rollMultiplier = 5; float rollLimit = 10;
                float yawMultiplier = 1; float yawLimit = 1;
                // yaw left/counterclockwise (- yaw)
                if (keyboardState.IsKeyDown(Keys.D) || GamePad.GetState(PlayerIndex.One).Buttons.RightShoulder == ButtonState.Pressed)
                {
                    //Debug.WriteLine("Rotating Shot Counter Clockwise");
                    yawAmount = (float)(yawAmount - yawMultiplier * gameTime.ElapsedGameTime.TotalSeconds);

                    if (yawAmount < -yawLimit)
                    {
                        yawAmount = -yawLimit;
                    }
                }
                // yaw right/clockwise (+ yaw)
                if (keyboardState.IsKeyDown(Keys.A) || GamePad.GetState(PlayerIndex.One).Buttons.LeftShoulder == ButtonState.Pressed)
                {
                    //Debug.WriteLine("Rotating Shot Clockwise");

                    yawAmount = (float)(yawAmount + yawMultiplier * gameTime.ElapsedGameTime.TotalSeconds);

                    if (yawAmount > yawLimit)
                    {
                        yawAmount = yawLimit;
                    }

                }
                // roll left/counterclockwise (- roll)
                if (keyboardState.IsKeyDown(Keys.Q) || GamePad.GetState(PlayerIndex.One).DPad.Left == ButtonState.Pressed)
                {
                    rollAmount = (float)(rollAmount - rollMultiplier * gameTime.ElapsedGameTime.TotalSeconds);

                    if (rollAmount < -rollLimit)
                    {
                        rollAmount = -rollLimit;
                    }
                }
                // roll right/clockwise (+ roll)
                if (keyboardState.IsKeyDown(Keys.E) || GamePad.GetState(PlayerIndex.One).DPad.Right == ButtonState.Pressed)
                {
                    rollAmount = (float)(rollAmount + rollMultiplier * gameTime.ElapsedGameTime.TotalSeconds);

                    if (rollAmount > rollLimit)
                    {
                        rollAmount = rollLimit;
                    }
                }
                // pitch down/counterclockwise (- pitch)
                if (keyboardState.IsKeyDown(Keys.W) || GamePad.GetState(PlayerIndex.One).DPad.Up == ButtonState.Pressed)
                {
                    pitchAmount = (float)(pitchAmount - pitchMultiplier * gameTime.ElapsedGameTime.TotalSeconds);

                    if (pitchAmount < -pitchLimit)
                    {
                        pitchAmount = -pitchLimit;
                    }
                }
                // pitch up/clockwise (+ pitch)
                if (keyboardState.IsKeyDown(Keys.S) || GamePad.GetState(PlayerIndex.One).DPad.Down == ButtonState.Pressed)
                {
                    pitchAmount = (float)(pitchAmount + pitchMultiplier * gameTime.ElapsedGameTime.TotalSeconds);

                    if (pitchAmount > pitchLimit)
                    {
                        pitchAmount = pitchLimit;
                    }
                }

                if (keyboardState.IsKeyDown(Keys.Space)) // stop ship in place
                {
                    shipVelocity = new Vector3(0, 0, 0);
                    pitchAmount = 0;
                    yawAmount = 0;
                    rollAmount = 0;
                    throttleAmount = 0;
                }

                float ThrottleMultiplier = 10;
                float throttleLimitMin = -5;
                float throttleLimit = 10;
                float ThrottleIncreaseMultiplier = 5;
                float ThrottleDecreaseMultiplier = 1;
                // set power
                if (GamePad.GetState(PlayerIndex.One).IsConnected && (GamePad.GetState(PlayerIndex.One).Triggers.Right >= 0.01 || GamePad.GetState(PlayerIndex.One).Triggers.Left >= 0.01))
                {
                    
                    throttleAmount = -GamePad.GetState(PlayerIndex.One).Triggers.Left * throttleLimitMin + GamePad.GetState(PlayerIndex.One).Triggers.Right * throttleLimit;
                    controllerThrottleUsed = true;

                    if (stopThrottleTime > 0)
                    {
                        stopThrottleTime = (float)(stopThrottleTime - gameTime.ElapsedGameTime.TotalSeconds);
                        throttleAmount = 0;
                        if (stopThrottleTime < 0)
                        {
                            stopThrottleTime = 0;
                        }
                    }
                }
                else if (keyboardState.IsKeyDown(Keys.LeftShift)) // increase power
                {
                    //Debug.WriteLine("Mo Juice");
                    
                    throttleAmount = (float)(throttleAmount + ThrottleIncreaseMultiplier * gameTime.ElapsedGameTime.TotalSeconds);

                    controllerThrottleUsed = false;
                    
                    if (throttleAmount > throttleLimit)
                    {
                        throttleAmount = throttleLimit;
                    }

                    if (stopThrottleTime > 0)
                    {
                        stopThrottleTime = (float)(stopThrottleTime - gameTime.ElapsedGameTime.TotalSeconds);
                        throttleAmount = 0;
                        if (stopThrottleTime < 0)
                        {
                            stopThrottleTime = 0;
                        }
                    }

                } else if (keyboardState.IsKeyDown(Keys.LeftControl) && GamePad.GetState(PlayerIndex.One).Triggers.Right < 0.01) // decrease power
                {
                    //Debug.WriteLine("Less Juice");
                    
                    throttleAmount = (float)(throttleAmount - ThrottleDecreaseMultiplier * gameTime.ElapsedGameTime.TotalSeconds);

                    controllerThrottleUsed = false;

                    if (throttleAmount < throttleLimitMin)
                    {
                        throttleAmount = throttleLimitMin;
                    }

                    if (stopThrottleTime > 0)
                    {
                        stopThrottleTime = (float)(stopThrottleTime - gameTime.ElapsedGameTime.TotalSeconds);
                        throttleAmount = 0;
                        if (stopThrottleTime < 0)
                        {
                            stopThrottleTime = 0;
                        }
                    }

                }
                else if (throttleAmount <= 0.01 * ThrottleMultiplier && throttleAmount >= -0.01 * ThrottleMultiplier && GamePad.GetState(PlayerIndex.One).IsConnected) // if the controller is connected and the trigger is not pulled and the power isnt being increased by the keyboard
                {
                    throttleAmount = 0;
                    controllerThrottleUsed = false;

                    if (stopThrottleTime > 0)
                    {
                        stopThrottleTime = (float)(stopThrottleTime - gameTime.ElapsedGameTime.TotalSeconds);
                        throttleAmount = 0;
                        if (stopThrottleTime < 0)
                        {
                            stopThrottleTime = 0;
                        }
                    }
                }

                scrollingBackground.Update((float)(gameTime.ElapsedGameTime.TotalSeconds * 100));
            }

            
            //_worldMatrix = MathConverter.Convert(_playerEntity.WorldTransform);
            //_worldMatrix = BepuUtilities.Matrix.CreateLookAt(cameraPosition, cameraTarget, cameraUpVector);
            _worldMatrix = Microsoft.Xna.Framework.Matrix.CreateWorld(cameraPosition, cameraTarget, cameraUpVector);

            base.Update(gameTime);
        }

        protected override void Draw(GameTime gameTime)
        {
            UpdateEngineSound();
            
            // create background
            GraphicsDevice.Clear(Color.CornflowerBlue);
            _spriteBatch.Begin();
            scrollingBackground.Draw(_spriteBatch);
            _spriteBatch.End();

            // fix bug where 3D graphics dont display correctly when mixing 2D and 3D elements
            GraphicsDevice.BlendState = BlendState.Opaque;
            GraphicsDevice.DepthStencilState = DepthStencilState.Default;
            GraphicsDevice.SamplerStates[0] = SamplerState.LinearWrap;


            if (!hasFinished)
            {
                timeSeconds = (float)(timeSeconds + gameTime.ElapsedGameTime.TotalSeconds);
            }
            if (hasFinished)
            {
                //calculate the amount of penalities
                amountPenalty = 2;
                finalTimeSeconds = timeSeconds + penaltySeconds * amountPenalty;
            }


            Microsoft.Xna.Framework.Matrix[] playerTransforms = new Microsoft.Xna.Framework.Matrix[_playerShip.Bones.Count];
            _playerShip.CopyAbsoluteBoneTransformsTo(playerTransforms);
            /*
            // calculate movement
            for (int i = 0; i < numGoals; i++)
            {
                if (DealWithCollision(goalPosition[i], goalRotation[i]))
                {
                    break;
                }
            }
            */
            FindPlayerVelocityVector(gameTime);

            // set player position with the finalized velocity vector
            _playerPosition.X = (float)(_playerPosition.X + shipVelocity.X * gameTime.ElapsedGameTime.TotalSeconds);
            _playerPosition.Y = (float)(_playerPosition.Y + shipVelocity.Y * gameTime.ElapsedGameTime.TotalSeconds);
            _playerPosition.Z = (float)(_playerPosition.Z + shipVelocity.Z * gameTime.ElapsedGameTime.TotalSeconds);

            // drawing code here
            foreach (ModelMesh mesh in _playerShip.Meshes) // drawing code given in 437 slides
            {
                foreach (BasicEffect effect in mesh.Effects)
                {
                    effect.EnableDefaultLighting();

                    effect.World = playerTransforms[mesh.ParentBone.Index]
                        * Microsoft.Xna.Framework.Matrix.CreateRotationX(shipRotation.X)  
                        * Microsoft.Xna.Framework.Matrix.CreateRotationY(shipRotation.Y) 
                        * Microsoft.Xna.Framework.Matrix.CreateRotationZ(shipRotation.Z) 
                        * Microsoft.Xna.Framework.Matrix.CreateTranslation(_playerPosition);
                    //effect.World = _worldMatrix;
                    //effect.World = playerTransforms[mesh.ParentBone.Index] * Microsoft.Xna.Framework.Matrix.CreateLookAt(_playerPosition, Vector3.Add(_playerPosition, playerPointDir), cameraUpVector) * Microsoft.Xna.Framework.Matrix.CreateTranslation(_playerPosition);

                    effect.View = Microsoft.Xna.Framework.Matrix.CreateLookAt(cameraPosition, cameraTarget, cameraUpVector);
                    effect.Projection = Microsoft.Xna.Framework.Matrix.CreatePerspectiveFieldOfView(BepuUtilities.MathHelper.ToRadians(45.0f), _aspectRatio, 1.0f, 10000.0f);
                }
                mesh.Draw();
            }

            Microsoft.Xna.Framework.Matrix[] goalTransforms = new Microsoft.Xna.Framework.Matrix[goalHole.Bones.Count];
            goalHole.CopyAbsoluteBoneTransformsTo(goalTransforms);
            for (int i = 0; i < numGoals; i++)
            {
                foreach (ModelMesh mesh in goalHole.Meshes) // drawing code based on in 437 slides
                {
                    foreach (BasicEffect effect in mesh.Effects)
                    {
                        effect.EnableDefaultLighting();
                        //effect.World = _worldMatrix;
                        effect.World = goalTransforms[mesh.ParentBone.Index] 
                            * Microsoft.Xna.Framework.Matrix.CreateScale(10) 
                            * Microsoft.Xna.Framework.Matrix.CreateRotationX(goalRotation[i].X) 
                            * Microsoft.Xna.Framework.Matrix.CreateRotationY(goalRotation[i].Y) * Microsoft.Xna.Framework.Matrix.CreateRotationZ(goalRotation[i].Z) 
                            * Microsoft.Xna.Framework.Matrix.CreateTranslation(goalPosition[i]);
                        //effect.View = Microsoft.Xna.Framework.Matrix.CreateLookAt(_camera.Position, _camera.Forward, _camera.Up);

                        effect.View = Microsoft.Xna.Framework.Matrix.CreateLookAt(cameraPosition, cameraTarget, cameraUpVector);
                        effect.Projection = Microsoft.Xna.Framework.Matrix.CreatePerspectiveFieldOfView(BepuUtilities.MathHelper.ToRadians(45.0f), _aspectRatio, 1.0f, 10000.0f);
                    }
                    mesh.Draw();
                }

                // check if goals made
                if (!goalMade[i] && !hasFinished)
                {
                    if (Vector3.Distance(_playerPosition, goalPosition[i]) < 600) // if the ship is inside the hole of the donut
                    {
                        goalMade[i] = true;
                        goalCount++;
                    }
                }

                if (i == numGoals - 1 && goalMade[i])
                {
                    hasFinished = true;
                    amountPenalty = numGoals - goalCount;
                    finalTimeSeconds = timeSeconds + penaltySeconds * amountPenalty;
                }
            }
            

            // draw 2D elements
            _spriteBatch.Begin();
            if (hasFinished)
            {
                _spriteBatch.DrawString(defaultFont, "Final Time: " + ((int)(finalTimeSeconds / 60)).ToString() + ":" + (finalTimeSeconds - (((int)(finalTimeSeconds / 60)) * 60)).ToString() + 
                    "\nAmount of Penalties: " + amountPenalty.ToString(), new Vector2(50, 350), Color.White);
            } else
            {
                _spriteBatch.DrawString(defaultFont, "Time: " + ((int)(timeSeconds / 60)).ToString() + ":" + (timeSeconds - (((int)(timeSeconds / 60)) * 60)).ToString() + "\nNumber Goals Made: " + goalCount.ToString() + " of " + numGoals.ToString(), new Vector2(50, 350), Color.White);
                Rectangle throttleRectangle;
                if (throttleAmount >= 0)
                {
                    throttleRectangle = new Rectangle(50, 50, (int)(throttleAmount * 25), 15);
                } else
                {
                    throttleRectangle = new Rectangle(50 - (int)(-throttleAmount * 25), 50, (int)(-throttleAmount * 25), 15);
                }

                Rectangle yawRectangle;
                if (yawAmount >= 0)
                {
                    yawRectangle = new Rectangle(50, 75, (int)(yawAmount * 25), 15);
                }
                else
                {
                    yawRectangle = new Rectangle(50 - (int)(-yawAmount * 25), 75, (int)(-yawAmount * 25), 15);
                }

                Rectangle pitchRectangle;
                if (pitchAmount >= 0)
                {
                    pitchRectangle = new Rectangle(50, 100, (int)(pitchAmount * 25), 15);
                }
                else
                {
                    pitchRectangle = new Rectangle(50 - (int)(-pitchAmount * 25), 100, (int)(-pitchAmount * 25), 15);
                }

                Rectangle rollRectangle;
                if (rollAmount >= 0)
                {
                    rollRectangle = new Rectangle(50, 125, (int)(rollAmount * 25), 15);
                }
                else
                {
                    rollRectangle = new Rectangle(50 - (int)(-rollAmount * 25), 125, (int)(-rollAmount * 25), 15);
                }

                _spriteBatch.Draw(sliderTexture, throttleRectangle, Color.White);
                _spriteBatch.Draw(sliderTexture, yawRectangle, Color.White);
                _spriteBatch.Draw(sliderTexture, pitchRectangle, Color.White);
                _spriteBatch.Draw(sliderTexture, rollRectangle, Color.White);
            }
            _spriteBatch.End();

            // fix bug where 3D graphics dont display correctly when mixing 2D and 3D elements
            GraphicsDevice.BlendState = BlendState.Opaque;
            GraphicsDevice.DepthStencilState = DepthStencilState.Default;
            GraphicsDevice.SamplerStates[0] = SamplerState.LinearWrap;


            base.Draw(gameTime);
        }
        
        private void UpdateEngineSound() // change engine volume based of current throttle
        {
           if (throttleAmount >= 0)
            {
                engineSoundInstance.Volume = (float)(throttleAmount / 10.0);
            } else
            {
                engineSoundInstance.Volume = (float)(throttleAmount / -5.0);
            }
        }

        private void RotatePlayer(GameTime gameTime)
        {
            // calculate new ship rotation here.
            // TODO Afix rotation based on LOCAL rotation
            shipRotation.Z = shipRotation.Z + (float)(pitchAmount * gameTime.ElapsedGameTime.TotalSeconds); // Z = roll axis, Y = yaw axis, X = pitch axis
            shipRotation.Y = (float)(shipRotation.Y + (yawAmount * gameTime.ElapsedGameTime.TotalSeconds)); // Z = roll axis, Y = yaw axis, X = pitch axis 
            shipRotation.X = shipRotation.X + (float)(rollAmount * gameTime.ElapsedGameTime.TotalSeconds); // Z = roll axis, Y = yaw axis, X = pitch axis

            return;

        }

        private void FindPlayerVelocityVector(GameTime gameTime)
        {

            RotatePlayer(gameTime);

            // give pitch, yaw, and roll throttle some amount of 'friction'. helps with driveability
            float frictionPitchRoll = 1;
            float frictionYaw = 0.1f;
            if (rollAmount > 0)
            {
                rollAmount = (float)(rollAmount - frictionPitchRoll * gameTime.ElapsedGameTime.TotalSeconds);
                if (rollAmount < 0)
                {
                    rollAmount = 0;
                }
            }
            if (rollAmount < 0)
            {
                rollAmount = (float)(rollAmount + frictionPitchRoll * gameTime.ElapsedGameTime.TotalSeconds);
                if (rollAmount > 0)
                {
                    rollAmount = 0;
                }
            }
            if (yawAmount > 0)
            {
                yawAmount = (float)(yawAmount - frictionYaw * gameTime.ElapsedGameTime.TotalSeconds);
                if (yawAmount < 0)
                {
                    yawAmount = 0;
                }
            }
            if (yawAmount < 0)
            {
                yawAmount = (float)(yawAmount + frictionYaw * gameTime.ElapsedGameTime.TotalSeconds);
                if (yawAmount > 0)
                {
                    yawAmount = 0;
                }
            }
            if (pitchAmount > 0)
            {
                pitchAmount = (float)(pitchAmount - frictionPitchRoll * gameTime.ElapsedGameTime.TotalSeconds);
                if (pitchAmount < 0)
                {
                    pitchAmount = 0;
                }
            }
            if (pitchAmount < 0)
            {
                pitchAmount = (float)(pitchAmount + frictionPitchRoll * gameTime.ElapsedGameTime.TotalSeconds);
                if (pitchAmount > 0)
                {
                    pitchAmount = 0;
                }
            }

            // give throttle 'friction'
            float frictionThrottle = 3;
            if (throttleAmount > 0 && !controllerThrottleUsed)
            {
                throttleAmount = (float)(throttleAmount - frictionThrottle * gameTime.ElapsedGameTime.TotalSeconds);
                if (throttleAmount < 0)
                {
                    throttleAmount = 0;
                }
            }
            if (throttleAmount < 0 && !controllerThrottleUsed)
            {
                throttleAmount = (float)(throttleAmount + frictionThrottle * gameTime.ElapsedGameTime.TotalSeconds);
                if (throttleAmount > 0)
                {
                    throttleAmount = 0;
                }
            }

            // keep shipRotation within 0 - 2pi
            while (shipRotation.X >= Math.PI * 2)
            {
                shipRotation.X = (float)(shipRotation.X - Math.PI * 2);
            }
            while (shipRotation.Y >= Math.PI * 2)
            {
                shipRotation.Y = (float)(shipRotation.Y - Math.PI * 2);
            }
            while (shipRotation.Z >= Math.PI * 2)
            {
                shipRotation.Z = (float)(shipRotation.Z - Math.PI * 2);
            }

            while (shipRotation.X < 0)
            {
                shipRotation.X = (float)(shipRotation.X + Math.PI * 2);
            }
            while (shipRotation.Y < 0)
            {
                shipRotation.Y = (float)(shipRotation.Y + Math.PI * 2);
            }
            while (shipRotation.Z < 0)
            {
                shipRotation.Z = (float)(shipRotation.Z + Math.PI * 2);
            }


            Vector3 newDirection = new Vector3(1, 0, 0);
           
            // note maths were precomputed with this matrix equation:
            /*
            \begin{ pmatrix}
            1 & 0 & 0\end{ pmatrix}\begin{ pmatrix}
            cos\left(z\right) & -sin\left(z\right) & 0\\ \:\:\:\:\:sin\left(z\right) & cos\left(z\right) & 0\\ \:\:\:\:\:0 & 0 & 1\end{ pmatrix}\cdot \begin{ pmatrix}
            cos\left(y\right) & 0 & sin\left(y\right)\\ \:\:\:\:0 & 1 & 0\\ \:\:\:\:-sin\left(y\right) & 0 & cos\left(y\right)\end{ pmatrix}\cdot \begin{ pmatrix}
            1 & 0 & 0\\ \:\:\:\:0 & cos\left(x\right) & -sin\left(x\right)\\ \:\:\:\:0 & sin\left(x\right) & cos\left(x\right)\end{ pmatrix}
            */
            newDirection.X = (float)(Math.Cos(shipRotation.Z) * Math.Cos(shipRotation.Y)); // apply rotations to X
            newDirection.Y = (float)(Math.Sin(shipRotation.Z) * Math.Cos(shipRotation.Y));
            newDirection.Z = (float)(-Math.Sin(shipRotation.Y));
            

            Vector3 anotherPlaneVector = new Vector3(0, 1, 0); // a line that lies on the imaginary plane that lays on top of the ship
            anotherPlaneVector.X = (float)(Math.Cos(shipRotation.Z) * Math.Sin(shipRotation.Y) * Math.Sin(shipRotation.X) - Math.Sin(shipRotation.Z) * Math.Cos(shipRotation.X));
            anotherPlaneVector.Y = (float)(Math.Cos(shipRotation.Z) * Math.Cos(shipRotation.X) + Math.Sin(shipRotation.Z) * Math.Sin(shipRotation.Y) * Math.Sin(shipRotation.X));
            anotherPlaneVector.Z = (float)(Math.Cos(shipRotation.Y) * Math.Sin(shipRotation.X));
            

            // set camera position while we are here because its easy and less computation
            cameraPosition = Vector3.Add(Vector3.Add(_playerPosition, Vector3.Multiply(newDirection, -500)), Vector3.Multiply(anotherPlaneVector, 100));
            cameraTarget = Vector3.Add(_playerPosition, Vector3.Multiply(anotherPlaneVector, 100));
            cameraUpVector = anotherPlaneVector;

            
            newDirection = Vector3.Multiply(newDirection, throttleAmount);
            if (throttleAmount == 0)
            {
                // do nothing if no throttle is being applied... maintain current velocity

                return;
            }
            newDirection = Vector3.Multiply(newDirection, throttleAmount);
            if (shipVelocity.X == 0 && shipVelocity.Y == 0 && shipVelocity.Z == 0) // if the ship is not currently moving
            {
                // sets the ship velocity to the velocity in the direction of the throttle
                shipVelocity = newDirection;

                return;
            }

            // if the ship is currently moving
            shipVelocity = Vector3.Add(shipVelocity, newDirection); // combines current velocity with the throttle velocity
            //shipVelocity = newDirection; // for testing. causes no inertia/momentum movement
            return;
        }
    }
}
