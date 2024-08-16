using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

namespace MiniGolf
{
    internal class MovementHandler
    {
        private float ballPositionX;
        private float ballPositionY;
        private Microsoft.Xna.Framework.Vector2 ballPos;
        private float ballVelocityX;
        private float ballVelocityY;
        private float ballAccelerationX;
        private float ballAccelerationY;

        private bool win = false;

        private float holePositionX;
        private float holePositionY;
        private Microsoft.Xna.Framework.Vector2 holePos;

        private const double collisionlossConst = 0.9; // when a collision occurs, this marks how much velocity is lost during the collision
        private const double frictionCoef = -0.7; // friction coefficient
        private const double slopeCoef = 500;

        public MovementHandler()
        {
            // do nothing
        }
        
        public void SetHolePosition(int x, int y)
        {
            this.holePositionX = x;
            this.holePositionY = y;
            holePos = new Microsoft.Xna.Framework.Vector2(holePositionX, holePositionY);
        }
        public void SetHolePosition(float x, float y)
        {
            this.holePositionX = x;
            this.holePositionY = y;
            holePos = new Microsoft.Xna.Framework.Vector2(holePositionX, holePositionY);
        }
        public bool GetWinState()
        {
            return win;
        }
        public void ResetWin()
        {
            win = false;
        }

        protected int GetHolePositionX()
        {
            return Convert.ToInt32(holePositionX);
        }
        protected int GetHolePositionY()
        {
            return Convert.ToInt32(holePositionY);
        }
        protected Microsoft.Xna.Framework.Vector2 GetHolePosition()
        {
            holePos = new Microsoft.Xna.Framework.Vector2(holePositionX, holePositionY);
            return holePos;
        }
        public void SetBallPosition(int x, int y)
        {
            this.ballPositionX = x;
            this.ballPositionY = y;
            ballPos = new Microsoft.Xna.Framework.Vector2(ballPositionX, ballPositionY);
        }
        public void SetBallPosition(float x, float y)
        {
            this.ballPositionX = x;
            this.ballPositionY = y;
            ballPos = new Microsoft.Xna.Framework.Vector2(ballPositionX, ballPositionY);
        }

        protected int GetBallPositionX()
        {
            return Convert.ToInt32(ballPositionX);
        }
        protected int GetBallPositionY()
        {
            return Convert.ToInt32(ballPositionY);
        }
        protected Microsoft.Xna.Framework.Vector2 GetBallPosition()
        {
            ballPos = new Microsoft.Xna.Framework.Vector2(ballPositionX, ballPositionY);
            return ballPos;
        }
        private void UpdateBallPos() // updates ballPos Vector in case it hasn't been updated
        {
            ballPos = new Microsoft.Xna.Framework.Vector2(ballPositionX, ballPositionY);
        }

        public void SetBallVelocity(int x, int y)
        {
            this.ballVelocityX = x;
            this.ballVelocityY = y;
        }
        public void SetBallVelocity(float x, float y)
        {
            this.ballVelocityX = x;
            this.ballVelocityY = y;
        }
        public void SetBallVelocityCollision(double angle) 
        {
            if (angle == -1) // -1 will set velo to 0
            {
                ballVelocityX = 0;
                ballVelocityY = 0;
            } else
            {
                double hypotenuse = Math.Sqrt(Math.Pow(ballVelocityX, 2) + Math.Pow(ballVelocityY, 2));

                // make newballvelocity within 0 - 2pi
                while (angle >= 2.0 * Math.PI)
                {
                    angle -= 2.0 * Math.PI;
                }
                while (angle < 0)
                {
                    angle += 2.0 * Math.PI;
                }

                ballVelocityX = (float)(Math.Cos(-angle) * hypotenuse);
                ballVelocityY = (float)(Math.Sin(-angle) * hypotenuse);
            }

            ballVelocityX = (float)(ballVelocityX * collisionlossConst);
            ballVelocityY = (float)(ballVelocityY * collisionlossConst);
        }

        public int GetBallVelocityX()
        {
            return Convert.ToInt32(ballVelocityX);
        }
        public int GetBallVelocityY()
        {
            return Convert.ToInt32(ballVelocityY);
        }

        protected void SetBallAcceleration(int x, int y)
        {
            this.ballAccelerationX = x;
            this.ballAccelerationY = y;
        }
        protected void SetBallAcceleration(float x, float y)
        {
            this.ballAccelerationX = x;
            this.ballAccelerationY = y;
        }

        protected int GetBallAccelerationX()
        {
            return Convert.ToInt32(ballAccelerationX);
        }
        protected int GetBallAccelerationY()
        {
            return Convert.ToInt32(ballAccelerationY);
        }

