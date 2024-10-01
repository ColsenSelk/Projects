using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using UnityEngine;

public class PlayerMoveHelper
{
    public static Side[,] FindBoardGivenSelection(Point point, Side[,] board, Side playerToMakeMove)
    {
        Side[,,] newBoards = new Side[1, 8, 8];
        int i = point.X;
        int j = point.Y;
        int moveCounter = 0;

        
        // copy board
        for (int i2 = 0; i2 < 8; ++i2)
        {
            for (int j2 = 0; j2 < 8; ++j2)
            {
                newBoards[moveCounter, i2, j2] = board[i2, j2];
            }
        }

        // make sure spot is empty
        if (board[i, j] != Side.Empty)
        {
            return board;
        }

        // check left
        bool leftWorks = false;
        int othersidej = -1;
        int tempj = j - 1;
        if (tempj <= 0)
        {
            // then left not work
        }
        else if (board[i, tempj] == playerToMakeMove || board[i, tempj] == Side.Empty)
        {
            // then left not work
        }
        else
        {
            while (tempj >= 1)
            {
                if (board[i, tempj] == MiniMax.returnOppositeSide(playerToMakeMove))
                {
                    --tempj;
                    if (board[i, tempj] == MiniMax.returnOppositeSide(playerToMakeMove))
                    {
                        continue;
                    }
                    else if (board[i, tempj] == playerToMakeMove)
                    {
                        //othersidei = tempi;
                        othersidej = tempj;
                        leftWorks = true;
                        break;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        if (leftWorks)
        {
            for (int j2 = othersidej + 1; j2 <= j; j2++)
            {
                newBoards[moveCounter, i, j2] = playerToMakeMove;
            }
        }

        // check right
        bool rightWorks = false;
        othersidej = -1;
        tempj = j + 1;
        if (tempj >= 7)
        {
            // then right not work
        }
        else if (board[i, tempj] == playerToMakeMove || board[i, tempj] == Side.Empty)
        {
            // then right not work
        }
        else
        {
            while (tempj <= 6)
            {
                if (board[i, tempj] == MiniMax.returnOppositeSide(playerToMakeMove))
                {
                    ++tempj;
                    if (board[i, tempj] == MiniMax.returnOppositeSide(playerToMakeMove))
                    {
                        continue;
                    }
                    else if (board[i, tempj] == playerToMakeMove)
                    {
                        //othersidei = tempi;
                        othersidej = tempj;
                        rightWorks = true;
                        break;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        if (rightWorks)
        {
            for (int j2 = j; j2 < othersidej; j2++)
            {
                newBoards[moveCounter, i, j2] = playerToMakeMove;
            }
        }


        // check up
        bool upWorks = false;
        int othersidei = -1;
        int tempi = i - 1;
        if (tempi <= 0)
        {
            // then up not work
        }
        else if (board[tempi, j] == playerToMakeMove || board[tempi, j] == Side.Empty)
        {
            // then up not work
        }
        else
        {
            while (tempi >= 1)
            {
                if (board[tempi, j] == MiniMax.returnOppositeSide(playerToMakeMove))
                {
                    --tempi;
                    if (board[tempi, j] == MiniMax.returnOppositeSide(playerToMakeMove))
                    {
                        continue;
                    }
                    else if (board[tempi, j] == playerToMakeMove)
                    {
                        othersidei = tempi;
                        othersidej = j;
                        upWorks = true;
                        break;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        if (upWorks)
        {
            for (int i2 = othersidei + 1; i2 <= i; i2++)
            {
                newBoards[moveCounter, i2, j] = playerToMakeMove;
            }
        }


        // check down
        bool downWorks = false;
        othersidei = -1;
        tempi = i + 1;
        if (tempi >= 7)
        {
            // then down not work
        }
        else if (board[tempi, j] == playerToMakeMove || board[tempi, j] == Side.Empty)
        {
            // then down not work
        }
        else
        {
            while (tempi <= 6)
            {
                if (board[tempi, j] == MiniMax.returnOppositeSide(playerToMakeMove))
                {
                    ++tempi;
                    if (board[tempi, j] == MiniMax.returnOppositeSide(playerToMakeMove))
                    {
                        continue;
                    }
                    else if (board[tempi, j] == playerToMakeMove)
                    {
                        othersidei = tempi;
                        othersidej = j;
                        downWorks = true;
                        break;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        if (downWorks)
        {
            for (int i2 = i; i2 < othersidei; i2++)
            {
                newBoards[moveCounter, i2, j] = playerToMakeMove;
            }
        }


        // check DR
        bool DRWorks = false;
        othersidei = -1;
        othersidej = -1;
        tempi = i + 1;
        tempj = j + 1;
        if (tempi >= 7 || tempj >= 7)
        {
            // then DR not work
        }
        else if (board[tempi, tempj] == playerToMakeMove || board[tempi, tempj] == Side.Empty)
        {
            // then DR not work
        }
        else
        {
            while (tempi <= 6 && tempj <= 6)
            {
                if (board[tempi, tempj] == MiniMax.returnOppositeSide(playerToMakeMove))
                {
                    ++tempi;
                    ++tempj;
                    if (board[tempi, tempj] == MiniMax.returnOppositeSide(playerToMakeMove))
                    {
                        continue;
                    }
                    else if (board[tempi, tempj] == playerToMakeMove)
                    {
                        othersidei = tempi;
                        othersidej = tempj;
                        DRWorks = true;
                        break;
                    }
                    else
                    {
                        break;
                    }
                }
                /*if (board[tempi, tempj] != playerToMakeMove && board[tempi, tempj] != Side.Empty)
                {
                    //continue;
                }
                else if (board[tempi, tempj] == Side.Empty)
                {
                    break;
                }
                else if (board[tempi, tempj] == playerToMakeMove && board[tempi + 1, tempj + 1] == Side.Empty)
                {
                    othersidei = tempi + 1;
                    othersidej = tempj + 1;
                    DRWorks = true;
                    break;
                }
                ++tempi;
                ++tempj;*/
            }
        }
        if (DRWorks)
        {
            for (int counter = 0; counter < System.Math.Abs(i - othersidei); counter++)
            {
                newBoards[moveCounter, i + counter, j + counter] = playerToMakeMove;
            }
        }


        // check DL
        bool DLWorks = false;
        othersidei = -1;
        othersidej = -1;
        tempi = i + 1;
        tempj = j - 1;
        if (tempi >= 7 || tempj <= 0)
        {
            // then DL not work
        }
        else if (board[tempi, tempj] == playerToMakeMove || board[tempi, tempj] == Side.Empty)
        {
            // then DL not work
        }
        else
        {
            while (tempi <= 6 && tempj >= 1)
            {
                if (board[tempi, tempj] == MiniMax.returnOppositeSide(playerToMakeMove))
                {
                    ++tempi;
                    --tempj;
                    if (board[tempi, tempj] == MiniMax.returnOppositeSide(playerToMakeMove))
                    {
                        continue;
                    }
                    else if (board[tempi, tempj] == playerToMakeMove)
                    {
                        othersidei = tempi;
                        othersidej = tempj;
                        DLWorks = true;
                        break;
                    }
                    else
                    {
                        break;
                    }
                }
                /*if (board[tempi, tempj] != playerToMakeMove && board[tempi, tempj] != Side.Empty)
                {
                    //continue;
                }
                else if (board[tempi, tempj] == Side.Empty)
                {
                    break;
                }
                else if (board[tempi, tempj] == playerToMakeMove && board[tempi + 1, tempj - 1] == Side.Empty)
                {
                    othersidei = tempi + 1;
                    othersidej = tempj - 1;
                    DLWorks = true;
                    break;
                }
                ++tempi;
                --tempj;*/
            }
        }
        if (DLWorks)
        {
            for (int counter = 0; counter < System.Math.Abs(i - othersidei); counter++)
            {
                newBoards[moveCounter, i + counter, j - counter] = playerToMakeMove;
            }
        }


        // check UR
        bool URWorks = false;
        othersidei = -1;
        othersidej = -1;
        tempi = i - 1;
        tempj = j + 1;
        if (tempi <= 0 || tempj >= 7)
        {
            // then UR not work
        }
        else if (board[tempi, tempj] == playerToMakeMove || board[tempi, tempj] == Side.Empty)
        {
            // then UR not work
        }
        else
        {
            while (tempi >= 1 && tempj <= 6)
            {
                if (board[tempi, tempj] == MiniMax.returnOppositeSide(playerToMakeMove))
                {
                    --tempi;
                    ++tempj;
                    if (board[tempi, tempj] == MiniMax.returnOppositeSide(playerToMakeMove))
                    {
                        continue;
                    }
                    else if (board[tempi, tempj] == playerToMakeMove)
                    {
                        othersidei = tempi;
                        othersidej = tempj;
                        URWorks = true;
                        break;
                    }
                    else
                    {
                        break;
                    }
                }
                /*if (board[tempi, tempj] != playerToMakeMove && board[tempi, tempj] != Side.Empty)
                {
                    //continue;
                }
                else if (board[tempi, tempj] == Side.Empty)
                {
                    break;
                }
                else if (board[tempi, tempj] == playerToMakeMove && board[tempi - 1, tempj + 1] == Side.Empty)
                {
                    othersidei = tempi - 1;
                    othersidej = tempj + 1;
                    URWorks = true;
                    break;
                }
                --tempi;
                ++tempj;*/
            }
        }
        if (URWorks)
        {
            for (int counter = 0; counter < System.Math.Abs(i - othersidei); counter++)
            {
                newBoards[moveCounter, i - counter, j + counter] = playerToMakeMove;
            }
        }


        // check UL
        bool ULWorks = false;
        othersidei = -1;
        othersidej = -1;
        tempi = i - 1;
        tempj = j - 1;
        if (tempi <= 0 || tempj <= 0)
        {
            // then UL not work
        }
        else if (board[tempi, tempj] == playerToMakeMove || board[tempi, tempj] == Side.Empty)
        {
            // then UL not work
        }
        else
        {
            while (tempi >= 1 && tempj >= 1)
            {
                if (board[tempi, tempj] == MiniMax.returnOppositeSide(playerToMakeMove))
                {
                    --tempi;
                    --tempj;
                    if (board[tempi, tempj] == MiniMax.returnOppositeSide(playerToMakeMove))
                    {
                        continue;
                    }
                    else if (board[tempi, tempj] == playerToMakeMove)
                    {
                        othersidei = tempi;
                        othersidej = tempj;
                        ULWorks = true;
                        break;
                    }
                    else
                    {
                        break;
                    }
                }
                /*
                if (board[tempi, tempj] != playerToMakeMove && board[tempi, tempj] != Side.Empty)
                {
                    //continue;
                }
                else if (board[tempi, tempj] == Side.Empty)
                {
                    break;
                }
                else if (board[tempi, tempj] == playerToMakeMove && board[tempi - 1, tempj - 1] == Side.Empty)
                {
                    othersidei = tempi - 1;
                    othersidej = tempj - 1;
                    ULWorks = true;
                    break;
                }
                --tempi;
                --tempj;*/
            }
        }
        if (ULWorks)
        {
            for (int counter = 0; counter < System.Math.Abs(i - othersidei); counter++)
            {
                newBoards[moveCounter, i - counter, j - counter] = playerToMakeMove;
            }
        }










        if (leftWorks || rightWorks || upWorks || downWorks || ULWorks || URWorks || DLWorks || DRWorks)
        {
            moveCounter++;
            //continue;
        }

        return MiniMax.Array3DTo2DConverter(newBoards, 0);
    }

    public static Point[] FindPoints(Side[,] board, Side playerToMakeMove)
    {
        //Side[,,] newBoards = new Side[64, 8, 8];
        int moveCounter = 0;

        Point[] points = new Point[30];

        for (int i = 0; i < 8; i++)
        {
            for (int j = 0; j < 8; j++)
            {
                //Console.WriteLine("board[" + i + ", " + j + "]" + "MoveCounter: " + moveCounter);
                points[moveCounter].X = -1;
                points[moveCounter].Y = -1;
                if (moveCounter == 30)
                {
                    break;
                }
                // make sure spot is empty
                if (board[i, j] != Side.Empty)
                {
                    continue;
                }

                // check left
                //Console.WriteLine("Check Left");
                bool leftWorks = false;
                int othersidej = -1;
                int tempj = j - 1;
                if (tempj <= 0)
                {
                    // then left not work
                }
                else if (board[i, tempj] == playerToMakeMove || board[i, tempj] == Side.Empty)
                {
                    // then left not work
                }
                else
                {
                    while (tempj >= 1)
                    {
                        if (board[i, tempj] != playerToMakeMove && board[i, tempj] != Side.Empty)
                        {

                        }
                        else if (board[i, tempj] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[i, tempj] == playerToMakeMove && board[i, tempj - 1] == Side.Empty)
                        {
                            othersidej = tempj - 1;
                            leftWorks = true;
                            break;
                        }
                        --tempj;
                    }
                }
                if (leftWorks)
                {
                    //Console.WriteLine("Left Works");
                    points[moveCounter].Y = i;
                    points[moveCounter].X = j;
                    moveCounter++;
                    continue;
                }

                // check right
                //Console.WriteLine("Check Right");
                bool rightWorks = false;
                othersidej = -1;
                tempj = j + 1;
                if (tempj >= 7)
                {
                    // then right not work
                }
                else if (board[i, tempj] == playerToMakeMove || board[i, tempj] == Side.Empty)
                {
                    // then right not work
                }
                else
                {
                    while (tempj <= 6)
                    {
                        if (board[i, tempj] != playerToMakeMove && board[i, tempj] != Side.Empty)
                        {

                        }
                        else if (board[i, tempj] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[i, tempj] == playerToMakeMove && board[i, tempj + 1] == Side.Empty)
                        {
                            othersidej = tempj + 1;
                            rightWorks = true;
                            break;
                        }
                        ++tempj;
                    }
                }
                if (rightWorks)
                {
                    //Console.WriteLine("Right Works");
                    points[moveCounter].Y = i;
                    points[moveCounter].X = j;
                    moveCounter++;
                    continue;
                }


                // check up
                //Console.WriteLine("Check Up");
                bool upWorks = false;
                int othersidei = -1;
                int tempi = i - 1;
                if (tempi <= 0)
                {
                    // then up not work
                }
                else if (board[tempi, j] == playerToMakeMove || board[tempi, j] == Side.Empty)
                {
                    // then up not work
                }
                else
                {
                    while (tempi >= 1)
                    {
                        if (board[tempi, j] != playerToMakeMove && board[tempi, j] != Side.Empty)
                        {

                        }
                        else if (board[tempi, j] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[tempi, j] == playerToMakeMove && board[tempi - 1, j] == Side.Empty)
                        {
                            othersidei = tempi - 1;
                            upWorks = true;
                            break;
                        }
                        --tempi;
                    }
                }
                if (upWorks)
                {
                    //Console.WriteLine("Up Works");
                    points[moveCounter].Y = i;
                    points[moveCounter].X = j;
                    moveCounter++;
                    continue;
                }


                // check down
                //Console.WriteLine("Check Down");
                bool downWorks = false;
                othersidei = -1;
                tempi = i + 1;
                if (tempi >= 7)
                {
                    // then down not work
                }
                else if (board[tempi, j] == playerToMakeMove || board[tempi, j] == Side.Empty)
                {
                    // then down not work
                }
                else
                {
                    while (tempi <= 6)
                    {
                        if (board[tempi, j] != playerToMakeMove && board[tempi, j] != Side.Empty)
                        {

                        }
                        else if (board[tempi, j] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[tempi, j] == playerToMakeMove && board[tempi + 1, j] == Side.Empty)
                        {
                            othersidei = tempi + 1;
                            downWorks = true;
                            break;
                        }
                        ++tempi;
                    }
                }
                if (downWorks)
                {
                    //Console.WriteLine("Down Works");
                    points[moveCounter].Y = i;
                    points[moveCounter].X = j;
                    moveCounter++;
                    continue;
                }


                // check DR
                //Console.WriteLine("Check DR");
                bool DRWorks = false;
                othersidei = -1;
                othersidej = -1;
                tempi = i + 1;
                tempj = j + 1;
                if (tempi >= 7 || tempj >= 7)
                {
                    // then DR not work
                }
                else if (board[tempi, tempj] == playerToMakeMove || board[tempi, tempj] == Side.Empty)
                {
                    // then DR not work
                }
                else
                {
                    while (tempi <= 6 && tempj <= 6)
                    {
                        if (board[tempi, tempj] != playerToMakeMove && board[tempi, tempj] != Side.Empty)
                        {
                            //Console.WriteLine("continue DR");
                        }
                        else if (board[tempi, tempj] == Side.Empty)
                        {
                            //Console.WriteLine("DR not work");
                            break;
                        }
                        else if (board[tempi, tempj] == playerToMakeMove && board[tempi + 1, tempj + 1] == Side.Empty)
                        {
                            //Console.WriteLine("DR works");
                            othersidei = tempi + 1;
                            othersidej = tempj + 1;
                            DRWorks = true;
                            break;
                        }
                        ++tempi;
                        ++tempj;
                    }
                }
                if (DRWorks)
                {
                    //Console.WriteLine("DR works");
                    points[moveCounter].Y = i;
                    points[moveCounter].X = j;
                    moveCounter++;
                    continue;
                }


                // check DL
                //Console.WriteLine("Check DL");
                bool DLWorks = false;
                othersidei = -1;
                othersidej = -1;
                tempi = i + 1;
                tempj = j - 1;
                if (tempi >= 7 || tempj <= 0)
                {
                    // then DL not work
                }
                else if (board[tempi, tempj] == playerToMakeMove || board[tempi, tempj] == Side.Empty)
                {
                    // then DL not work
                }
                else
                {
                    while (tempi <= 6 && tempj >= 1)
                    {
                        if (board[tempi, tempj] != playerToMakeMove && board[tempi, tempj] != Side.Empty)
                        {

                        }
                        else if (board[tempi, tempj] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[tempi, tempj] == playerToMakeMove && board[tempi + 1, tempj - 1] == Side.Empty)
                        {
                            othersidei = tempi + 1;
                            othersidej = tempj - 1;
                            DLWorks = true;
                            break;
                        }
                        ++tempi;
                        --tempj;
                    }
                }
                if (DLWorks)
                {
                    //Console.WriteLine("DL works");
                    points[moveCounter].Y = i;
                    points[moveCounter].X = j;
                    moveCounter++;
                    continue;
                }


                // check UR
                //Console.WriteLine("Check UR");
                bool URWorks = false;
                othersidei = -1;
                othersidej = -1;
                tempi = i - 1;
                tempj = j + 1;
                if (tempi <= 0 || tempj >= 7)
                {
                    // then UR not work
                }
                else if (board[tempi, tempj] == playerToMakeMove || board[tempi, tempj] == Side.Empty)
                {
                    // then UR not work
                }
                else
                {
                    while (tempi >= 1 && tempj <= 6)
                    {
                        if (board[tempi, tempj] != playerToMakeMove && board[tempi, tempj] != Side.Empty)
                        {

                        }
                        else if (board[tempi, tempj] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[tempi, tempj] == playerToMakeMove && board[tempi - 1, tempj + 1] == Side.Empty)
                        {
                            othersidei = tempi - 1;
                            othersidej = tempj + 1;
                            URWorks = true;
                            break;
                        }
                        --tempi;
                        ++tempj;
                    }
                }
                if (URWorks)
                {
                    //Console.WriteLine("UR works");
                    points[moveCounter].Y = i;
                    points[moveCounter].X = j;
                    moveCounter++;
                    continue;
                }


                // check UL
                //Console.WriteLine("Check UL");
                bool ULWorks = false;
                othersidei = -1;
                othersidej = -1;
                tempi = i - 1;
                tempj = j - 1;
                if (tempi <= 0 || tempj <= 0)
                {
                    // then UL not work
                }
                else if (board[tempi, tempj] == playerToMakeMove || board[tempi, tempj] == Side.Empty)
                {
                    // then UL not work
                }
                else
                {
                    while (tempi >= 1 && tempj >= 1)
                    {
                        if (board[tempi, tempj] != playerToMakeMove && board[tempi, tempj] != Side.Empty)
                        {

                        }
                        else if (board[tempi, tempj] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[tempi, tempj] == playerToMakeMove && board[tempi - 1, tempj - 1] == Side.Empty)
                        {
                            othersidei = tempi - 1;
                            othersidej = tempj - 1;
                            ULWorks = true;
                            break;
                        }
                        --tempi;
                        --tempj;
                    }
                }
                if (ULWorks)
                {
                    //Console.WriteLine("UL works");
                    points[moveCounter].Y = i;
                    points[moveCounter].X = j;
                    moveCounter++;
                    continue;
                }


                /*
                if (leftWorks || rightWorks || upWorks || downWorks || ULWorks || URWorks || DLWorks || DRWorks)
                {
                    moveCounter++;
                    continue;
                }*/
            }
        }


        return points;
    }

    public static bool BoardsMatch(Side[,] board, Side[,] board2)
    {
        for (int i = 0; i < 8; i++)
        {
            for (int j = 0; j < 8; j++)
            {
                if (board[i, j] != board2[i, j])
                {
                    return false;
                }
            }
        }
        return true;
    }
}
