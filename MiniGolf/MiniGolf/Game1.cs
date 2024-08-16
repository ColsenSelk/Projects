using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Audio;
using System;
using System.Diagnostics;

namespace MiniGolf
{
    public class Game1 : Game
    {
        private GraphicsDeviceManager _graphics;
        private SpriteBatch _spriteBatch;

        const int maxPowerShot = 400;
        const int minPowerShot = 3;
        const int arrowWidth = 5;

        // 2D image/sprites declarations
        Texture2D ballSprite;
        Texture2D wallSprite;
        Texture2D backgroundSprite;
        Texture2D holeSprite;
        Texture2D arrowSprite;
        Texture2D slopeSprite;
        Texture2D lowSprite; // visualizes areas that are lower than the rest

        SpriteFont golfFont;

        public  SoundEffect soundMusic;
        public  SoundEffect soundCollision;
        public  SoundEffect soundHit;
        public  SoundEffect soundHoleIn;
        public  SoundEffect soundCheer;

        Rectangle ballPosition = new Rectangle(0, 0, 50, 50);
        Rectangle holePosition = new Rectangle(650 - 200, 25-90 - 25, 75, 390);
        Rectangle arrowPosition = new Rectangle(0, 0, minPowerShot, arrowWidth);

        //SoundGolf soundGolf;// = new SoundGolf();

        //public static ContentManager Content;

        //MouseState mouseState;
        KeyboardState keyboardState;
        bool mouseReleased = false;
        bool win = false;
        bool keyboardReleased = false;
        double angleShot; // angle in radians of shot
        int strokes; // number of strokes
        double powerShot; // power of shot

        private float volume = .40f;
        private float volumeMusic = .10f;
        
        private SoundEffectInstance musicInstance;
        private SoundEffectInstance soundInstance;
        private bool winSound = false;

        MovementHandler movementHandler = new MovementHandler();

        public Game1()
        {
            _graphics = new GraphicsDeviceManager(this);
            Content.RootDirectory = "Content";
            IsMouseVisible = true;
            //gameContent = Content;
        }

        
        // runs on startup, or when reset is called by player
        protected override void Initialize()
        {
            // initialization logic here

            movementHandler.SetBallPosition(100, 300);
            movementHandler.SetBallVelocity(0, 0);
            movementHandler.SetHolePosition(687 - 200, 270 - 25);
            angleShot = Math.PI / 2;
            powerShot = 3;
            strokes = 0;
            win = false;

            movementHandler.ResetWin();
            
            ResetWin();
            winSound = false;


            base.Initialize();
        }

        protected override void LoadContent()
        {
            _spriteBatch = new SpriteBatch(GraphicsDevice);

            //loads content of textures
            ballSprite = Content.Load<Texture2D>("GolfBallColsen");
            wallSprite = Content.Load<Texture2D>("GolfWallColsen");
            backgroundSprite = Content.Load<Texture2D>("Grass");
            holeSprite = Content.Load<Texture2D>("GolfFlagColsen");
            slopeSprite = Content.Load<Texture2D>("GolfSlopeColsen");
            lowSprite = Content.Load<Texture2D>("GolfLowColsen");

            golfFont = Content.Load<SpriteFont>("Arial16");

            //soundMusic = Content.Load<SoundEffect>("SoundMusic");
            soundCheer = Content.Load<SoundEffect>("SoundCheer");
            soundCollision = Content.Load<SoundEffect>("SoundCollision");
            soundHoleIn = Content.Load<SoundEffect>("SoundHoleIn");
            soundHit = Content.Load<SoundEffect>("SoundHit");

        }

        // runs before every frame
        protected override void Update(GameTime gameTime)
        {
            if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed || Keyboard.GetState().IsKeyDown(Keys.Escape)) // exit buttons
                Exit();

            //mouseState = Mouse.GetState();
            keyboardState = Keyboard.GetState(); // stores keyboard state