        protected bool CheckBallCollisionSlope(Rectangle slope, double angleSlope)
        {
            // checks if the ball is inside the slope
            if (angleSlope == 0 || angleSlope == Math.PI / 2.0 || angleSlope == Math.PI || angleSlope == 3.0 * Math.PI / 2.0)
            {
                double topY; // what appears to be the top
                double bottomY; // what appears to be the bottom
                double leftX; // what appears to be the left
                double rightX; // what appears to be the right

                // assign the wall locations based on the wall angle
                if (angleSlope == 0)
                {
                    topY = slope.Y;
                    bottomY = slope.Y + slope.Height;
                    leftX = slope.X;
                    rightX = slope.X + slope.Width;
                } else if (angleSlope == Math.PI / 2.0)
                {
                    topY = slope.Y;
                    bottomY = slope.Y + slope.Height;
                    leftX = slope.X;
                    rightX = slope.X + slope.Width;
                } else if (angleSlope == Math.PI)
                {
                    topY = slope.Y - slope.Height;
                    bottomY = slope.Y;
                    leftX = slope.X - slope.Width;
                    rightX = slope.X;
                } else if (angleSlope == 3.0 * Math.PI / 2.0)
                {
                    topY = slope.Y;
                    bottomY = slope.Y + slope.Width;
                    leftX = slope.X - slope.Height;
                    rightX = slope.X;
                } else
                {
                    //Debug.WriteLine("Something Went Wrong in CheckBallCollisionSlope");
                    return false;
                }

                if (topY <= ballPositionY + 25 && ballPositionY + 25 <= bottomY && leftX <= ballPositionX + 25 && ballPositionX + 25 <= rightX)
                {
                    return true;
                } else
                {
                    return false;
                }
            } else // outside angle parameters
            {
                return false;
            }
        }

