using Microsoft.Xna.Framework;

namespace SpaceRace3D
{
    internal class Collision
    {
        /*
        public bool DealWithCollision(Vector3 goalPos, Vector3 goalRot)
        {
            if (CheckForCollision(goalPos, goalRot))
            {
                throttleAmount = 0; // stop throttle
                stopThrottleTime = 5; // shut off engine for 5 seconds

                // find and set new velocity
                shipVelocity = Vector3.Multiply(shipVelocity, -0.5f);

                // play collision sound
                if (collisionSoundInstance != null)
                {
                    collisionSoundInstance.Stop();
                }
                else
                {
                    collisionSoundInstance = collisionSoundEffect.CreateInstance();
                }
                collisionSoundInstance.Volume = 0.3f;
                collisionSoundInstance.IsLooped = false;
                collisionSoundInstance.Play();






                return true;
            }

            return false;
        }

        public bool CheckForCollision(Vector3 goalPos, Vector3 goalRot)
        {
            //Cylinder donutCollidable = new Cylinder(1500, 65 * 10 * 2);
            //Cylinder donutNonCollidable = new Cylinder(600, 65 * 10 * 2);



            Vector3 closestPointOfShipToGoal = _playerPosition; // TODO find closest point on ship
            if (Vector3.Distance(closestPointOfShipToGoal, goalPos) > 1500 || Vector3.Distance(shipVelocity, new Vector3(0, 0, 0)) == 0)
            {
                return false;
            }

            Vector3 closestRingCenterPointOfGoalToShip;

            float donutRingRadius = (1500 - 600) / 2;
            float donutRingCenter = 600 + donutRingRadius;

            //Vector3.Distance(_playerPosition, goalPosition[i])a

            float oldY = 0;
            float newY = ((float)(Math.PI / 16.0));
            bool centerPointFound = false;
            Vector3 parallelVectorToGoal = new Vector3(1, 0, 0);
            parallelVectorToGoal.X = (float)(Math.Cos(goalRot.Z) * Math.Cos(oldY)); // apply rotations to X
            parallelVectorToGoal.Y = (float)(Math.Sin(goalRot.Z) * Math.Cos(oldY));
            parallelVectorToGoal.Z = (float)(-Math.Sin(oldY));
            closestRingCenterPointOfGoalToShip = Vector3.Add(goalPos, Vector3.Multiply(parallelVectorToGoal, donutRingCenter));

            //Vector3 vectorPointingToClosestCenter = parallelVectorToGoal;

            Vector3 newParallelVectorToGoal = new Vector3(1, 0, 0);
            newParallelVectorToGoal.X = (float)(Math.Cos(goalRot.Z) * Math.Cos(newY)); // apply rotations to X
            newParallelVectorToGoal.Y = (float)(Math.Sin(goalRot.Z) * Math.Cos(newY));
            newParallelVectorToGoal.Z = (float)(-Math.Sin(newY));
            Vector3 newClosestRingCenterPointOfGoalToShip = Vector3.Add(goalPos, Vector3.Multiply(newParallelVectorToGoal, donutRingCenter));

            if (Vector3.Distance(closestRingCenterPointOfGoalToShip, closestPointOfShipToGoal) > Vector3.Distance(newClosestRingCenterPointOfGoalToShip, closestPointOfShipToGoal))
            {
                newY = (float)(2 * Math.PI - (Math.PI / 16.0));
                newParallelVectorToGoal.X = (float)(Math.Cos(goalRot.Z) * Math.Cos(newY)); // apply rotations to X
                newParallelVectorToGoal.Y = (float)(Math.Sin(goalRot.Z) * Math.Cos(newY));
                newParallelVectorToGoal.Z = (float)(-Math.Sin(newY));
                newClosestRingCenterPointOfGoalToShip = Vector3.Add(goalPos, Vector3.Multiply(newParallelVectorToGoal, donutRingCenter));

                if (Vector3.Distance(closestRingCenterPointOfGoalToShip, closestPointOfShipToGoal) > Vector3.Distance(newClosestRingCenterPointOfGoalToShip, closestPointOfShipToGoal))
                {
                    //closestRingCenterPointOfGoalToShip = Vector3.Add(goalPos, Vector3.Multiply(parallelVectorToGoal, donutRingCenter));
                    //collisionoccurred = true; // for testing
                    centerPointFound = true;
                }

                while (!centerPointFound)
                {
                    oldY = newY;
                    newY = oldY - ((float)(Math.PI / 16.0));
                    closestRingCenterPointOfGoalToShip = newClosestRingCenterPointOfGoalToShip;

                    //parallelVectorToGoal.X = (float)(Math.Cos(goalRot.Z) * Math.Cos(oldY)); // apply rotations to X
                    //parallelVectorToGoal.Y = (float)(Math.Sin(goalRot.Z) * Math.Cos(oldY));
                    //parallelVectorToGoal.Z = (float)(-Math.Sin(oldY));
                    //parallelVectorToGoal = Vector3.Add(goalPos, Vector3.Multiply(parallelVectorToGoal, donutRingCenter));
                    //closestRingCenterPointOfGoalToShip = Vector3.Add(goalPos, Vector3.Multiply(parallelVectorToGoal, donutRingCenter));
                    newParallelVectorToGoal.X = (float)(Math.Cos(goalRot.Z) * Math.Cos(newY)); // apply rotations to X
                    newParallelVectorToGoal.Y = (float)(Math.Sin(goalRot.Z) * Math.Cos(newY));
                    newParallelVectorToGoal.Z = (float)(-Math.Sin(newY));
                    newClosestRingCenterPointOfGoalToShip = Vector3.Add(goalPos, Vector3.Multiply(newParallelVectorToGoal, donutRingCenter));

                    if (Vector3.Distance(closestRingCenterPointOfGoalToShip, closestPointOfShipToGoal) > Vector3.Distance(newClosestRingCenterPointOfGoalToShip, closestPointOfShipToGoal))
                    {
                        //closestRingCenterPointOfGoalToShip = Vector3.Add(goalPos, Vector3.Multiply(parallelVectorToGoal, donutRingCenter));
                        //collisionoccurred = true; // for testing
                        centerPointFound = true;
                    }
                }
            }
            else
            {
                while (!centerPointFound)
                {
                    oldY = newY;
                    newY = oldY + ((float)(Math.PI / 32.0));
                    closestRingCenterPointOfGoalToShip = newClosestRingCenterPointOfGoalToShip;

                    //parallelVectorToGoal.X = (float)(Math.Cos(goalRot.Z) * Math.Cos(oldY)); // apply rotations to X
                    //parallelVectorToGoal.Y = (float)(Math.Sin(goalRot.Z) * Math.Cos(oldY));
                    //parallelVectorToGoal.Z = (float)(-Math.Sin(oldY));
                    newParallelVectorToGoal.X = (float)(Math.Cos(goalRot.Z) * Math.Cos(newY)); // apply rotations to X
                    newParallelVectorToGoal.Y = (float)(Math.Sin(goalRot.Z) * Math.Cos(newY));
                    newParallelVectorToGoal.Z = (float)(-Math.Sin(newY));
                    newClosestRingCenterPointOfGoalToShip = Vector3.Add(goalPos, Vector3.Multiply(newParallelVectorToGoal, donutRingCenter));

                    if (Vector3.Distance(closestRingCenterPointOfGoalToShip, closestPointOfShipToGoal) > Vector3.Distance(newClosestRingCenterPointOfGoalToShip, closestPointOfShipToGoal))
                    {
                        //closestRingCenterPointOfGoalToShip = Vector3.Add(goalPos, Vector3.Multiply(parallelVectorToGoal, donutRingCenter));
                        //collisionoccurred = true; // for testing
                        centerPointFound = true;
                    }
                }

            }

            if (Vector3.Distance(closestRingCenterPointOfGoalToShip, closestPointOfShipToGoal) < donutRingRadius)
            {
                //collisionoccurred = true; // for testing
                return true;
            }

            Debug.WriteLine(Vector3.Distance(closestRingCenterPointOfGoalToShip, closestPointOfShipToGoal));


            return false;
        }
        */
    }
}