            /*
            // optional mouse control features would go here
            if (mouseState.LeftButton == ButtonState.Pressed && mouseReleased == true)
            {
                //TODO: shoot ball
                if (movementHandler.GetBallVelocityX() == 0 && movementHandler.GetBallVelocityY() == 0)
                {
                    hitHardness = 100;
                    hitDirection = 0;
                    movementHandler.SetBallVelocity(100, 0);
                }
                

                mouseReleased = false;
            }

            if (mouseState.LeftButton == ButtonState.Released)
            {
                mouseReleased = true;
            }
            */

            // reset
            if (keyboardState.IsKeyDown(Keys.R) || GamePad.GetState(PlayerIndex.One).Buttons.Start == ButtonState.Pressed)
            {
                Initialize();
            }

            if (!win && movementHandler.GetBallVelocityX() == 0 && movementHandler.GetBallVelocityY() == 0) // only allow player actions if the ball isn't moving and they haven't holed out yet.
            {
                const double multiplier_rotation = 0.8; // changes the speed at which the player can change angle/rotation of their shot
                const double multiplier_power = 100; // changes the speed at which the player can change the power of their shot. 40 for actual play, 100 for testing
                // rotate counter clockwise
                if (keyboardState.IsKeyDown(Keys.A) || GamePad.GetState(PlayerIndex.One).Buttons.X == ButtonState.Pressed || GamePad.GetState(PlayerIndex.One).DPad.Left == ButtonState.Pressed)
                {
                    //Debug.WriteLine("Rotating Shot Counter Clockwise");
                    
                    angleShot += multiplier_rotation * gameTime.ElapsedGameTime.TotalSeconds;

                    // make angleShot within 0 - 2pi
                    while (angleShot >= 2.0 * Math.PI)
                    {
                        angleShot -= 2.0 * Math.PI;
                    }
                }
                // rotate clockwise
                if (keyboardState.IsKeyDown(Keys.D) || GamePad.GetState(PlayerIndex.One).Buttons.B == ButtonState.Pressed || GamePad.GetState(PlayerIndex.One).DPad.Right == ButtonState.Pressed)
                {
                    //Debug.WriteLine("Rotating Shot Clockwise");
                    angleShot -= multiplier_rotation * gameTime.ElapsedGameTime.TotalSeconds;

                    // make angleShot within 0 - 2pi
                    while (angleShot < 0)
                    {
                        angleShot += 2.0 * Math.PI;
                    }
                }
                // increase power
                if (keyboardState.IsKeyDown(Keys.LeftShift) || keyboardState.IsKeyDown(Keys.RightShift) || GamePad.GetState(PlayerIndex.One).Buttons.Y == ButtonState.Pressed || GamePad.GetState(PlayerIndex.One).DPad.Up == ButtonState.Pressed)
                {
                    //Debug.WriteLine("Mo Juice");
                    if (powerShot < maxPowerShot)
                    {
                        powerShot += multiplier_power * gameTime.ElapsedGameTime.TotalSeconds;
                    }


                    if (powerShot > maxPowerShot) // dont allow the power to increase beyond a certain point
                    {
                        powerShot = maxPowerShot;
                    }
                }
                // decrease power
                if (keyboardState.IsKeyDown(Keys.LeftControl) || keyboardState.IsKeyDown(Keys.RightControl) || GamePad.GetState(PlayerIndex.One).Buttons.A == ButtonState.Pressed || GamePad.GetState(PlayerIndex.One).DPad.Down == ButtonState.Pressed)
                {
                    //Debug.WriteLine("Less Juice");
                    if (powerShot > minPowerShot)
                    {
                        powerShot -= multiplier_power * gameTime.ElapsedGameTime.TotalSeconds;
                    }

                    
                    if (powerShot < minPowerShot) // dont allow power to go below a certain point
                    {
                        powerShot = minPowerShot;
                    }
                }
                // fire
                if (keyboardState.IsKeyDown(Keys.Enter) || keyboardState.IsKeyDown(Keys.Space) || GamePad.GetState(PlayerIndex.One).Buttons.LeftShoulder == ButtonState.Pressed || GamePad.GetState(PlayerIndex.One).Buttons.RightShoulder == ButtonState.Pressed)
                {
                    strokes++;
                    movementHandler.SetBallVelocity((float)(Math.Cos(-angleShot) * powerShot), (float)(Math.Sin(-angleShot) * powerShot)); // computes and applies shot movement

                    // reset shot
                    angleShot = Math.PI / 2;
                    powerShot = minPowerShot;
                    PlayHit();
                }
                
            }
            