        // checks for object collisions with the ball
        protected HitType CheckBallCollision(Rectangle wall, double angleWall)
        {
            //Debug.WriteLine("Checking Ball Collision");


            // find out which side of the wall the ball hits

            //top
            if (angleWall == 0) // wall is unangled
            {
                if (25.0 + ballPositionX > wall.X && 25.0 + ballPositionX < wall.X + wall.Width && 25.0 + ballPositionY < wall.Y && 25.0 + ballPositionY > wall.Y - 25.0)
                {
                    //Debug.WriteLine("Collision Detected Top Unangled");

                    // check if ball is going towards wall or away
                    if (ballVelocityY >= 0) // ball is going towards wall
                    {
                        if (ballVelocityX == 0 && ballVelocityY == 0)
                        {
                            return HitType.StopTop;
                        }
                        return HitType.MovingTop;
                    }
                }
            }
            else if (angleWall == Math.PI / 2.0)
            { // wall is vertical
                //Debug.WriteLine("Vertical Wall");
                //Debug.WriteLine(25.0 + ballPositionY < wall.Y); Debug.WriteLine(25.0 + ballPositionY > wall.Y - wall.Width); Debug.WriteLine(25.0 + ballPositionX < wall.X); Debug.WriteLine(25.0 + ballPositionX > wall.X - 25.0);
                if (25.0 + ballPositionY < wall.Y && 25.0 + ballPositionY > wall.Y - wall.Width && 25.0 + ballPositionX < wall.X && 25.0 + ballPositionX > wall.X - 25.0)
                {
                   //Debug.WriteLine("Collision Detected Top Vertical");


                    if (ballVelocityX >= 0) // ball is going towards wall
                    {
                        if (ballVelocityX == 0 && ballVelocityY == 0)
                        {
                            return HitType.StopTop;
                        }
                        return HitType.MovingTop;
                    }
                }
            }
            else // wall is angled
            {

                if (angleWall < Math.PI / 2 && angleWall > 0)
                {
                    double c = wall.Y - Math.Tan(-angleWall) * wall.X; // use in telling if within y
                    double d = wall.Y - Math.Tan(-angleWall - Math.PI / 2) * wall.X; // use in telling if within x
                    //Debug.WriteLine("Test");
                    
                    if (
                        -Math.Tan(angleWall) * (ballPositionX + 25) - (ballPositionY + 25) + c > 0 // is above the top
                        && -Math.Tan(angleWall) * (ballPositionX + 25) - (ballPositionY + 25 + 25) + c < 0 // is within 25 of the top
                        && -Math.Tan(angleWall - Math.PI / 2) * (ballPositionX + 25) - (ballPositionY + 25) + d > 0 // is not to far left
                        && -Math.Tan(angleWall - Math.PI / 2) * ((ballPositionX + 25) - wall.Width / Math.Cos(angleWall)) - (ballPositionY + 25) + d < 0 // is not to far right
                        )
                    {
                        //Debug.WriteLine("Ball is within the area of the wall");

                        double angleVel = FindVelocityAnglePlusRad();
                        if (angleVel < angleWall || angleVel > angleWall + Math.PI)
                        {
                            //Debug.WriteLine("Collision Detected Top Angled 0 - pi/2");
                            if (ballVelocityX == 0 && ballVelocityY == 0)
                            {
                                return HitType.StopTop;
                            }
                            return HitType.MovingTop;
                        }
                    }
                }
                else if (angleWall < 0 && angleWall > -Math.PI / 2)
                {
                    double c = wall.Y - Math.Tan(-angleWall) * wall.X; // use in telling if within y
                    double d = wall.Y - Math.Tan(-angleWall - Math.PI / 2) * wall.X; // use in telling if within x


                    if (-Math.Tan(angleWall) * (ballPositionX + 25) - (ballPositionY + 25) + c > 0 && // is above the top
                        -Math.Tan(angleWall) * (ballPositionX + 25) - (ballPositionY + 25) + c - 25 < 0 && // is within 25 of the top
                        -Math.Tan(angleWall - Math.PI / 2) * (ballPositionX + 25) - (ballPositionY + 25) + d < 0 && // is not to far left
                        -Math.Tan(angleWall - Math.PI / 2) * ((ballPositionX + 25) - wall.Width / Math.Cos(angleWall)) - (ballPositionY + 25) + d > 0) // is not to far right
                    {
                        //Debug.WriteLine("Ball is within the area of the wall");

                        double angleVel = FindVelocityAnglePlusRad();
                        if (angleVel < angleWall || angleVel > angleWall + Math.PI)
                        {
                            //Debug.WriteLine("Collision Detected Top Angled -pi/2 - 0");
                            if (ballVelocityX == 0 && ballVelocityY == 0)
                            {
                                
                                return HitType.StopTop;
                            }
                            return HitType.MovingTop;
                        }

                    }
                } else if (angleWall < Math.PI && angleWall > Math.PI / 2)
                {
                    double c = wall.Y - Math.Tan(-angleWall) * wall.X; // use in telling if within y
                    double d = wall.Y - Math.Tan(-angleWall - Math.PI / 2) * wall.X; // use in telling if within x
                    //Debug.WriteLine("Test");
                    /*Debug.WriteLine(-Math.Tan(angleWall) * (ballPositionX + 25) - (ballPositionY) + c);
                    Debug.WriteLine(-Math.Tan(angleWall) * (ballPositionX + 25) - (ballPositionY + 25 + 25) + c);
                    Debug.WriteLine(-Math.Tan(angleWall - Math.PI / 2) * (ballPositionX + 25) - (ballPositionY + 25) + d);
                    Debug.WriteLine(-Math.Tan(angleWall - Math.PI / 2) * ((ballPositionX + 25) - wall.Width / Math.Cos(angleWall)) - (ballPositionY + 25) + d);*/

                    if (
                        -Math.Tan(angleWall) * (ballPositionX + 25) - (ballPositionY) + c > 0 // is above the top
                        && -Math.Tan(angleWall) * (ballPositionX + 25) - (ballPositionY + 25 + 25) + c < 0 // is within 25 of the top
                        && -Math.Tan(angleWall - Math.PI / 2) * (ballPositionX + 25) - (ballPositionY + 25) + d > 0 // is not to far left
                        && -Math.Tan(angleWall - Math.PI / 2) * ((ballPositionX + 25) - wall.Width / Math.Cos(angleWall)) - (ballPositionY + 25) + d < 0 // is not to far right
                        )
                    {
                        Debug.WriteLine("Ball is within the area of the wall");

                        double angleVel = FindVelocityAnglePlusRad();
                        if (angleVel < angleWall || angleVel > angleWall + Math.PI)
                        {
                            Debug.WriteLine("Collision Detected Top Angled pi/2 - pi");
                            if (ballVelocityX == 0 && ballVelocityY == 0)
                            {
                                return HitType.StopTop;
                            }
                            return HitType.MovingTop;
                        }
                    }
                }
            
                
                
            }

            //hits bottom side of wall
            if (angleWall == 0) // wall is unangled
            {
                if (25.0 + ballPositionX > wall.X && 25.0 + ballPositionX < wall.X + wall.Width && 25.0 + ballPositionY > wall.Y + wall.Height && 25.0 + ballPositionY < wall.Y + wall.Height + 25.0)
                {
                    Debug.WriteLine("Collision Detected Bottom Unangled");

                    // check if ball is going towards wall or away
                    if (ballVelocityY <= 0) // ball is going towards wall
                    {
                        if (ballVelocityX == 0 && ballVelocityY == 0)
                        {
                            return HitType.StopBottom;
                        }
                        return HitType.MovingBottom;
                    }
                }
            }
            else if (angleWall == Math.PI / 2.0)
            { // wall is vertical
                if (25.0 + ballPositionY < wall.Y && 25.0 + ballPositionY > wall.Y - wall.Width && 25.0 + ballPositionX > wall.X + wall.Height && 25.0 + ballPositionX < wall.X + wall.Height + 25.0)
                {
                    Debug.WriteLine("Collision Detected Bottom Vertical");

                    if (ballVelocityX <= 0) // ball is going towards wall
                    {
                        if (ballVelocityX == 0 && ballVelocityY == 0)
                        {
                            return HitType.StopBottom;
                        }
                        return HitType.MovingBottom;
                    }
                }
            }
            else // wall is angled
            {

                if (angleWall < Math.PI / 2 && angleWall > 0)
                {
                    double c = (wall.Y + (wall.Height) / Math.Sin(Math.PI / 2 - angleWall)) - Math.Tan(-angleWall) * (wall.X + (wall.Height) / Math.Cos(Math.PI / 2 - angleWall)); // use in telling if within y
                    double d = wall.Y - Math.Tan(-angleWall - Math.PI / 2) * wall.X; // use in telling if within x
                    //Debug.WriteLine("Test");
                    /*Debug.WriteLine(-Math.Tan(angleWall) * (ballPositionX + 25) - (ballPositionY + 35) + c); // is above the top
                    Debug.WriteLine(-Math.Tan(angleWall) * (ballPositionX + 25) - (ballPositionY + 25 + 35) + c);
                    Debug.WriteLine(-Math.Tan(angleWall - Math.PI / 2) * (ballPositionX + 25) - (ballPositionY + 25) + d);
                    Debug.WriteLine(-Math.Tan(angleWall - Math.PI / 2) * ((ballPositionX + 25) - wall.Width / Math.Cos(angleWall)) - (ballPositionY + 25) + d < 0);*/
                    if (
                        -Math.Tan(angleWall) * (ballPositionX + 25) - (ballPositionY + 25 - wall.Height) + c > 0 // is above the top
                        && -Math.Tan(angleWall) * (ballPositionX + 25) - (ballPositionY + 25 + 25 - wall.Height) + c < 0 // is within 25 of the top
                        && -Math.Tan(angleWall - Math.PI / 2) * (ballPositionX + 25) - (ballPositionY + 25) + d > 0 // is not to far left
                        && -Math.Tan(angleWall - Math.PI / 2) * ((ballPositionX + 25) - wall.Width / Math.Cos(angleWall)) - (ballPositionY + 25) + d < 0 // is not to far right
                        )
                    {
                        //Debug.WriteLine("Ball is within the area of the wall");

                        double angleVel = FindVelocityAnglePlusRad();
                        if (!(angleVel < angleWall || angleVel > angleWall + Math.PI))
                        {
                            if (ballVelocityX == 0 && ballVelocityY == 0)
                            {
                                return HitType.StopBottom;
                            }
                            return HitType.MovingBottom;
                        }
                    }
                }
                else if (angleWall < 0 && angleWall > -Math.PI / 2)
                {
                    double c = wall.Y - Math.Tan(-angleWall) * wall.X; // use in telling if within y
                    double d = wall.Y - Math.Tan(-angleWall - Math.PI / 2) * wall.X; // use in telling if within x


                    if (-Math.Tan(angleWall) * (ballPositionX + 25) - (ballPositionY + 25) + c > 0 && // is above the top
                        -Math.Tan(angleWall) * (ballPositionX + 25) - (ballPositionY + 25) + c - 25 < 0 && // is within 25 of the top
                        -Math.Tan(angleWall - Math.PI / 2) * (ballPositionX + 25) - (ballPositionY + 25) + d < 0 && // is not to far left
                        -Math.Tan(angleWall - Math.PI / 2) * ((ballPositionX + 25) - wall.Width / Math.Cos(angleWall)) - (ballPositionY + 25) + d > 0) // is not to far right
                    {
                        //Debug.WriteLine("Ball is within the area of the wall");

                        double angleVel = FindVelocityAnglePlusRad();
                        if (angleVel < angleWall || angleVel > angleWall + Math.PI)
                        {
                            //Debug.WriteLine("Collision Detected");
                            if (ballVelocityX == 0 && ballVelocityY == 0)
                            {
                                return HitType.StopBottom;
                            }
                            return HitType.MovingBottom;
                        }

                    }
                } else if (angleWall < Math.PI && angleWall > Math.PI / 2)
                {
                    double c = (wall.Y + (wall.Height) / Math.Sin(Math.PI / 2 - angleWall)) - Math.Tan(-angleWall) * (wall.X + (wall.Height) / Math.Cos(Math.PI / 2 - angleWall)); // use in telling if within y
                    double d = wall.Y - Math.Tan(-angleWall - Math.PI / 2) * wall.X; // use in telling if within x
                    //Debug.WriteLine("Test");
                    /*Debug.WriteLine(-Math.Tan(angleWall) * (ballPositionX + 25) - (ballPositionY + 35) + c); // is above the top
                    Debug.WriteLine(-Math.Tan(angleWall) * (ballPositionX + 25) - (ballPositionY + 25 + 35) + c);
                    Debug.WriteLine(-Math.Tan(angleWall - Math.PI / 2) * (ballPositionX + 25) - (ballPositionY + 25) + d);
                    Debug.WriteLine(-Math.Tan(angleWall - Math.PI / 2) * ((ballPositionX + 25) - wall.Width / Math.Cos(angleWall)) - (ballPositionY + 25) + d < 0);*/
                    if (
                        -Math.Tan(angleWall) * (ballPositionX + 25) - (ballPositionY + 25 - wall.Height) + c > 0 // is above the top
                        && -Math.Tan(angleWall) * (ballPositionX + 25) - (ballPositionY + 25 + 25 - wall.Height) + c < 0 // is within 25 of the top
                        && -Math.Tan(angleWall - Math.PI / 2) * (ballPositionX + 25) - (ballPositionY + 25) + d > 0 // is not to far left
                        && -Math.Tan(angleWall - Math.PI / 2) * ((ballPositionX + 25) - wall.Width / Math.Cos(angleWall)) - (ballPositionY + 25) + d < 0 // is not to far right
                        )
                    {
                        //Debug.WriteLine("Ball is within the area of the wall");

                        double angleVel = FindVelocityAnglePlusRad();
                        if (!(angleVel < angleWall || angleVel > angleWall + Math.PI))
                        {
                            if (ballVelocityX == 0 && ballVelocityY == 0)
                            {
                                return HitType.StopBottom;
                            }
                            return HitType.MovingBottom;
                        }
                    }
                }
                if (false) // TODO: if it hits a corner
                {
                    
                }
            }

            return HitType.NoHit;
        }

        // measured in radians. 0 would be directly right, pi/2 is down, pi is left, 3pi/2 is up
        private double FindVelocityAngle()
        {
            // compute angle
            if (ballVelocityX == 0 && 0 == ballVelocityY)
            {
                return -1;
            }
            double angle = Math.Atan2(ballVelocityY, ballVelocityX);
            while (angle < 0)
            {
                angle += 2.0 * Math.PI;
            }
            while (angle >= 2.0 * Math.PI)
            {
                angle -= 2.0 * Math.PI;
            }

            return angle;
        }
        
        // measured in radians. 0 would be directly right, pi/2 is up, pi is left, 3pi/2 is down
        private double FindVelocityAnglePlusRad()
        {

            // compute angle
            if (ballVelocityX == 0 && 0 == ballVelocityY)
            {
                return -1;
            }
            double angle = Math.Atan2(-ballVelocityY, ballVelocityX);
            while (angle < 0)
            {
                angle += 2.0 * Math.PI;
            }
            while (angle >= 2.0 * Math.PI)
            {
                angle -= 2.0 * Math.PI;
            }

            return angle;

            /*
            double currentVelocityAngleRad = 0;
            if (ballVelocityX == 0)
            {
                if (ballVelocityY > 0) // up
                {
                    currentVelocityAngleRad = Math.PI / 2.0;
                }
                else if (ballVelocityY < 0) // down
                {
                    currentVelocityAngleRad = (3.0 * Math.PI) / 2.0;
                }
                else // not moving
                {
                    //Debug.WriteLine("Ball not moving");

                    return -1;
                }
            }
            else if (ballVelocityY == 0)
            {
                if (ballVelocityX > 0) // right
                {
                    currentVelocityAngleRad = 0;
                }
                else if (ballVelocityX < 0) // left
                {
                    currentVelocityAngleRad = Math.PI;
                }
            }
            else
            {
                if (ballVelocityX > 0 && ballVelocityY > 0)
                {
                    currentVelocityAngleRad = Math.Atan(Math.Abs(ballVelocityY) / Math.Abs(ballVelocityX));
                }
                else if (ballVelocityX < 0 && ballVelocityY > 0)
                {
                    currentVelocityAngleRad = Math.PI - Math.Atan(Math.Abs(ballVelocityY) / Math.Abs(ballVelocityX));
                }
                else if (ballVelocityX < 0 && ballVelocityY < 0)
                {
                    currentVelocityAngleRad = Math.PI + Math.Atan(Math.Abs(ballVelocityY) / Math.Abs(ballVelocityX));
                }
                else if (ballVelocityX > 0 && ballVelocityY < 0)
                {
                    currentVelocityAngleRad = 2.0 * Math.PI - Math.Atan(Math.Abs(ballVelocityY) / Math.Abs(ballVelocityX));
                }
                else
                {
                    Debug.WriteLine("Error: Something went wrong detecting collision angle");
                    return -2;
                }

            }
            //Debug.WriteLine(currentVelocityAngleRad);
            return currentVelocityAngleRad;
            */

        }