            base.Update(gameTime); // recursively call itself
        }

        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.CornflowerBlue);

            int amountWalls = 0;
            int amountSlopes = 0;

            // declare walls and slopes
            Rectangle[] allWalls = new Rectangle[100];
            double[] allWallAngles = new double[100];
            Rectangle[] allSlopes = new Rectangle[100];
            double[] allSlopeAngles = new double[100];

            // define walls
            //allWalls[amountWalls].X = 0; allWalls[amountWalls].Y = 200; allWalls[amountWalls].Width = 500; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = (-Math.PI / 3); amountWalls = amountWalls + 1; // angled test wall
            //allWalls[amountWalls].X = 150; allWalls[amountWalls].Y = 150; allWalls[amountWalls].Width = 500; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = 0; amountWalls = amountWalls + 1; // unangled test wall
            allWalls[amountWalls].X = 50; allWalls[amountWalls].Y = 380; allWalls[amountWalls].Width = 350; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = (-Math.PI / 2); amountWalls = amountWalls + 1; // vertical. left wall
            
            allWalls[amountWalls].X = 50; allWalls[amountWalls].Y = 30; allWalls[amountWalls].Width = 500; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = 0; amountWalls = amountWalls + 1; // unangled. top wall

            allWalls[amountWalls].X = 640; allWalls[amountWalls].Y = 65; allWalls[amountWalls].Width = 100; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = -Math.PI + Math.PI / 12; amountWalls = amountWalls + 1; // angled. top wall curve 1
            allWalls[amountWalls].X = 720; allWalls[amountWalls].Y = 112; allWalls[amountWalls].Width = 100; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = -Math.PI + Math.PI / 6; amountWalls = amountWalls + 1; // angled. top wall curve 2
            allWalls[amountWalls].X = 785; allWalls[amountWalls].Y = 178; allWalls[amountWalls].Width = 100; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = -Math.PI + Math.PI / 4; amountWalls = amountWalls + 1; // angled. top wall curve 3
            allWalls[amountWalls].X = 785; allWalls[amountWalls].Y = 273; allWalls[amountWalls].Width = 100; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = -Math.PI / 2; amountWalls = amountWalls + 1; // vertical. right wall
            allWalls[amountWalls].X = 716; allWalls[amountWalls].Y = 273 + 63; allWalls[amountWalls].Width = 100; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = -Math.PI / 4; amountWalls = amountWalls + 1; // angled. bottom wall curve 3
            allWalls[amountWalls].X = 635; allWalls[amountWalls].Y = 380; allWalls[amountWalls].Width = 100; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = -Math.PI / 6; amountWalls = amountWalls + 1; // angled. bottom wall curve 2
            allWalls[amountWalls].X = 543; allWalls[amountWalls].Y = 406; allWalls[amountWalls].Width = 100; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = -Math.PI / 12; amountWalls = amountWalls + 1; // angled. bottom wall curve 1
            allWalls[amountWalls].X = 400; allWalls[amountWalls].Y = 406; allWalls[amountWalls].Width = 150; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = 0; amountWalls = amountWalls + 1; // unangled. bottom wall under hole

            allWalls[amountWalls].X = 50; allWalls[amountWalls].Y = 380; allWalls[amountWalls].Width = 160; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = 0; amountWalls = amountWalls + 1; // unangled. bottom wall under spawn


            allWalls[amountWalls].X = 270; allWalls[amountWalls].Y = 210; allWalls[amountWalls].Width = 100; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = -Math.PI + Math.PI / 4; amountWalls = amountWalls + 1; // angled. above top shortcut-tube (left)
            allWalls[amountWalls].X = 320; allWalls[amountWalls].Y = 200; allWalls[amountWalls].Width = 100; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = -Math.PI / 4; amountWalls = amountWalls + 1; // angled. above top shortcut-tube (right)

            allWalls[amountWalls].X = 50; allWalls[amountWalls].Y = 100; allWalls[amountWalls].Width = 100; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = -Math.PI / 4; amountWalls = amountWalls + 1; // angled. top left

            allWalls[amountWalls].X = 600; allWalls[amountWalls].Y = 249; allWalls[amountWalls].Width = 50; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = -Math.PI / 2 - Math.PI / 5; amountWalls = amountWalls + 1; // angled. obstacle
            allWalls[amountWalls].X = 630; allWalls[amountWalls].Y = 225; allWalls[amountWalls].Width = 48; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = -Math.PI / 2 - Math.PI / 5; amountWalls = amountWalls + 1; // angled. obstacle
            allWalls[amountWalls].X = 593; allWalls[amountWalls].Y = 241; allWalls[amountWalls].Width = 50; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = -Math.PI / 5; amountWalls = amountWalls + 1; // angled. obstacle
            allWalls[amountWalls].X = 572; allWalls[amountWalls].Y = 208; allWalls[amountWalls].Width = 48; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = -Math.PI / 5; amountWalls = amountWalls + 1; // angled. obstacle

            allWalls[amountWalls].X = 200; allWalls[amountWalls].Y = 200; allWalls[amountWalls].Width = 200; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = 0; amountWalls = amountWalls + 1; // unangled. top shortcut-tube wall
            allWalls[amountWalls].X = 200; allWalls[amountWalls].Y = 200 + 65; allWalls[amountWalls].Width = 200; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = 0; amountWalls = amountWalls + 1; // unangled. bottom shortcut-tube wall
            allWalls[amountWalls].X = 200; allWalls[amountWalls].Y = 380; allWalls[amountWalls].Width = 380 - 265; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = (-Math.PI / 2); amountWalls = amountWalls + 1; // vertical. connected to bottom shortcut-tube wall on left side
            allWalls[amountWalls].X = 200; allWalls[amountWalls].Y = 200 + 10; allWalls[amountWalls].Width = 85; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = (-Math.PI / 2); amountWalls = amountWalls + 1; // vertical. connected to top shortcut-tube wall on left side
            allWalls[amountWalls].X = 390; allWalls[amountWalls].Y = 416; allWalls[amountWalls].Width = 416 - 265; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = (-Math.PI / 2); amountWalls = amountWalls + 1; // vertical. connected to bottom shortcut-tube wall on right side
            allWalls[amountWalls].X = 390; allWalls[amountWalls].Y = 200 + 10; allWalls[amountWalls].Width = 85; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = (-Math.PI / 2); amountWalls = amountWalls + 1; // vertical. connected to top shortcut-tube wall on right side



            //allWalls[amountWalls].X = 125; allWalls[amountWalls].Y = 400; allWalls[amountWalls].Width = 100; allWalls[amountWalls].Height = 10; allWallAngles[amountWalls] = -3 * Math.PI / 4; amountWalls = amountWalls + 1; // angled. for testing



            // define slopes
            allSlopes[amountSlopes].X = 210; allSlopes[amountSlopes].Y = 240; allSlopes[amountSlopes].Width = 200; allSlopes[amountSlopes].Height = 60; allSlopeAngles[amountSlopes] = -Math.PI; amountSlopes++;
            allSlopes[amountSlopes].X = 383; allSlopes[amountSlopes].Y = 237; allSlopes[amountSlopes].Width = 50; allSlopes[amountSlopes].Height = 60; allSlopeAngles[amountSlopes] = 0; amountSlopes++;


            _spriteBatch.Begin();
            _spriteBatch.Draw(backgroundSprite, new Vector2(0, 0), Color.White);

            // batch drawer for all the walls and slopes
            for (int i = 0; i < amountSlopes; i++)
            {
                _spriteBatch.Draw(slopeSprite, allSlopes[i], null, Color.White, (float)allSlopeAngles[i], new Vector2(allSlopes[i].X, allSlopes[i].Y), SpriteEffects.None, 0f);
                _spriteBatch.Draw(slopeSprite, allSlopes[i], null, Color.White, (float)allSlopeAngles[i], new Vector2(allSlopes[i].X, allSlopes[i].Y), SpriteEffects.None, 0f); // draw them twice to give them less opacity
            }
            for (int i = 0; i < amountWalls; i++)
            {
                _spriteBatch.Draw(wallSprite, allWalls[i], null, Color.White, (float)allWallAngles[i], new Vector2(0, 0), SpriteEffects.None, 0f);
            }

            
            Vector2 newBallPos = movementHandler.MoveBall(gameTime, allWalls, allWallAngles, allSlopes, allSlopeAngles, amountWalls, amountSlopes, this); // draw ball position from movementHandler parameters
            if (newBallPos.X == 487 - 25 && newBallPos.Y == 245 - 25) // if the ball is in the hole
            {
                // get win state (checks for more win conditions)
                win = movementHandler.GetWinState();


            }
            
            // if the ball isnt moving draw the arrow that shows shot trajectory
            if (movementHandler.GetBallVelocityX() == 0 && movementHandler.GetBallVelocityY() == 0 && !win)
            {
                arrowPosition = new Rectangle((int)newBallPos.X + 25, (int)newBallPos.Y + 25, (int)powerShot / 3 + 25, arrowWidth);
                _spriteBatch.Draw(wallSprite, arrowPosition, null, Color.White, (float)(-angleShot), new Vector2(-2, 0), SpriteEffects.None, 0f); // draw arrow
            }


            _spriteBatch.Draw(holeSprite, holePosition, Color.White); // draws hole
            if (!win) // if not in a win state then draw the ball, otherwise dont
            {
                ballPosition = new Rectangle((int)newBallPos.X, (int)newBallPos.Y, 50, 50);
                _spriteBatch.Draw(ballSprite, ballPosition, Color.White);
            }
            

            
            

            if (win)
            {
                _spriteBatch.DrawString(golfFont, "Congrats! Final Score: " + strokes, new Vector2(250, 69), Color.Cyan);
            } else
            {
                _spriteBatch.DrawString(golfFont, "Strokes: " + strokes, new Vector2(50, 400), Color.White);
            }

            _spriteBatch.End();

            base.Draw(gameTime);
        }

       

        //private ContentManager content;

        

        public void ResetWin()
        {
            winSound = false;
            //music = soundMusic; // credit to "freelibras"


            //musicInstance = soundMusic.CreateInstance();
            //musicInstance.Volume = volumeMusic;
            //musicInstance.IsLooped = true;
            //musicInstance.Play();
        }
        
        // play collision sounds
        public void PlayCollision()
        {
            if (winSound)
            {
                return;
            }
            //sound = soundCollision; // credit to "jittels"

            soundInstance = soundCollision.CreateInstance();
            soundInstance.Volume = volume;
            soundInstance.IsLooped = false;
            soundInstance.Play();
        }

        // play hit sounds
        public void PlayHit()
        {
            if (winSound)
            {
                return;
            }
            //sound = soundHit; // credit to "zolopher"

            soundInstance = soundHit.CreateInstance();
            soundInstance.Volume = volume;
            soundInstance.IsLooped = false;
            soundInstance.Play();
        }

        // play sound for ball going in hole
        public void PlayHoleIn()
        {
            if (winSound)
            {
                return;
            }

            winSound = true;

            //musicInstance.Stop();



            //sound = soundHoleIn; // credit to "AGFX"


            soundInstance.Stop();
            soundInstance = soundHoleIn.CreateInstance();
            soundInstance.Volume = volume;
            soundInstance.IsLooped = false;
            soundInstance.Play();

            //music = soundCheer; // credit to "acclivity"

            musicInstance = soundCheer.CreateInstance();
            musicInstance.Volume = volumeMusic * 2;
            musicInstance.IsLooped = false;
            musicInstance.Play();


        }
    }
}