        // given/assuming a collision is occuring between the ball and 1 object
        protected double HandleBallCollision(Rectangle wall, double angleWall, bool dontTeleport, HitType hitType) // angleWall measured in radians. walls should only be rotated between 0 and pi/2. dontTeleport should be false unless HandleBallCollision is called from handling 2 collisions at once
        {
            if (hitType == HitType.MovingTop)
            {
                Debug.WriteLine("HandlingMOVINGTOP");
            }
            double velocityAngle = FindVelocityAnglePlusRad();
            Debug.WriteLine("HandleBallCollision VelocityAngle: " + velocityAngle);
            double angleReflect;
            double newAngle;
            double hypotenuse = Math.Sqrt(Math.Pow(ballVelocityX, 2) + Math.Pow(ballVelocityY, 2));
            if (hitType == HitType.MovingTop || hitType == HitType.MovingBottom)
            {
                if (hitType == HitType.MovingTop || hitType == HitType.MovingBottom)
                {
                    velocityAngle = velocityAngle - Math.PI; // puts velocity angle into 2nd or 3rd quadrants
                    Debug.WriteLine("HandleBallCollision MovingTop");
                }

                angleReflect = angleWall + Math.PI / 2;
                Debug.WriteLine("Angle Reflect: " + angleReflect);

                // make newballvelocity within 0 - 2pi
                while (velocityAngle >= 2.0 * Math.PI)
                {
                    velocityAngle -= 2.0 * Math.PI;
                }
                while (velocityAngle < 0)
                {
                    velocityAngle += 2.0 * Math.PI;
                }

                newAngle = angleReflect + (angleReflect - velocityAngle); // performs reflection

                //newAngle = newAngle - Math.PI; // puts angle back
                if (hitType == HitType.MovingBottom || hitType == HitType.MovingTop)
                {
                    //newAngle = newAngle + Math.PI;
                }
                // make newballvelocity within 0 - 2pi
                while (newAngle >= 2.0 * Math.PI)
                {
                    newAngle -= 2.0 * Math.PI;
                }
                while (newAngle < 0)
                {
                    newAngle += 2.0 * Math.PI;
                }

                ballVelocityX = (float)(Math.Cos(-newAngle) * hypotenuse);
                ballVelocityY = (float)(Math.Sin(-newAngle) * hypotenuse);

                Debug.WriteLine("HandleBallCollision MovingTop/Bottom: " + newAngle);
                return newAngle;
            }

            //TODO
            return 0;


            /* if (angleWall == 0) // wall is unangled
             {
                     SetBallVelocity(ballVelocityX * collisionlossConst, -ballVelocityY * collisionlossConst);
                     UpdateBallPos();
                     return FindVelocityAngle();

             }
             else if (angleWall == Math.PI / 2.0)
             { // wall is vertical

                     SetBallVelocity(-ballVelocityX * collisionlossConst, ballVelocityY * collisionlossConst);
                     UpdateBallPos();
                     return FindVelocityAngle();

             }
             else // wall is angled
             {
                 // determine and set velocity
                 // remember that we already know the ball is going towards the wall because of checkcollisions

                 double hypotenuse = Math.Sqrt(Math.Pow(ballVelocityX, 2) + Math.Pow(ballVelocityY, 2));
                 double newAngleBall = 0;
                 if (angleWall <= Math.PI)
                 {
                     double perpAngleWallTop = angleWall + Math.PI / 2;
                     if (Math.Abs(perpAngleWallTop - FindVelocityAnglePlusRad()) < Math.PI / 2)
                     {
                         if ()
                         newAngleBall = 
                     }
                 }

                 double tempAngleWallReflect = angleWall + Math.PI / 2;
                 if (tempAngleWallReflect >= 3 * Math.PI / 2 )
                 {
                     tempAngleWallReflect -= 2 * Math.PI;
                 }



                 double newBallVelocityAngle;
                         double currentBallVelocityAngle = FindVelocityAnglePlusRad();
                         if (currentBallVelocityAngle <= Math.PI)
                         {
                             newBallVelocityAngle = angleWall + (angleWall - currentBallVelocityAngle);
                         }
                         else
                         {
                             newBallVelocityAngle = (angleWall + Math.PI) - (currentBallVelocityAngle - (angleWall + Math.PI));
                         }

                         double hypotenuse = Math.Sqrt(Math.Pow(ballVelocityX, 2) + Math.Pow(ballVelocityY, 2));

                         // make newballvelocity within 0 - 2pi
                         while (newBallVelocityAngle >= 2.0 * Math.PI)
                         {
                             newBallVelocityAngle -= 2.0 * Math.PI;
                         }
                         while (newBallVelocityAngle < 0)
                         {
                             newBallVelocityAngle += 2.0 * Math.PI;
                         }

                         ballVelocityX = (float)(Math.Cos(-newBallVelocityAngle) * hypotenuse);
                         ballVelocityY = (float)(Math.Sin(-newBallVelocityAngle) * hypotenuse);

                         UpdateBallPos();
                         return FindVelocityAngle();
             }*/



        }

        
        public void SetBallVelocity(double x, double y)
        {
            ballVelocityX = (float)x;
            ballVelocityY = (float)y;
        }

        // given/assuming a collision is occuring between the ball and 2 objects
        protected double HandleBallCollision(Rectangle wall, double angleWall, Rectangle wall2, double angleWall2, HitType hitType1, HitType hitType2)
        {
            // find the angle in between the 2 collision angles and send the ball in that direction
            float oldBallVelocityX = ballVelocityX;
            float oldBallVelocityY = ballVelocityY;

            double hypotenuse;
            if (FindVelocityAngle() == -1) // if ball is not moving
            {
                hypotenuse = 2; // give it some velocity to get out of there
            } else // if ball is moving
            {
                hypotenuse = Math.Sqrt(Math.Pow(ballVelocityX, 2) + Math.Pow(ballVelocityY, 2));
            }

            double newBallVelocityAngle = HandleBallCollision(wall, angleWall, true, hitType1);
            ballVelocityX = oldBallVelocityX;
            ballVelocityY = oldBallVelocityY;
            newBallVelocityAngle = (newBallVelocityAngle + HandleBallCollision(wall2, angleWall2, true, hitType2)) / 2.0;

            while (newBallVelocityAngle >= 2.0 * Math.PI)
            {
                newBallVelocityAngle -= 2.0 * Math.PI;
            }
            while (newBallVelocityAngle < 0)
            {
                newBallVelocityAngle += 2.0 * Math.PI;
            }

            ballVelocityX = (float)(Math.Cos(-newBallVelocityAngle) * hypotenuse);
            ballVelocityY = (float)(Math.Sin(-newBallVelocityAngle) * hypotenuse);

            // test
            if (newBallVelocityAngle != FindVelocityAngle())
            {
                Debug.WriteLine("Error in HandleBallCollision: Velocity Angles Not Matching");
            }

            UpdateBallPos();
            return FindVelocityAngle();
        }

        // updates and sets acceleration when given all walls
        private void UpdateAndSetAcceleration(Rectangle[] slopes, double[] slopeAngles, int slopeAmount)
        {
            if (slopes == null || slopeAngles == null || slopeAmount == 0)
            {
                ballAccelerationX = (float)(frictionCoef * ballVelocityX);
                ballAccelerationY = (float)(frictionCoef * ballVelocityY);
                return;
            }
            for (int i = 0; i < slopeAmount; i++)
            {
                if (CheckBallCollisionSlope(slopes[i], -slopeAngles[i]))
                {
                    //Debug.WriteLine("Inside Slope");
                    if (ballVelocityX < 0.01 && ballVelocityX > -0.01 && ballVelocityX != 0 && Math.Abs(ballAccelerationX) < 0.07)
                    {
                        Debug.WriteLine("ball stopped X");
                        ballVelocityX = 0;
                        ballAccelerationX = 0;
                    }
                    if (ballVelocityY < 0.01 && ballVelocityY > -0.01 && ballVelocityY != 0 && Math.Abs(ballAccelerationY) < 0.07)
                    {
                        Debug.WriteLine("ball stopped Y");
                        ballVelocityY = 0;
                        ballAccelerationY = 0;
                    }
                    if (-slopeAngles[i] == 0) // slope rises to the right
                    {
                        ballAccelerationX = (float)(-slopeCoef + frictionCoef * ballVelocityX);
                        ballAccelerationY = (float)(frictionCoef * ballVelocityY);
                    } else if (-slopeAngles[i] == Math.PI / 2.0) // slope rises to the top
                    {
                        ballAccelerationX = (float)(frictionCoef * ballVelocityX);
                        ballAccelerationY = (float)(slopeCoef + frictionCoef * ballVelocityY);
                    } else if (-slopeAngles[i] == Math.PI) // slope rises to the left
                    {
                        ballAccelerationX = (float)(slopeCoef + frictionCoef * ballVelocityX);
                        ballAccelerationY = (float)(frictionCoef * ballVelocityY);
                    }
                    else if (-slopeAngles[i] == (3.0 * Math.PI) / 2.0) // slope rises to the bottom
                    {
                        ballAccelerationX = (float)(frictionCoef * ballVelocityX);
                        ballAccelerationY = (float)(-slopeCoef + frictionCoef * ballVelocityY);
                    } else
                    {
                        // angled slope
                        ballAccelerationX = (float)(frictionCoef * ballVelocityX);
                        ballAccelerationY = (float)(frictionCoef * ballVelocityY);
                    }

                    
                    return;
                }
            }

            if (ballVelocityX < 0.01 && ballVelocityX > -0.01 && ballVelocityX != 0 && Math.Abs(ballAccelerationX) < 0.07)
            {
                Debug.WriteLine("ball stopped X");
                ballVelocityX = 0;
                ballAccelerationX = 0;
            }
            if (ballVelocityY < 0.01 && ballVelocityY > -0.01 && ballVelocityY != 0 && Math.Abs(ballAccelerationY) < 0.07)
            {
                Debug.WriteLine("ball stopped Y");
                ballVelocityY = 0;
                ballAccelerationY = 0;
            }
            ballAccelerationX = (float)(frictionCoef * ballVelocityX);
            ballAccelerationY = (float)(frictionCoef * ballVelocityY);
            return;
        }

        // the "do all" method. computes all necessary computations to move the ball using helper methods
        public Microsoft.Xna.Framework.Vector2 MoveBall(GameTime gameTime, Rectangle[] walls, double[] wallAngles, Rectangle[] slopes, double[] slopeAngles, int wallAmount, int slopeAmount, Game1 game1)
        {
            

            // check win condition
            double hypotenuse = Math.Sqrt(Math.Pow(ballVelocityX, 2) + Math.Pow(ballVelocityY, 2));
            if (hypotenuse <= 30 && Math.Sqrt(Math.Pow(holePositionX - ballPositionX - 25, 2) + Math.Pow(holePositionY - ballPositionY - 25, 2)) < 25 && !win)
            {
                game1.PlayHoleIn();
                ballPositionX = holePositionX - 25;
                ballPositionY = holePositionY - 25;
                ballVelocityX = 0;
                ballVelocityY = 0;
                this.win = true;
                UpdateBallPos();
                return ballPos;
            }

            // check for collisions
            int wall1 = -1;
            HitType wall1HitType = HitType.NoHit;
            bool collisionHandled = false;
            for (int i = 0; i < wallAmount; i++)
            {
                HitType hitType = CheckBallCollision(walls[i], -wallAngles[i]);
                if (hitType != HitType.NoHit)
                {
                    //Debug.WriteLine("Collision Detected");
                    if (wall1 != -1)
                    {
                        //Debug.WriteLine("Handling Collision Type 2");
                        HandleBallCollision(walls[wall1], -wallAngles[wall1], walls[i], -wallAngles[i], wall1HitType, hitType);
                        game1.PlayCollision();
                        collisionHandled = true;
                        break;
                    }
                    wall1 = i;
                    wall1HitType = hitType;
                }
            }
            if (wall1 != -1 && !collisionHandled)
            {
                //Debug.WriteLine("Handling Collision Type 1");
                HandleBallCollision(walls[wall1], -wallAngles[wall1], false, wall1HitType);
                game1.PlayCollision();
            }

            

            
            
            // update velocity of ball
            UpdateAndSetAcceleration(slopes, slopeAngles, slopeAmount);
            ballVelocityX = (float)(ballVelocityX + ballAccelerationX * gameTime.ElapsedGameTime.TotalSeconds);
            ballVelocityY = (float)(ballVelocityY + ballAccelerationY * gameTime.ElapsedGameTime.TotalSeconds);

            // update position of ball
            ballPositionX = (float)(ballPositionX + gameTime.ElapsedGameTime.TotalSeconds * ballVelocityX);
            ballPositionY = (float)(ballPositionY + gameTime.ElapsedGameTime.TotalSeconds * ballVelocityY);

            // if the ball is going VERY slow, stop it
            if (ballVelocityX < 0.01 && ballVelocityX != 0 && Math.Abs(ballAccelerationX) < 0.05)
            {
                //Debug.WriteLine("ball stopped X");
                ballVelocityX = 0;
                ballAccelerationX = 0;
            }
            if (ballVelocityY < 0.01 && ballVelocityY != 0 && Math.Abs(ballAccelerationY) < 0.05)
            {
                //Debug.WriteLine("ball stopped Y");
                ballVelocityY = 0;
                ballAccelerationY = 0;
            }

            UpdateBallPos();
            return ballPos;
        }
    }
}
